import type { Challenge, ChallengeDay, Task } from '@/types';
import { DAY_STATUS, TASK_TYPE } from '@/constants';

function createTask(id: string, label: string, type: Task['type'], completed = false): Task {
  return { id, label, completed, type }
}


function createDay(dayNumber: number, title: string, tasks: Task[]): ChallengeDay {
    return {
      id: `day-${dayNumber}`,
      dayNumber,
      title,
      tasks,
        status: dayNumber === 1 ? DAY_STATUS.IN_PROGRESS : DAY_STATUS.LOCKED,
    }
}

export function getInitialChallenge(): Challenge {
    const days: ChallengeDay[] = [
      createDay(1, 'Getting started', [
        createTask('day1-watch', "Watch today's lesson", TASK_TYPE.NORMAL),
        createTask('day1-connect-exchange', 'Connect your exchange account', TASK_TYPE.EXCHANGE),
        createTask('day1-practice', 'Place 1 practice trade', TASK_TYPE.NORMAL),
      ]),
      createDay(2, 'Risk management', [
        createTask('day2-watch', "Watch today's lesson", TASK_TYPE.NORMAL),
        createTask('day2-screenshot', 'Post your trade screenshot', TASK_TYPE.NORMAL),
      ]),
      createDay(3, 'Chart patterns', [
        createTask('day3-watch', "Watch today's lesson", TASK_TYPE.NORMAL),
        createTask('day3-trade', 'Place 1 practice trade', TASK_TYPE.NORMAL),
        createTask('day3-screenshot', 'Post your trade screenshot', TASK_TYPE.NORMAL),
      ]),
      createDay(4, 'Position sizing', [
        createTask('day4-watch', "Watch today's lesson", TASK_TYPE.NORMAL),
        createTask('day4-trade', 'Place 1 practice trade', TASK_TYPE.NORMAL),
      ]),
      createDay(5, 'Review & next steps', [
        createTask('day5-watch', "Watch today's lesson", TASK_TYPE.NORMAL),
        createTask('day5-screenshot', 'Post your trade screenshot', TASK_TYPE.NORMAL),
      ]),
    ]
  
    return {
      days,
      totalDays: days.length,
    }
  }