'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { StudentProgress, ModuleStatus, DashboardStats } from '@/types'

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<StudentProgress[]>([])
  const [initialized, setInitialized] = useState(false) // true once first fetch done

  const fetchProgress = useCallback(async () => {
    if (!userId) return
    const supabase = createClient()
    const { data } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', userId)
    if (data) setProgress(data as StudentProgress[])
    setInitialized(true)
  }, [userId])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  const getModuleStatus = (moduleId: number): ModuleStatus => {
    const p = progress.find(p => p.module_id === moduleId)
    return p?.status ?? 'locked'
  }

  // A module is unlocked if:
  // - It's module 1 (always open)
  // - It has its own progress row (any status != locked)
  // - OR the previous module is completed (catches cases where row wasn't created)
  const isModuleUnlocked = (moduleId: number): boolean => {
    if (moduleId === 1) return true
    if (getModuleStatus(moduleId) !== 'locked') return true
    return getModuleStatus(moduleId - 1) === 'completed'
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

    // Always create next module row
    if (moduleId < 17) {
      await supabase.from('student_progress').upsert({
        student_id: userId,
        module_id: moduleId + 1,
        status: 'in_progress',
        started_at: new Date().toISOString()
      }, { onConflict: 'student_id,module_id' })
    }

    await fetchProgress()
  }

  return {
    progress,
    loading: !initialized,
    isLoading: !initialized,
    initialized,
    getModuleStatus,
    isModuleUnlocked,
    stats,
    markModuleStarted,
    markModuleCompleted,
    refetch: fetchProgress,
  }
}
