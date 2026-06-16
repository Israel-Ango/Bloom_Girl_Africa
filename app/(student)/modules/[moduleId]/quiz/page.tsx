'use client'
import { use, useState, useMemo } from 'react'
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
  const { profile } = useAuth()
  const { getModuleStatus, isModuleUnlocked, markModuleCompleted } = useProgress(profile?.id)

  const module = getModuleById(Number(moduleId))
  const quizSet = getQuizByModuleId(Number(moduleId))
  const questions = useMemo(() => quizSet ? shuffleQuestions(quizSet.questions, 10) : [], [quizSet])

  const [phase, setPhase] = useState<Phase>('instructions')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)

  if (!module || !quizSet) return <div className="p-8 text-center text-gray-500">Quiz not found.</div>

  const status = getModuleStatus(module.id)
  const unlocked = isModuleUnlocked(module.id)

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
        module_id: module.id,
        score: pct,
        total_questions: questions.length,
        passed: didPass,
        answers,
      })

      if (didPass) {
        await markModuleCompleted(module.id)

        // Award badges
        const newBadges: { name: string; condition_value: number }[] = []
        const { data: progressData } = await supabase
          .from('student_progress')
          .select('*')
          .eq('student_id', profile.id)
          .eq('status', 'completed')
        const completedCount = (progressData?.length || 0)

        if (module.id === 1) newBadges.push({ name: 'First Bloom', condition_value: 1 })
        if (module.id === 5) newBadges.push({ name: 'Equality Advocate', condition_value: 5 })
        if (module.id === 13) newBadges.push({ name: 'Climate Hero', condition_value: 13 })
        if (completedCount >= 5) newBadges.push({ name: 'SDG Champion', condition_value: 5 })
        if (completedCount >= 10) newBadges.push({ name: 'Future Leader', condition_value: 10 })
        if (completedCount >= 15) newBadges.push({ name: 'Change Maker', condition_value: 15 })
        if (completedCount >= 17) newBadges.push({ name: 'Bloom Girl', condition_value: 17 })

        for (const badge of newBadges) {
          const { data: badgeData } = await supabase.from('badges').select('id').eq('name', badge.name).single()
          if (badgeData) {
            await supabase.from('student_badges').upsert({ student_id: profile.id, badge_id: badgeData.id }, { onConflict: 'student_id,badge_id' })
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
        <Link href={`/modules/${module.id}`} className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-6">
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
              <div key={label} className="bg-purple-50 rounded-xl p-3">
                <div className="text-xl font-black text-purple-700">{value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 rounded-2xl p-4 mb-6 text-left text-sm text-amber-800">
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
          <p className="text-white/80 mb-4">{passed ? `You passed SDG ${module.sdg_number}: ${module.title}!` : `You scored ${score}%. You need 70% to pass. Try again!`}</p>
          <div className="bg-white/20 rounded-2xl p-4 inline-block">
            <div className="text-5xl font-black">{score}%</div>
            <div className="text-sm opacity-80">{correct}/{questions.length} correct</div>
          </div>
          {passed && module.id < 17 && (
            <p className="mt-4 text-sm text-white/90">🔓 SDG {module.id + 1} is now unlocked!</p>
          )}
          {passed && module.id === 17 && (
            <p className="mt-4 text-sm text-white/90">🎓 You&apos;ve completed all 17 SDGs! Get your certificate!</p>
          )}
        </div>

        <div className="flex gap-3 mb-6">
          {!passed && (
            <button onClick={handleRetake}
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-purple-200 text-purple-700 py-3 rounded-xl font-bold text-sm hover:bg-purple-50 transition-colors">
              <RefreshCw size={16} /> Retake Quiz
            </button>
          )}
          {passed && module.id < 17 && (
            <Link href={`/modules/${module.id + 1}`}
              className="flex-1 gradient-bloom text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2">
              Next Module <ChevronRight size={16} />
            </Link>
          )}
          {passed && module.id === 17 && (
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
      {/* Progress bar */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>Question {current + 1} of {questions.length}</span>
        <span className="font-semibold text-purple-700">{Math.round(((current) / questions.length) * 100)}% done</span>
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
              cls += 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
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
          <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
            <p className="text-sm text-blue-800"><span className="font-bold">💡 Explanation: </span>{q.explanation}</p>
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
