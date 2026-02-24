import type { Challenge, ChallengeDay, Task } from '@/types';

function createTask(id: string, label: string, type: Task['type'], completed = false): Task {
  return { id, label, completed, type }
}


function createDay(dayNumber: number, title: string, tasks: Task[]): ChallengeDay {
    return {
      id: `day-${dayNumber}`,
      dayNumber,
      title,
      tasks,
      status: dayNumber === 1 ? 'in_progress' : 'locked',
    }
}

export function getInitialChallenge(): Challenge {
    const days: ChallengeDay[] = [
      createDay(1, 'Getting started', [
        createTask('day1-watch', "Watch today's lesson", 'normal'),
        createTask('day1-connect-exchange', 'Connect your exchange account', 'exchange'),
        createTask('day1-practice', 'Place 1 practice trade', 'normal'),
      ]),
      createDay(2, 'Risk management', [
        createTask('day2-watch', "Watch today's lesson", 'normal'),
        createTask('day2-screenshot', 'Post your trade screenshot', 'normal'),
      ]),
      createDay(3, 'Chart patterns', [
        createTask('day3-watch', "Watch today's lesson", 'normal'),
        createTask('day3-trade', 'Place 1 practice trade', 'normal'),
        createTask('day3-screenshot', 'Post your trade screenshot', 'normal'),
      ]),
      createDay(4, 'Position sizing', [
        createTask('day4-watch', "Watch today's lesson", 'normal'),
        createTask('day4-trade', 'Place 1 practice trade', 'normal'),
      ]),
      createDay(5, 'Review & next steps', [
        createTask('day5-watch', "Watch today's lesson", 'normal'),
        createTask('day5-screenshot', 'Post your trade screenshot', 'normal'),
      ]),
    ]
  
    return {
      days,
      totalDays: days.length,
    }
  }