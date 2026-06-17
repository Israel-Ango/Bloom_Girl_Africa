'use client'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { StudentProgress, ModuleStatus, DashboardStats } from '@/types'

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<StudentProgress[]>([])
  const [passedQuizzes, setPassedQuizzes] = useState<number[]>([]) // module IDs with a passed attempt
  const [initialized, setInitialized] = useState(false)

  const fetchProgress = useCallback(async () => {
    if (!userId) return
    const supabase = createClient()

    // Fetch both in parallel
    const [{ data: prog }, { data: attempts }] = await Promise.all([
      supabase.from('student_progress').select('*').eq('student_id', userId),
      supabase.from('quiz_attempts').select('module_id').eq('student_id', userId).eq('passed', true),
    ])

    if (prog) setProgress(prog as StudentProgress[])
    if (attempts) setPassedQuizzes(attempts.map((a: { module_id: number }) => a.module_id))
    setInitialized(true)
  }, [userId])

  useEffect(() => { fetchProgress() }, [fetchProgress])

  const getModuleStatus = (moduleId: number): ModuleStatus => {
    const p = progress.find(p => p.module_id === moduleId)
    return p?.status ?? 'locked'
  }

  // A module is unlocked if ANY of these are true:
  // 1. It's module 1
  // 2. It has its own non-locked progress row
  // 3. The previous module is marked completed in student_progress
  // 4. The previous module has a passed quiz attempt (fallback if upsert failed)
  const isModuleUnlocked = (moduleId: number): boolean => {
    if (moduleId === 1) return true
    if (getModuleStatus(moduleId) !== 'locked') return true
    if (getModuleStatus(moduleId - 1) === 'completed') return true
    if (passedQuizzes.includes(moduleId - 1)) return true
    return false
  }

  const completedCount = progress.filter(p => p.status === 'completed').length

  const stats: DashboardStats = {
    modules_completed: completedCount,
    quizzes_passed: passedQuizzes.length,
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
    passedQuizzes,
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
