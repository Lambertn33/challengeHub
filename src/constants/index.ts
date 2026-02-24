export const TASK_TYPE = {
    NORMAL: 'normal',
    EXCHANGE: 'exchange',
} as const

export const DAY_STATUS = {
    LOCKED: 'locked',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
} as const

export const CHALLENGE_STATUS = {
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
} as const

export const EXCHANGE_API_ERROR_TYPES = {
    TIMEOUT: 'timeout',
    NETWORK_ERROR: 'network_error',
    SERVER_ERROR: 'server_error',
    UNKNOWN: 'unknown',
} as const

export const EXCHANGE_CONNECTION_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const