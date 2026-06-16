'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SDG_MODULES } from '@/lib/data/sdg-modules'
import { BarChart2, TrendingUp, Award, Users } from 'lucide-react'

export default function AdminAnalyticsPage() {
  const [moduleStats, setModuleStats] = useState<{ module_id: number; completions: number; attempts: number; avg_score: number }[]>([])
  const [quizStats, setQuizStats] = useState<{ pass_rate: number; avg_score: number; total_attempts: number }>({ pass_rate: 0, avg_score: 0, total_attempts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const [{ data: progress }, { data: attempts }] = await Promise.all([
        supabase.from('student_progress').select('module_id, status'),
        supabase.from('quiz_attempts').select('module_id, score, passed')
      ])

      const completionsByModule: Record<number, number> = {}
      progress?.filter(p => p.status === 'completed').forEach(p => {
        completionsByModule[p.module_id] = (completionsByModule[p.module_id] || 0) + 1
      })

      const attemptsByModule: Record<number, number[]> = {}
      attempts?.forEach(a => {
        if (!attemptsByModule[a.module_id]) attemptsByModule[a.module_id] = []
        attemptsByModule[a.module_id].push(a.score)
      })

      const stats = SDG_MODULES.map(m => ({
        module_id: m.id,
        completions: completionsByModule[m.id] || 0,
        attempts: attemptsByModule[m.id]?.length || 0,
        avg_score: attemptsByModule[m.id]?.length
          ? Math.round(attemptsByModule[m.id].reduce((a, b) => a + b, 0) / attemptsByModule[m.id].length)
          : 0,
      }))
      setModuleStats(stats)

      const totalAttempts = attempts?.length || 0
      const passedAttempts = attempts?.filter(a => a.passed).length || 0
      const totalScore = attempts?.reduce((sum, a) => sum + a.score, 0) || 0
      setQuizStats({
        total_attempts: totalAttempts,
        pass_rate: totalAttempts ? Math.round((passedAttempts / totalAttempts) * 100) : 0,
        avg_score: totalAttempts ? Math.round(totalScore / totalAttempts) : 0,
      })
      setLoading(false)
    }
    fetch()
  }, [])

  const maxCompletions = Math.max(...moduleStats.map(m => m.completions), 1)

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Platform performance and learning insights</p>
      </div>

      {/* Quiz Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Quiz Attempts', value: quizStats.total_attempts, icon: BarChart2, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Overall Pass Rate', value: `${quizStats.pass_rate}%`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Average Score', value: `${quizStats.avg_score}%`, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className="text-2xl font-black text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Module Completion Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart2 size={18} className="text-purple-600" /> Module Completion Chart
        </h2>
        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading analytics...</div>
        ) : (
          <div className="space-y-3">
            {moduleStats.map(({ module_id, completions, attempts, avg_score }) => {
              const mod = SDG_MODULES.find(m => m.id === module_id)
              if (!mod) return null
              const barWidth = maxCompletions > 0 ? (completions / maxCompletions) * 100 : 0
              return (
                <div key={module_id} className="grid grid-cols-12 items-center gap-3 text-sm">
                  <div className="col-span-1 text-center">
                    <span className="text-base">{mod.emoji}</span>
                  </div>
                  <div className="col-span-3 text-gray-600 font-medium truncate">
                    SDG {mod.sdg_number}
                  </div>
                  <div className="col-span-5">
                    <div className="w-full bg-gray-100 rounded-full h-5 relative">
                      <div className="h-5 rounded-full flex items-center pl-2 transition-all duration-700 text-white text-xs font-bold"
                        style={{ width: `${Math.max(barWidth, 8)}%`, backgroundColor: mod.color }}>
                        {completions > 0 && completions}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 text-right text-xs text-gray-500">
                    {attempts} tries · {avg_score}% avg
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
