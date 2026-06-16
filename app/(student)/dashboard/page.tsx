'use client'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { SDG_MODULES } from '@/lib/data/sdg-modules'
import Link from 'next/link'
import { Lock, CheckCircle, PlayCircle, ChevronRight, Trophy, BookOpen, Star, Zap } from 'lucide-react'

const MOTIVATIONAL_QUOTES = [
  "Every lesson you complete brings you closer to changing your world. 🌍",
  "You have the power to be the change Africa needs. 🌸",
  "Knowledge is the greatest gift you can give yourself. ✨",
  "The future belongs to those who believe in the beauty of their dreams. 💜",
  "She believed she could, so she did. 🏆",
]

function ProgressRing({ percent }: { percent: number }) {
  const r = 52
  const c = 2 * Math.PI * r
  const dash = (percent / 100) * c
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#EDE9FE" strokeWidth="12" />
      <circle cx="65" cy="65" r={r} fill="none" stroke="url(#grad)" strokeWidth="12"
        strokeDasharray={`${dash} ${c}`} strokeLinecap="round" className="transition-all duration-700" />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function DashboardPage() {
  const { profile } = useAuth()
  const { progress, stats, getModuleStatus, isModuleUnlocked } = useProgress(profile?.id)
  const quote = MOTIVATIONAL_QUOTES[new Date().getDay() % MOTIVATIONAL_QUOTES.length]

  const nextModule = SDG_MODULES.find(m => {
    const status = getModuleStatus(m.id)
    return status === 'in_progress' || status === 'locked'
  })
  const currentModule = SDG_MODULES.find(m => getModuleStatus(m.id) === 'in_progress')
  const completedModules = SDG_MODULES.filter(m => getModuleStatus(m.id) === 'completed')

  const firstName = profile?.full_name?.split(' ')[0] || 'Bloom Girl'

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="gradient-bloom rounded-3xl p-6 sm:p-8 text-white mb-6 relative overflow-hidden">
        <div className="absolute right-4 top-4 text-6xl opacity-20 select-none">🌸</div>
        <div className="relative">
          <p className="text-white/80 text-sm mb-1">Good to see you!</p>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">Welcome back, {firstName}! 🌸</h1>
          <p className="text-white/90 text-sm max-w-md">{quote}</p>
          {currentModule && (
            <Link href={`/modules/${currentModule.id}`}
              className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
              Continue: SDG {currentModule.sdg_number} — {currentModule.title} <ChevronRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Modules Done', value: stats.modules_completed, max: 17, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Quizzes Passed', value: stats.quizzes_passed, max: 17, icon: Star, color: 'text-pink-600', bg: 'bg-pink-50' },
          { label: 'Badges Earned', value: stats.badges_earned, max: 7, icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Progress', value: `${stats.overall_percent}%`, max: null, icon: Zap, color: 'text-green-600', bg: 'bg-green-50' },
        ].map(({ label, value, max, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className="text-2xl font-black text-gray-900">{value}{max ? <span className="text-sm font-normal text-gray-400">/{max}</span> : ''}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          <h2 className="font-bold text-gray-900 mb-4 self-start">Overall Progress</h2>
          <div className="relative">
            <ProgressRing percent={stats.overall_percent} />
            <div className="absolute inset-0 flex items-center justify-center flex-col rotate-0">
              <span className="text-3xl font-black text-gray-900">{stats.overall_percent}%</span>
              <span className="text-xs text-gray-500">Complete</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            {stats.modules_completed === 17
              ? '🎉 All modules complete! Download your certificate!'
              : `${17 - stats.modules_completed} modules remaining`}
          </p>
          {stats.modules_completed === 17 && (
            <Link href="/certificate" className="mt-3 gradient-bloom text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
              Get Certificate 🎓
            </Link>
          )}
        </div>

        {/* SDG Modules Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Your Modules</h2>
            <Link href="/modules" className="text-sm text-purple-600 font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {SDG_MODULES.map((module) => {
              const status = getModuleStatus(module.id)
              const unlocked = isModuleUnlocked(module.id)
              return (
                <Link key={module.id} href={unlocked ? `/modules/${module.id}` : '#'}
                  className={`relative rounded-xl p-2 text-center text-white text-xs font-bold transition-all ${unlocked ? 'card-hover cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                  style={{ backgroundColor: module.color }}>
                  <div className="text-base">{module.emoji}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">SDG {module.sdg_number}</div>
                  {status === 'completed' && (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  )}
                  {status === 'locked' && (
                    <div className="absolute -top-1 -right-1 bg-gray-400 rounded-full p-0.5">
                      <Lock size={10} className="text-white" />
                    </div>
                  )}
                  {status === 'in_progress' && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                      <PlayCircle size={10} className="text-white" />
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Completed</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> In Progress</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-400 rounded-full"></div> Locked</span>
          </div>
        </div>
      </div>

      {/* Recently Completed */}
      {completedModules.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Recently Completed 🎉</h2>
          <div className="flex flex-wrap gap-3">
            {completedModules.slice(-6).reverse().map(module => (
              <div key={module.id} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-sm">
                <span>{module.emoji}</span>
                <span className="font-medium text-green-800">SDG {module.sdg_number}: {module.title}</span>
                <CheckCircle size={14} className="text-green-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Module CTA */}
      {nextModule && stats.modules_completed < 17 && (
        <div className="mt-6">
          <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ backgroundColor: nextModule.color }}>
            <div className="absolute right-4 top-4 text-5xl opacity-20">{nextModule.emoji}</div>
            <div className="relative">
              <p className="text-white/80 text-sm mb-1">Next Up</p>
              <h3 className="text-xl font-black mb-1">SDG {nextModule.sdg_number}: {nextModule.title}</h3>
              <p className="text-white/80 text-sm mb-4">{nextModule.description}</p>
              <Link href={`/modules/${nextModule.id}`}
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                Start Module <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
