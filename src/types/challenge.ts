//exchange = requires exchange API to mark complete; others are user-togglable.
export interface Task {
    id: string
    label: string
    completed: boolean
    type: 'normal' | 'exchange'
  }
  
  export type DayStatus = 'locked' | 'in_progress' | 'completed'
  
  export interface ChallengeDay {
    id: string
    dayNumber: number
    title: string
    tasks: Task[]
    status: DayStatus
  }
  
  export interface Challenge {
    days: ChallengeDay[]
    totalDays: number
  }
  