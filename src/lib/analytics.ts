type EventPayload = {
  category: string;
  action: string;
  name?: string;
  value?: number;
};

export function trackEvent({ category, action, name, value }: EventPayload) {
  if (typeof window === "undefined") return;

  const matomo = (window as unknown as { _paq?: unknown[] })._paq;
  if (matomo) {
    matomo.push(["trackEvent", category, action, name, value]);
  }

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag("event", action, { event_category: category, event_label: name, value });
  }
}
