"use client";

import { useReportWebVitals } from "next/web-vitals";

import { trackEvent } from "@/lib/analytics";

const consentCookie = "lacdia_cookie_consent";

function hasConsent() {
  if (typeof document === "undefined") return false;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${consentCookie}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() === "accepted";
  }
  return false;
}

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!hasConsent()) return;
    trackEvent({
      category: "web-vitals",
      action: metric.name,
      value: Math.round(metric.value),
    });
  });

  return null;
}
