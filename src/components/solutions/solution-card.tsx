"use client";

import { useState } from "react";
import type { AISolution } from "@/data/solutions";

interface SolutionCardProps {
  solution: AISolution;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="solution-card">
      {/* Header avec titre */}
      <div className="solution-card-header">
        <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a'}}>{solution.title}</h3>
        <p style={{marginTop:'0.5rem', fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>
          {solution.shortDescription}
        </p>
      </div>

      {/* Contenu principal */}
      <div className="solution-card-body">
        <div className="solution-benefits" style={{ marginBottom: "1rem" }}>
          <ul className="space-y-2">
            {solution.benefits.map((benefit, idx) => (
              <li key={idx} className="solution-benefit-item">
                <svg
                  className="solution-benefit-icon"
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

        {solution.examples.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="solution-toggle"
              aria-label={solution.title}
            >
              <svg
                className={`solution-toggle-chevron ${showDetails ? "solution-toggle-chevron--open" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDetails && (
              <div className="solution-examples-box">
                <ul className="space-y-2">
                  {solution.examples.map((example, idx) => (
                    <li key={idx} className="solution-example-item">
                      {example}
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
