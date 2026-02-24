import { EXCHANGE_API_ERROR_TYPES, EXCHANGE_CONNECTION_STATES } from '@/constants'

export interface ExchangeConnectionResult {
    connected: boolean
    exchangeName?: string
    userId?: string
  }
  
  export interface ExchangeApiSuccess {
    ok: true
    data: ExchangeConnectionResult
    responseTimeMs: number
  }
  
  export interface ExchangeApiError {
    ok: false
    errorType: 
      typeof EXCHANGE_API_ERROR_TYPES.TIMEOUT 
    | typeof EXCHANGE_API_ERROR_TYPES.NETWORK_ERROR 
    | typeof EXCHANGE_API_ERROR_TYPES.SERVER_ERROR 
    | typeof EXCHANGE_API_ERROR_TYPES.UNKNOWN
    message: string
  }
  
  export type ExchangeApiResponse = ExchangeApiSuccess | ExchangeApiError
  
  export type ExchangeConnectionState =
    | { status: typeof EXCHANGE_CONNECTION_STATES.IDLE }
    | { status: typeof EXCHANGE_CONNECTION_STATES.LOADING }
    | { status: typeof EXCHANGE_CONNECTION_STATES.SUCCESS; data: ExchangeConnectionResult }
    | { status: typeof EXCHANGE_CONNECTION_STATES.ERROR; 
        errorType: typeof EXCHANGE_API_ERROR_TYPES.TIMEOUT 
        | typeof EXCHANGE_API_ERROR_TYPES.NETWORK_ERROR 
        | typeof EXCHANGE_API_ERROR_TYPES.SERVER_ERROR 
        | typeof EXCHANGE_API_ERROR_TYPES.UNKNOWN; 
      message: string }
  