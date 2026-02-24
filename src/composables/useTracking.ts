export function useTracking() {
    function track(eventName: string, payload?: Record<string, unknown>): void {
      const payloadStr = payload ? ` ${JSON.stringify(payload)}` : ''
      console.log(`[Track] ${eventName}${payloadStr}`)
    }
  
    return { track }
}