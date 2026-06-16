'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { createClient } from '@/lib/supabase/client'
import { Badge, StudentBadge } from '@/types'
import { Trophy, Lock } from 'lucide-react'

const ALL_BADGES = [
  { name: 'First Bloom', description: 'Completed your very first SDG module!', icon: '🌱', color: '#10B981', condition: 'Complete Module 1' },
  { name: 'Equality Advocate', description: 'Completed the Gender Equality module', icon: '⚖️', color: '#EC4899', condition: 'Complete SDG 5' },
  { name: 'Climate Hero', description: 'Completed the Climate Action module', icon: '🌍', color: '#059669', condition: 'Complete SDG 13' },
  { name: 'SDG Champion', description: 'Completed 5 SDG modules', icon: '⭐', color: '#F59E0B', condition: 'Complete 5 modules' },
  { name: 'Future Leader', description: 'Completed 10 SDG modules', icon: '🏆', color: '#7C3AED', condition: 'Complete 10 modules' },
  { name: 'Change Maker', description: 'Completed 15 SDG modules', icon: '🌟', color: '#EC4899', condition: 'Complete 15 modules' },
  { name: 'Bloom Girl', description: 'Completed all 17 SDG modules — You are a true Bloom Girl!', icon: '👑', color: '#F59E0B', condition: 'Complete all 17 modules' },
]

const MILESTONES = [
  { count: 1, label: 'First Step', emoji: '🌱' },
  { count: 5, label: 'SDG Champion', emoji: '⭐' },
  { count: 10, label: 'Future Leader', emoji: '🏆' },
  { count: 15, label: 'Change Maker', emoji: '🌟' },
  { count: 17, label: 'Bloom Girl', emoji: '👑' },
]

export default function AchievementsPage() {
  const { profile } = useAuth()
  const { stats } = useProgress(profile?.id)
  const [earnedBadgeNames, setEarnedBadgeNames] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    const fetchBadges = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('student_badges')
        .select('badges(name)')
        .eq('student_id', profile.id)
      if (data) {
        const names = data.flatMap((d: any) => d.badges ? [d.badges.name] : [])
        setEarnedBadgeNames(names)
      }
      setLoading(false)
    }
    fetchBadges()
  }, [profile])

  const currentMilestone = MILESTONES.findLast(m => stats.modules_completed >= m.count)
  const nextMilestone = MILESTONES.find(m => stats.modules_completed < m.count)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Achievements 🏆</h1>
        <p className="text-gray-600 mt-2">Your earned badges and progress milestones</p>
      </div>

      {/* Progress Milestone Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">Module Progress</h2>
          <span className="text-sm font-bold text-purple-700">{stats.modules_completed}/17 modules</span>
        </div>
        <div className="relative w-full bg-gray-100 rounded-full h-4 mb-4">
          <div className="gradient-bloom h-4 rounded-full transition-all duration-700" style={{ width: `${stats.overall_percent}%` }} />
          {MILESTONES.map(m => (
            <div key={m.count} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2" style={{ left: `${(m.count / 17) * 100}%` }}>
              <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[8px] ${stats.modules_completed >= m.count ? 'bg-amber-400' : 'bg-gray-300'}`}>
                {m.emoji}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          {MILESTONES.map(m => (
            <div key={m.count} className={`text-center ${stats.modules_completed >= m.count ? 'text-purple-600 font-semibold' : ''}`}>
              <div>{m.emoji}</div>
              <div>{m.count}</div>
            </div>
          ))}
        </div>
        {nextMilestone && (
          <p className="text-sm text-gray-600 mt-3 text-center">
            Complete <strong>{nextMilestone.count - stats.modules_completed}</strong> more modules to earn the <strong>{nextMilestone.label}</strong> {nextMilestone.emoji} milestone!
          </p>
        )}
      </div>

      {/* Badges */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-xl">Your Badges</h2>
        <span className="text-sm text-gray-500">{earnedBadgeNames.length}/{ALL_BADGES.length} earned</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ALL_BADGES.map((badge) => {
          const earned = earnedBadgeNames.includes(badge.name)
          return (
            <div key={badge.name}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${earned ? 'border-amber-200 card-hover' : 'border-gray-100 opacity-60'}`}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: earned ? `${badge.color}20` : '#f3f4f6' }}>
                  {earned ? badge.icon : <Lock size={20} className="text-gray-400" />}
                </div>
                <div className="min-w-0">
                  <h3 className={`font-bold text-sm ${earned ? 'text-gray-900' : 'text-gray-400'}`}>{badge.name}</h3>
                  <p className={`text-xs mt-0.5 leading-relaxed ${earned ? 'text-gray-600' : 'text-gray-400'}`}>{badge.description}</p>
                  <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${earned ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {earned ? '✅ Earned' : `🔒 ${badge.condition}`}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* SDG Module Badges */}
      <div className="mt-8">
        <h2 className="font-bold text-gray-900 text-xl mb-4">SDG Module Completions</h2>
        <p className="text-sm text-gray-600 mb-4">A checkmark for each SDG module you have completed</p>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-3">
            {Array.from({ length: 17 }, (_, i) => {
              const num = i + 1
              const completed = stats.modules_completed >= num
              return (
                <div key={num} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${completed ? 'bg-purple-50' : 'bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${completed ? 'gradient-bloom text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {completed ? '✓' : num}
                  </div>
                  <span className="text-[10px] text-gray-500 text-center">{completed ? '✅' : '🔒'}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
