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
    errorType: 'timeout' | 'network_error' | 'server_error' | 'unknown'
    message: string
  }
  
  export type ExchangeApiResponse = ExchangeApiSuccess | ExchangeApiError
  
  export type ExchangeConnectionState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: ExchangeConnectionResult }
    | { status: 'error'; errorType: ExchangeApiError['errorType']; message: string }
  