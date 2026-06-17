'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { StudentProgress, ModuleStatus, DashboardStats } from '@/types'

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<StudentProgress[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!userId) return
    const supabase = createClient()
    const { data } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', userId)
    if (data) setProgress(data as StudentProgress[])
    setLoading(false)
  }, [userId])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  const getModuleStatus = (moduleId: number): ModuleStatus => {
    const p = progress.find(p => p.module_id === moduleId)
    return p?.status ?? 'locked'
  }

  const isModuleUnlocked = (moduleId: number): boolean => {
    if (moduleId === 1) return true
    return getModuleStatus(moduleId) !== 'locked'
  }

  const completedCount = progress.filter(p => p.status === 'completed').length

  const stats: DashboardStats = {
    modules_completed: completedCount,
    quizzes_passed: completedCount,
    badges_earned: 0,
    overall_percent: Math.round((completedCount / 17) * 100)
  }

  const markModuleStarted = async (moduleId: number) => {
    if (!userId) return
    const supabase = createClient()
    await supabase.from('student_progress').upsert({
      student_id: userId,
      module_id: moduleId,
      status: 'in_progress',
      started_at: new Date().toISOString()
    }, { onConflict: 'student_id,module_id' })
    fetchProgress()
  }

  const markModuleCompleted = async (moduleId: number) => {
    if (!userId) return
    const supabase = createClient()
    await supabase.from('student_progress').upsert({
      student_id: userId,
      module_id: moduleId,
      status: 'completed',
      completed_at: new Date().toISOString()
    }, { onConflict: 'student_id,module_id' })

    // Unlock next module
    if (moduleId < 17) {
      const nextStatus = getModuleStatus(moduleId + 1)
      if (nextStatus === 'locked') {
        await supabase.from('student_progress').upsert({
          student_id: userId,
          module_id: moduleId + 1,
          status: 'in_progress'
        }, { onConflict: 'student_id,module_id' })
      }
    }

    fetchProgress()
  }

  return { progress, loading, getModuleStatus, isModuleUnlocked, stats, markModuleStarted, markModuleCompleted, refetch: fetchProgress, isLoading: loading }
}
