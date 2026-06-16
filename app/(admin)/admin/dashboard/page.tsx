'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SDG_MODULES } from '@/lib/data/sdg-modules'
import { Users, BookOpen, Award, TrendingUp, CheckCircle, Globe } from 'lucide-react'

interface AdminStats {
  total_students: number
  active_learners: number
  total_completions: number
  certificates_issued: number
  avg_completion: number
  top_modules: { module_id: number; count: number }[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentStudents, setRecentStudents] = useState<any[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      const [
        { count: totalStudents },
        { data: progress },
        { count: certificates },
        { data: students }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('student_progress').select('student_id, module_id, status'),
        supabase.from('certificates').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('id, full_name, country, created_at').eq('role', 'student').order('created_at', { ascending: false }).limit(5)
      ])

      const completedRows = progress?.filter(p => p.status === 'completed') || []
      const uniqueActive = new Set(progress?.map(p => p.student_id)).size
      const moduleCompletionMap: Record<number, number> = {}
      completedRows.forEach(p => {
        moduleCompletionMap[p.module_id] = (moduleCompletionMap[p.module_id] || 0) + 1
      })
      const topModules = Object.entries(moduleCompletionMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([module_id, count]) => ({ module_id: Number(module_id), count }))

      setStats({
        total_students: totalStudents || 0,
        active_learners: uniqueActive,
        total_completions: completedRows.length,
        certificates_issued: certificates || 0,
        avg_completion: totalStudents ? Math.round(completedRows.length / (totalStudents * 17) * 100) : 0,
        top_modules: topModules
      })
      setRecentStudents(students || [])
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 gradient-bloom rounded-full animate-pulse" />
    </div>
  )

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of Bloom Girl Africa platform activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: stats?.total_students, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Active Learners', value: stats?.active_learners, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Module Completions', value: stats?.total_completions, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Certificates Issued', value: stats?.certificates_issued, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <div className="text-3xl font-black text-gray-900">{value ?? 0}</div>
            <div className="text-sm text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Modules */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-purple-600" /> Most Completed Modules
          </h2>
          <div className="space-y-3">
            {stats?.top_modules.map(({ module_id, count }) => {
              const mod = SDG_MODULES.find(m => m.id === module_id)
              if (!mod) return null
              const pct = stats.total_students ? Math.round((count / stats.total_students) * 100) : 0
              return (
                <div key={module_id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span>{mod.emoji}</span>
                      <span className="font-medium text-gray-700">SDG {mod.sdg_number}: {mod.title}</span>
                    </span>
                    <span className="text-gray-500 font-semibold">{count} students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: mod.color }} />
                  </div>
                </div>
              )
            })}
            {(!stats?.top_modules.length) && (
              <p className="text-gray-400 text-sm text-center py-4">No completions yet</p>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={18} className="text-purple-600" /> Recent Sign-ups
          </h2>
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-full gradient-bloom flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {student.full_name?.charAt(0) || '?'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">{student.full_name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Globe size={10} /> {student.country || 'Africa'}
                  </p>
                </div>
                <p className="text-xs text-gray-400">{new Date(student.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            {!recentStudents.length && <p className="text-gray-400 text-sm text-center py-4">No students yet</p>}
          </div>
        </div>

        {/* Overall Completion Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="font-bold text-gray-900 mb-4">Platform Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-2xl font-black text-purple-700">{stats?.avg_completion ?? 0}%</div>
              <div className="text-xs text-gray-500 mt-1">Avg. Completion Rate</div>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="text-2xl font-black text-pink-700">{17}</div>
              <div className="text-xs text-gray-500 mt-1">Total SDG Modules</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-2xl font-black text-amber-700">{170}</div>
              <div className="text-xs text-gray-500 mt-1">Quiz Questions</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-black text-green-700">{7}</div>
              <div className="text-xs text-gray-500 mt-1">Achievement Badges</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
