import { ref, computed, type Ref } from 'vue'
import type { ChallengeDay, Task, DayStatus } from '@/types'
import { getInitialChallenge } from '@/data'

function allTasksComplete(tasks: Task[]): boolean {
    return tasks.every((t) => t.completed)
}

function computeDayStatus(day: ChallengeDay, previousDay: ChallengeDay | null): DayStatus {
    const prevComplete = !previousDay || allTasksComplete(previousDay.tasks)
    const thisComplete = allTasksComplete(day.tasks)
  
    if (!prevComplete) return 'locked'
    if (thisComplete) return 'completed'
    return 'in_progress'
}

export function useChallengeProgress() {
    const initial = getInitialChallenge()
    const days: Ref<ChallengeDay[]> = ref(initial.days.map((d) => ({ ...d, tasks: d.tasks.map((t) => ({ ...t })) })))
  
    const daysWithStatus = computed(() => {
      const result: ChallengeDay[] = []
      const rawDays = days.value
      for (let i = 0; i < rawDays.length; i++) {
        const day = rawDays[i]!
        const previousDay: ChallengeDay | null = i > 0 ? rawDays[i - 1] ?? null : null
        const status = computeDayStatus(day, previousDay)
        result.push({ ...day, status } as ChallengeDay)
      }
      return result
    })
  
    const completedDaysCount = computed(() =>
      daysWithStatus.value.filter((d) => d.status === 'completed').length
    )
  
    const currentDay = computed(() =>
      daysWithStatus.value.find((d) => d.status === 'in_progress') ?? null
    )
  
    const isChallengeComplete = computed(() =>
      daysWithStatus.value.length > 0 && daysWithStatus.value.every((d) => d.status === 'completed')
    )
  
    function toggleTask(dayId: string, taskId: string, completed: boolean): void {
      const day = days.value.find((d) => d.id === dayId)
      if (!day) return
      const task = day.tasks.find((t) => t.id === taskId)
      if (!task || task.type === 'exchange') return
      task.completed = completed
    }
  
    function setExchangeTaskComplete(dayId: string): void {
      const day = days.value.find((d) => d.id === dayId)
      if (!day) return
      const exchangeTask = day.tasks.find((t) => t.type === 'exchange')
      if (exchangeTask) exchangeTask.completed = true
    }
  
    function getDayById(dayId: string): ChallengeDay | undefined {
      return daysWithStatus.value.find((d) => d.id === dayId)
    }
  
    return {
      days: daysWithStatus,
      totalDays: initial.totalDays,
      completedDaysCount,
      currentDay,
      isChallengeComplete,
      toggleTask,
      setExchangeTaskComplete,
      getDayById,
    }
  }