import { Analytics, logEvent } from 'firebase/analytics';
import { analytics } from '@/lib/firebase';

// Explicitly type the analytics instance
const firebaseAnalytics: Analytics | null = analytics;

export function trackPageView(url: string) {
  if (firebaseAnalytics) {
    logEvent(firebaseAnalytics, 'page_view', {
      page_path: url
    });
  }
}

export function trackAuthEvent(eventName: string, properties?: Record<string, any>) {
  if (firebaseAnalytics) {
    logEvent(firebaseAnalytics, eventName, properties);
  }
}