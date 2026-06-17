'use client'
import { use, useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { getModuleById } from '@/lib/data/sdg-modules'
import { getQuizByModuleId, shuffleQuestions } from '@/lib/data/quiz-questions'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, RefreshCw, Trophy, Lock } from 'lucide-react'

type Phase = 'instructions' | 'quiz' | 'results'

export default function QuizPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params)
  const router = useRouter()
  const { profile, loading: authLoading } = useAuth()
  const { markModuleCompleted } = useProgress(profile?.id)

  const mid = Number(moduleId)
  const module = getModuleById(mid)
  const quizSet = getQuizByModuleId(mid)
  const questions = useMemo(() => quizSet ? shuffleQuestions(quizSet.questions, 10) : [], [quizSet])

  const [phase, setPhase] = useState<Phase>('instructions')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)

  // Direct DB unlock check — same pattern as module page, no hook cache dependency
  const [directUnlocked, setDirectUnlocked] = useState<boolean | null>(null)

  useEffect(() => {
    if (!profile?.id) return
    if (mid <= 1) { setDirectUnlocked(true); return }

    // Instant if module page already verified unlock this session
    const cacheKey = `unlocked_${profile.id}_${mid}`
    if (sessionStorage.getItem(cacheKey) === 'true') { setDirectUnlocked(true); return }

    const check = async () => {
      const supabase = createClient()
      const [{ data: prog }, { data: attempt }] = await Promise.all([
        supabase.from('student_progress').select('status').eq('student_id', profile.id).eq('module_id', mid - 1).single(),
        supabase.from('quiz_attempts').select('id').eq('student_id', profile.id).eq('module_id', mid - 1).eq('passed', true).limit(1),
      ])
      const result = prog?.status === 'completed' || (attempt !== null && attempt.length > 0)
      if (result) sessionStorage.setItem(cacheKey, 'true')
      setDirectUnlocked(result)
    }
    check()
  }, [profile?.id, mid])

  if (!module || !quizSet) return <div className="p-8 text-center text-gray-500">Quiz not found.</div>

  const stillLoading = authLoading || directUnlocked === null
  const unlocked = mid === 1 || directUnlocked === true

  if (stillLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-full gradient-bloom mx-auto mb-4 animate-spin" style={{ background: 'conic-gradient(#2D6A4F, #C9A540, #2D6A4F)' }} />
        <p className="text-sm font-semibold" style={{ color: '#2D6A4F' }}>Loading quiz...</p>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <Lock size={48} className="text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Module Locked</h2>
        <Link href="/modules" className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold inline-block">Back to Modules</Link>
      </div>
    )
  }

  const handleAnswer = (questionId: string, optionIndex: number) => {
    if (answers[questionId] !== undefined) return
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
    setShowExplanation(true)
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const correct = questions.filter(q => answers[q.id] === q.correct).length
    const pct = Math.round((correct / questions.length) * 100)
    const didPass = pct >= 70

    setScore(pct)
    setPassed(didPass)

    if (profile) {
      const supabase = createClient()
      await supabase.from('quiz_attempts').insert({
        student_id: profile.id,
        module_id: mid,
        score: pct,
        total_questions: questions.length,
        passed: didPass,
        answers,
      })

      if (didPass) {
        // Cache next module as unlocked so it opens instantly
        if (mid < 17) sessionStorage.setItem(`unlocked_${profile.id}_${mid + 1}`, 'true')
        await markModuleCompleted(mid)

        // Award badges
        const { data: progressData } = await supabase
          .from('student_progress')
          .select('*')
          .eq('student_id', profile.id)
          .eq('status', 'completed')
        const completedCount = progressData?.length || 0

        const badgesToCheck: { name: string; condition: boolean }[] = [
          { name: 'First Bloom', condition: mid === 1 },
          { name: 'Equality Advocate', condition: mid === 5 },
          { name: 'Climate Hero', condition: mid === 13 },
          { name: 'SDG Champion', condition: completedCount >= 5 },
          { name: 'Future Leader', condition: completedCount >= 10 },
          { name: 'Change Maker', condition: completedCount >= 15 },
          { name: 'Bloom Girl', condition: completedCount >= 17 },
        ]

        for (const { name, condition } of badgesToCheck) {
          if (!condition) continue
          const { data: badge } = await supabase.from('badges').select('id').eq('name', name).single()
          if (badge) {
            await supabase.from('student_badges').upsert(
              { student_id: profile.id, badge_id: badge.id },
              { onConflict: 'student_id,badge_id' }
            )
          }
        }
      }
    }

    setSubmitting(false)
    setPhase('results')
  }

  const handleRetake = () => {
    setCurrent(0)
    setAnswers({})
    setShowExplanation(false)
    setPhase('quiz')
  }

  const q = questions[current]
  const selectedAnswer = q ? answers[q.id] : undefined

  // INSTRUCTIONS
  if (phase === 'instructions') {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8">
        <Link href={`/modules/${mid}`} className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ChevronLeft size={16} /> Back to Module
        </Link>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="text-6xl mb-4">{module.emoji}</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">SDG {module.sdg_number} Quiz</h1>
          <p className="text-gray-600 mb-6">{module.title}</p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Questions', value: questions.length },
              { label: 'Pass Mark', value: '70%' },
              { label: 'Attempts', value: 'Unlimited' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: '#F0F7F4' }}>
                <div className="text-xl font-black" style={{ color: '#2D6A4F' }}>{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-4 mb-6 text-left text-sm" style={{ background: '#FFFBF0', color: '#856218' }}>
            <p className="font-bold mb-1">📝 Quiz Tips:</p>
            <ul className="space-y-1 list-disc list-inside text-xs">
              <li>Read each question carefully before answering</li>
              <li>You can see the explanation after each answer</li>
              <li>Score 70% or more to unlock the next module</li>
              <li>You can retake the quiz as many times as needed</li>
            </ul>
          </div>
          <button onClick={() => setPhase('quiz')} className="gradient-bloom text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
            Start Quiz 📝
          </button>
        </div>
      </div>
    )
  }

  // RESULTS
  if (phase === 'results') {
    const correct = questions.filter(q => answers[q.id] === q.correct).length
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8">
        <div className={`rounded-3xl p-8 text-white text-center mb-6 ${passed ? 'gradient-bloom' : 'bg-gray-700'}`}>
          <div className="text-5xl mb-3">{passed ? '🎉' : '💪'}</div>
          <h2 className="text-3xl font-black mb-2">{passed ? 'Congratulations!' : 'Keep Going!'}</h2>
          <p className="text-white/80 mb-4">
            {passed ? `You passed SDG ${module.sdg_number}: ${module.title}!` : `You scored ${score}%. You need 70% to pass. Try again!`}
          </p>
          <div className="bg-white/20 rounded-2xl p-4 inline-block">
            <div className="text-5xl font-black">{score}%</div>
            <div className="text-sm opacity-80">{correct}/{questions.length} correct</div>
          </div>
          {passed && mid < 17 && <p className="mt-4 text-sm text-white/90">🔓 SDG {mid + 1} is now unlocked!</p>}
          {passed && mid === 17 && <p className="mt-4 text-sm text-white/90">🎓 You&apos;ve completed all 17 SDGs! Get your certificate!</p>}
        </div>

        <div className="flex gap-3 mb-6">
          {!passed && (
            <button onClick={handleRetake}
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#B4D9C8', color: '#2D6A4F' }}>
              <RefreshCw size={16} /> Retake Quiz
            </button>
          )}
          {passed && mid < 17 && (
            <Link href={`/modules/${mid + 1}`}
              className="flex-1 gradient-bloom text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2">
              Next Module <ChevronRight size={16} />
            </Link>
          )}
          {passed && mid === 17 && (
            <Link href="/certificate"
              className="flex-1 gradient-bloom text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2">
              <Trophy size={16} /> Get Certificate
            </Link>
          )}
          <Link href="/modules"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
            All Modules
          </Link>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Answer Review</h3>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const userAnswer = answers[q.id]
              const isCorrect = userAnswer === q.correct
              return (
                <div key={q.id} className={`rounded-xl p-4 border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /> : <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />}
                    <p className="text-sm font-semibold text-gray-800">Q{i + 1}: {q.question}</p>
                  </div>
                  {!isCorrect && <p className="text-xs text-red-700 mb-1 ml-5">✓ Correct: <strong>{q.options[q.correct]}</strong></p>}
                  <p className="text-xs text-gray-600 ml-5 italic">{q.explanation}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // QUIZ
  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>Question {current + 1} of {questions.length}</span>
        <span className="font-semibold" style={{ color: '#2D6A4F' }}>{Math.round((current / questions.length) * 100)}% done</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div className="gradient-bloom h-2 rounded-full transition-all duration-300" style={{ width: `${(current / questions.length) * 100}%` }} />
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="text-2xl mb-4">{module.emoji}</div>
        <h2 className="text-lg font-bold text-gray-900 mb-6 leading-relaxed">{q.question}</h2>

        <div className="space-y-3 mb-6">
          {q.options.map((option, i) => {
            const isSelected = selectedAnswer === i
            const isCorrect = i === q.correct
            const showResult = selectedAnswer !== undefined

            let cls = 'w-full text-left p-4 rounded-xl border-2 text-sm font-medium transition-all '
            if (!showResult) {
              cls += 'border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700'
            } else if (isCorrect) {
              cls += 'border-green-400 bg-green-50 text-green-800'
            } else if (isSelected && !isCorrect) {
              cls += 'border-red-400 bg-red-50 text-red-800'
            } else {
              cls += 'border-gray-200 text-gray-500'
            }

            return (
              <button key={i} onClick={() => handleAnswer(q.id, i)} className={cls} disabled={showResult}>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                  {showResult && isCorrect && <CheckCircle size={16} className="text-green-500 ml-auto flex-shrink-0" />}
                  {showResult && isSelected && !isCorrect && <XCircle size={16} className="text-red-500 ml-auto flex-shrink-0" />}
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="rounded-xl p-4 mb-4 border" style={{ background: '#F0F7F4', borderColor: '#B4D9C8' }}>
            <p className="text-sm" style={{ color: '#245840' }}><span className="font-bold">💡 Explanation: </span>{q.explanation}</p>
          </div>
        )}

        {selectedAnswer !== undefined && (
          <button onClick={handleNext} disabled={submitting}
            className="w-full gradient-bloom text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
            {submitting ? 'Saving...' : current < questions.length - 1 ? <><span>Next Question</span> <ChevronRight size={16} /></> : <><span>See Results</span> <Trophy size={16} /></>}
          </button>
        )}
      </div>
    </div>
  )
}
