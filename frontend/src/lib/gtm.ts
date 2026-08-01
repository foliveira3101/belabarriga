declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function pushEvent(event: string, data?: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
