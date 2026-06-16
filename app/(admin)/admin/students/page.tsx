'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, Globe, Calendar, CheckCircle } from 'lucide-react'

interface StudentRow {
  id: string
  full_name: string
  email: string
  country: string
  age: number
  created_at: string
  modules_completed: number
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data: profiles } = await supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false })
      const { data: progress } = await supabase.from('student_progress').select('student_id').eq('status', 'completed')

      const completionMap: Record<string, number> = {}
      progress?.forEach(p => { completionMap[p.student_id] = (completionMap[p.student_id] || 0) + 1 })

      const rows = (profiles || []).map(p => ({
        ...p,
        modules_completed: completionMap[p.id] || 0
      }))
      setStudents(rows)
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = students.filter(s =>
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.country?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">{students.length} registered students</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-64" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No students found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Student</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Country</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Age</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Progress</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full gradient-bloom flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {student.full_name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{student.full_name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Globe size={13} /> {student.country || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{student.age || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-100 rounded-full h-1.5">
                          <div className="gradient-bloom h-1.5 rounded-full" style={{ width: `${(student.modules_completed / 17) * 100}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-600">{student.modules_completed}/17</span>
                        {student.modules_completed === 17 && <CheckCircle size={13} className="text-green-500" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar size={12} /> {new Date(student.created_at).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
