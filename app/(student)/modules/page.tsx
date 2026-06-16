'use client'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { SDG_MODULES } from '@/lib/data/sdg-modules'
import Link from 'next/link'
import { Lock, CheckCircle, PlayCircle, ChevronRight } from 'lucide-react'

export default function ModulesPage() {
  const { profile } = useAuth()
  const { getModuleStatus, isModuleUnlocked } = useProgress(profile?.id)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">17 SDG Modules</h1>
        <p className="text-gray-600 mt-2">Complete each module and pass the quiz to unlock the next. Earn your certificate when all 17 are done!</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SDG_MODULES.map((module) => {
          const status = getModuleStatus(module.id)
          const unlocked = isModuleUnlocked(module.id)

          return (
            <div key={module.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all ${unlocked ? 'card-hover' : 'opacity-60'}`}>
              {/* Color Header */}
              <div className="p-5 text-white relative overflow-hidden" style={{ backgroundColor: module.color }}>
                <div className="absolute right-3 top-3 text-4xl opacity-30">{module.emoji}</div>
                <div className="relative">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-75">SDG {module.sdg_number}</span>
                  <h3 className="text-xl font-black mt-1">{module.title}</h3>
                  <p className="text-white/80 text-sm mt-1 line-clamp-2">{module.description}</p>
                </div>
              </div>

              <div className="p-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  {status === 'completed' && (
                    <span className="flex items-center gap-1.5 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                      <CheckCircle size={12} /> Completed
                    </span>
                  )}
                  {status === 'in_progress' && (
                    <span className="flex items-center gap-1.5 text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                      <PlayCircle size={12} /> In Progress
                    </span>
                  )}
                  {status === 'locked' && (
                    <span className="flex items-center gap-1.5 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
                      <Lock size={12} /> Locked
                    </span>
                  )}
                  <span className="text-xs text-gray-400">10 questions</span>
                </div>

                {/* Content preview */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{module.content.introduction.substring(0, 120)}...</p>

                {/* Action */}
                {unlocked ? (
                  <Link href={`/modules/${module.id}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all text-white"
                    style={{ backgroundColor: module.color }}>
                    {status === 'completed' ? 'Review Module' : status === 'in_progress' ? 'Continue Learning' : 'Start Module'}
                    <ChevronRight size={16} />
                  </Link>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-400 bg-gray-100 cursor-not-allowed">
                    <Lock size={14} /> Complete previous module first
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
