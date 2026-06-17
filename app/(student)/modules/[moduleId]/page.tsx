'use client'
import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { getModuleById } from '@/lib/data/sdg-modules'
import { createClient } from '@/lib/supabase/client'
import { ChevronRight, ChevronLeft, BookOpen, Star, Target, Lightbulb, Heart, Pen, Lock } from 'lucide-react'

const TABS = [
  { id: 'intro', label: 'Introduction', icon: BookOpen },
  { id: 'content', label: 'Lessons', icon: Star },
  { id: 'story', label: 'Inspiring Story', icon: Heart },
  { id: 'takeaways', label: 'Key Points', icon: Target },
  { id: 'reflect', label: 'Reflect & Act', icon: Pen },
]

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params)
  const router = useRouter()
  const { profile, loading: authLoading } = useAuth()
  const { getModuleStatus, isModuleUnlocked, markModuleStarted, initialized } = useProgress(profile?.id)
  const [activeTab, setActiveTab] = useState('intro')
  const [starting, setStarting] = useState(false)
  // Direct DB check — bypasses hook cache for guaranteed fresh unlock status
  const [directUnlocked, setDirectUnlocked] = useState<boolean | null>(null)

  const mid = Number(moduleId)
  const module = getModuleById(mid)

  useEffect(() => {
    if (!profile?.id || mid <= 1) { setDirectUnlocked(true); return }
    const check = async () => {
      const supabase = createClient()
      const [{ data: prog }, { data: attempt }] = await Promise.all([
        supabase.from('student_progress').select('status').eq('student_id', profile.id).eq('module_id', mid - 1).single(),
        supabase.from('quiz_attempts').select('id').eq('student_id', profile.id).eq('module_id', mid - 1).eq('passed', true).limit(1),
      ])
      const prevCompleted = prog?.status === 'completed'
      const quizPassed = (attempt && attempt.length > 0)
      setDirectUnlocked(prevCompleted || quizPassed)
    }
    check()
  }, [profile?.id, mid])

  if (!module) return <div className="p-8 text-center text-gray-500">Module not found.</div>

  const stillLoading = authLoading || directUnlocked === null
  const unlocked = mid === 1 || directUnlocked === true || (initialized && isModuleUnlocked(mid))
  const status = getModuleStatus(mid)

  if (stillLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-full gradient-bloom mx-auto mb-4 animate-spin" style={{ background: 'conic-gradient(#2D6A4F, #C9A540, #2D6A4F)' }} />
        <p className="text-sm font-semibold" style={{ color: '#2D6A4F' }}>Loading module...</p>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Module Locked</h2>
        <p className="text-gray-600 mb-6">Complete the previous module and pass its quiz to unlock SDG {module.sdg_number}: {module.title}.</p>
        <Link href="/modules" className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold inline-block hover:opacity-90">Back to Modules</Link>
      </div>
    )
  }

  const handleStart = async () => {
    setStarting(true)
    await markModuleStarted(module.id)
    setStarting(false)
  }

  const tabContent: Record<string, React.ReactNode> = {
    intro: (
      <div className="space-y-4">
        <div className="text-4xl">{module.emoji}</div>
        <h2 className="text-2xl font-black text-gray-900">SDG {module.sdg_number}: {module.title}</h2>
        <p className="text-gray-600 font-medium italic">{module.description}</p>
        <div className="bg-purple-50 rounded-2xl p-5 border-l-4 border-purple-500">
          <p className="text-gray-700 leading-relaxed text-base">{module.content.introduction}</p>
        </div>
        <button onClick={() => setActiveTab('content')} className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90">
          Start Learning <ChevronRight size={18} />
        </button>
      </div>
    ),
    content: (
      <div className="space-y-8">
        <h2 className="text-xl font-black text-gray-900">Lesson Content</h2>
        {module.content.sections.map((section, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-lg font-bold text-purple-700">{section.heading}</h3>
            <p className="text-gray-700 leading-relaxed">{section.body}</p>
            <div className="bg-amber-50 rounded-2xl p-4 border-l-4 border-amber-400">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🌍</span>
                <span className="text-sm font-bold text-amber-800">African Example</span>
              </div>
              <p className="text-amber-900 text-sm leading-relaxed">{section.africa_example}</p>
            </div>
            {i < module.content.sections.length - 1 && <hr className="border-gray-100" />}
          </div>
        ))}
        <button onClick={() => setActiveTab('story')} className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90">
          Next: Inspiring Story <ChevronRight size={18} />
        </button>
      </div>
    ),
    story: (
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Heart size={20} className="text-pink-500 fill-pink-500" />
          <h2 className="text-xl font-black text-gray-900">Inspiring African Woman</h2>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 gradient-bloom rounded-full flex items-center justify-center text-white font-black text-lg">
              {module.content.inspiring_story.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-black text-gray-900">{module.content.inspiring_story.name}</h3>
              <p className="text-sm text-gray-500">🇦🇫 {module.content.inspiring_story.country}</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">{module.content.inspiring_story.story}</p>
          <div className="bg-white rounded-xl p-3 border border-pink-100">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wide">Achievement</span>
            <p className="text-sm font-semibold text-gray-800 mt-1">🏆 {module.content.inspiring_story.achievement}</p>
          </div>
        </div>
        <button onClick={() => setActiveTab('takeaways')} className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90">
          Key Takeaways <ChevronRight size={18} />
        </button>
      </div>
    ),
    takeaways: (
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-purple-600" />
          <h2 className="text-xl font-black text-gray-900">Key Takeaways</h2>
        </div>
        <div className="space-y-3">
          {module.content.key_takeaways.map((t, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="w-7 h-7 rounded-full gradient-bloom flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</div>
              <p className="text-gray-700 text-sm leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setActiveTab('reflect')} className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90">
          Reflect & Act <ChevronRight size={18} />
        </button>
      </div>
    ),
    reflect: (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Lightbulb size={20} className="text-amber-500" />
          <h2 className="text-xl font-black text-gray-900">Reflect & Take Action</h2>
        </div>
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">💭 Reflection Question</h3>
          <p className="text-amber-900 leading-relaxed">{module.content.reflection}</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
          <h3 className="font-bold text-green-800 mb-3">✅ Your Activity Challenge</h3>
          <p className="text-green-900 leading-relaxed">{module.content.activity}</p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200 text-center">
          <p className="font-bold text-purple-800 mb-1">Ready to take the quiz?</p>
          <p className="text-purple-600 text-sm mb-4">Score 70% or more to complete this module and unlock the next one!</p>
          <Link href={`/modules/${module.id}/quiz`}
            className="gradient-bloom text-white px-8 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:opacity-90 text-sm">
            Take the Quiz 📝 <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    ),
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="text-white p-6 sm:p-8 relative overflow-hidden" style={{ backgroundColor: module.color }}>
        <div className="absolute right-6 top-6 text-7xl opacity-20">{module.emoji}</div>
        <div className="relative">
          <Link href="/modules" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={16} /> All Modules
          </Link>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-1">SDG {module.sdg_number}</p>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">{module.title}</h1>
          <p className="text-white/80">{module.description}</p>
          {status === 'completed' && (
            <span className="mt-3 inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              ✅ Completed
            </span>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-100 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === id ? 'text-purple-700 border-purple-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
              <Icon size={15} />{label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8 bg-white min-h-96">
        {status === 'locked' && (
          <div className="mb-4 bg-blue-50 rounded-xl px-4 py-3 text-blue-700 text-sm font-medium">
            Click &quot;Start Learning&quot; to begin and save your progress.
            <button onClick={handleStart} className="ml-3 underline font-bold">
              {starting ? 'Starting...' : 'Start Now →'}
            </button>
          </div>
        )}
        {tabContent[activeTab]}
      </div>

      {/* Quick Jump to Quiz */}
      {status !== 'locked' && (
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">Ready to test your knowledge?</p>
          <Link href={`/modules/${module.id}/quiz`}
            className="gradient-bloom text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90">
            Take Quiz <ChevronRight size={14} />
          </Link>
        </div>
      )}
    </div>
  )
}
