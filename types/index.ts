export type UserRole = 'student' | 'admin'
export type ModuleStatus = 'locked' | 'in_progress' | 'completed'

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string
  country: string
  age: number
  role: UserRole
  avatar_url?: string
  created_at: string
}

export interface SDGModule {
  id: number
  sdg_number: number
  title: string
  description: string
  color: string
  emoji: string
  content: ModuleContent
  order_index: number
}

export interface ModuleContent {
  introduction: string
  sections: ContentSection[]
  inspiring_story: InspiringStory
  key_takeaways: string[]
  reflection: string
  activity: string
}

export interface ContentSection {
  heading: string
  body: string
  africa_example: string
}

export interface InspiringStory {
  name: string
  country: string
  story: string
  achievement: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface QuizSet {
  module_id: number
  questions: QuizQuestion[]
}

export interface StudentProgress {
  id: string
  student_id: string
  module_id: number
  status: ModuleStatus
  started_at?: string
  completed_at?: string
}

export interface QuizAttempt {
  id: string
  student_id: string
  module_id: number
  score: number
  total_questions: number
  passed: boolean
  answers: Record<string, number>
  attempted_at: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  condition_type: 'module_complete' | 'milestone'
  condition_value: number
}

export interface StudentBadge {
  id: string
  student_id: string
  badge_id: string
  earned_at: string
  badge?: Badge
}

export interface Certificate {
  id: string
  student_id: string
  issued_at: string
  certificate_number: string
}

export interface DashboardStats {
  modules_completed: number
  quizzes_passed: number
  badges_earned: number
  overall_percent: number
}
