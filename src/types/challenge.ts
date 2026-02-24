import { TASK_TYPE, DAY_STATUS } from '@/constants'

//exchange = requires exchange API to mark complete; others are user-togglable.
export interface Task {
    id: string
    label: string
    completed: boolean
    type: typeof TASK_TYPE.NORMAL | typeof TASK_TYPE.EXCHANGE
  }
  
  export type DayStatus = typeof DAY_STATUS.LOCKED | typeof DAY_STATUS.IN_PROGRESS | typeof DAY_STATUS.COMPLETED
  
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
  