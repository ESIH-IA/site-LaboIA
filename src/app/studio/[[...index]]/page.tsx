"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import config from "../../../../sanity.config";

const Studio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
});

const DISABLE_TRANSITION_WARNING =
  "React does not recognize the `disableTransition` prop on a DOM element.";

export default function StudioPage() {
  useEffect(() => {
    const original = console.error;
    console.error = (...args: unknown[]) => {
      const first = typeof args[0] === "string" ? args[0] : "";
      if (first.includes(DISABLE_TRANSITION_WARNING)) return;
      original(...args);
    };
    return () => {
      console.error = original;
    };
  }, []);

  return <Studio config={config} />;
}
