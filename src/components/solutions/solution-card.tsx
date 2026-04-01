"use client";

import { useState } from "react";
import type { AISolution } from "@/data/solutions";

interface SolutionCardProps {
  solution: AISolution;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header avec titre */}
      <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900">{solution.title}</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {solution.shortDescription}
        </p>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1 flex-col p-6">
        {/* Bénéfices */}
        <div className="mb-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Ce que ça apporte
          </h4>
          <ul className="space-y-2">
            {solution.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Badge applicable à tous */}
        <div className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-800">
          ✓ Applicable à tous les secteurs
        </div>

        {/* Bouton voir exemples */}
        {solution.examples.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-800"
            >
              {showDetails ? "Masquer les exemples" : "Voir les exemples d&apos;usage"}
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Exemples d'usage (collapsible) */}
            {showDetails && (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Exemples d&apos;usage
                </h5>
                <ul className="space-y-2">
                  {solution.examples.map((example, idx) => (
                    <li key={idx} className="text-sm text-slate-600">
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
