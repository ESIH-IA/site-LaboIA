"use client";

import { useTranslations } from "next-intl";

import type { Person } from "@/data/governance/types";

interface GovernanceChartPremiumProps {
  topPerson: Person;
  coFounders: [Person, Person];
  associateResearchers?: Person[];
}

function scrollToProfile(personId: string) {
  const element = document.getElementById(`profile-${personId}`);
  if (element) {
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}

function PremiumCard({
  person,
  level,
  onClick,
}: {
  person: Person;
  level: "gouvernance" | "direction" | "conseil";
  onClick?: () => void;
}) {
  const t = useTranslations("governance");
  const isFuture = person.status === "futur";

  const colorSchemes = {
    gouvernance: {
      top: "bg-linear-to-br from-slate-600 to-slate-700",
      topHover: "group-hover:from-slate-500 group-hover:to-slate-600",
      accent: "from-slate-500 to-slate-600",
      badgeBg: "rgba(100,116,139,0.15)",
      badgeBorder: "rgba(100,116,139,0.25)",
    },
    direction: {
      top: "bg-linear-to-br from-cyan-500 to-teal-600",
      topHover: "group-hover:from-cyan-400 group-hover:to-teal-500",
      accent: "from-cyan-500 to-teal-500",
      badgeBg: "rgba(0,212,170,0.12)",
      badgeBorder: "rgba(0,212,170,0.25)",
    },
    conseil: {
      top: "bg-linear-to-br from-violet-600 to-violet-700",
      topHover: "group-hover:from-violet-500 group-hover:to-violet-600",
      accent: "from-violet-500 to-cyan-500",
      badgeBg: "rgba(108,99,255,0.12)",
      badgeBorder: "rgba(108,99,255,0.25)",
    },
  };

  const colors = colorSchemes[level];
  const isGouvernance = level === "gouvernance";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300",
        "hover:-translate-y-2 cursor-pointer focus:outline-none",
        isFuture ? "opacity-60" : "",
        "w-full",
      ].join(" ")}
      style={{
        background: "var(--labo-surface)",
        border: "1px solid var(--labo-border)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,170,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,212,170,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--labo-border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
      }}
      aria-label={t("viewProfileOf", { name: person.name })}
    >
      {/* Accent Bar Top */}
      <div className={`absolute left-0 right-0 top-0 h-1 bg-linear-to-r ${colors.accent}`} />

      {/* Photo zone */}
      <div
        className={[
          "relative flex items-center justify-center transition-all duration-500",
          colors.top,
          colors.topHover,
          isGouvernance ? "h-36" : "h-32",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-4 ring-white/30 shadow-2xl",
            isGouvernance ? "h-24 w-24" : "h-20 w-20",
          ].join(" ")}
        >
          <span
            className={[
              "font-bold text-white",
              isGouvernance ? "text-3xl" : "text-2xl",
            ].join(" ")}
          >
            {person.initials}
          </span>
        </div>

        {isFuture ? (
          <div className="absolute right-4 top-4 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-amber-900 shadow-lg">
            {t("upcoming")}
          </div>
        ) : null}
      </div>

      {/* Content zone */}
      <div className="flex flex-col items-center px-6 py-5 text-center">
        <h3
          className={[
            "font-bold transition-colors",
            isGouvernance ? "text-xl mb-3" : "text-lg mb-2",
          ].join(" ")}
          style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
        >
          {person.name}
        </h3>
        {person.roleTitle ? (
          <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--labo-text-muted)" }}>
            {person.roleTitle}
          </p>
        ) : null}
        {person.affiliation && person.affiliation !== "À déterminer" ? (
          <p className="mt-1.5 text-xs italic" style={{ color: "rgba(136,146,176,0.55)" }}>
            {person.affiliation}
          </p>
        ) : null}
      </div>
    </button>
  );
}

function ConnectionLine({
  orientation = "vertical",
  length = 48,
}: {
  orientation?: "vertical" | "horizontal";
  length?: number;
}) {
  return (
    <svg
      width={orientation === "horizontal" ? length : 2}
      height={orientation === "horizontal" ? 2 : length}
      className="shrink-0"
      aria-hidden="true"
    >
      <line
        x1={orientation === "horizontal" ? 0 : 1}
        y1={orientation === "horizontal" ? 1 : 0}
        x2={orientation === "horizontal" ? length : 1}
        y2={orientation === "horizontal" ? 1 : length}
        stroke="rgba(136,146,176,0.25)"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export function GovernanceChartPremium({
  topPerson,
  coFounders,
  associateResearchers = [],
}: GovernanceChartPremiumProps) {
  const t = useTranslations("governance");

  if (!topPerson || coFounders.length !== 2) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          border: "1px dashed var(--labo-border)",
          background: "var(--labo-surface)",
        }}
      >
        <p className="text-base" style={{ color: "var(--labo-text-muted)" }}>
          {t("invalidPremiumConfig")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-16">
      {/* Desktop layout */}
      <div className="hidden flex-col items-center md:flex w-full">
        <div className="flex justify-center w-full mb-12">
          <div className="w-full max-w-sm">
            <PremiumCard
              person={topPerson}
              level="gouvernance"
              onClick={() => scrollToProfile(topPerson.id)}
            />
          </div>
        </div>

        <ConnectionLine orientation="vertical" length={48} />
        <ConnectionLine orientation="horizontal" length={400} />

        <div className="flex justify-center w-full mt-8 mb-16">
          <div className="grid grid-cols-2 gap-16 max-w-4xl">
            {coFounders.map((coFounder) => (
              <div key={coFounder.id} className="flex flex-col items-center">
                <ConnectionLine orientation="vertical" length={32} />
                <div className="mt-6 w-full max-w-xs">
                  <PremiumCard
                    person={coFounder}
                    level="direction"
                    onClick={() => scrollToProfile(coFounder.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {associateResearchers.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <div className="mb-16 flex items-center justify-center gap-4">
              <div
                className="h-px w-24 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)" }}
              />
              <span
                className="rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider"
                style={{
                  border: "1px solid rgba(108,99,255,0.25)",
                  background: "rgba(108,99,255,0.08)",
                  color: "#a78bfa",
                }}
              >
                {t("scientificCouncil")}
              </span>
              <div
                className="h-px w-24 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)" }}
              />
            </div>

            <div className="flex justify-center gap-12 max-w-5xl">
              {associateResearchers.map((researcher) => (
                <div key={researcher.id} className="w-full max-w-72">
                  <PremiumCard
                    person={researcher}
                    level="conseil"
                    onClick={() => scrollToProfile(researcher.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-8 md:hidden">
        <PremiumCard
          person={topPerson}
          level="gouvernance"
          onClick={() => scrollToProfile(topPerson.id)}
        />

        <div
          className="pl-6"
          style={{ borderLeft: "2px dashed rgba(136,146,176,0.2)" }}
        >
          <div className="flex flex-col gap-8">
            {coFounders.map((coFounder) => (
              <PremiumCard
                key={coFounder.id}
                person={coFounder}
                level="direction"
                onClick={() => scrollToProfile(coFounder.id)}
              />
            ))}
          </div>
        </div>

        {associateResearchers.length > 0 ? (
          <div className="mt-8">
            <div className="mb-8 flex items-center gap-4">
              <div
                className="h-px flex-1 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.4))" }}
              />
              <span
                className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                style={{
                  border: "1px solid rgba(108,99,255,0.2)",
                  background: "rgba(108,99,255,0.08)",
                  color: "#a78bfa",
                }}
              >
                {t("scientificCouncil")}
              </span>
              <div
                className="h-px flex-1 rounded-full"
                style={{ background: "linear-gradient(90deg, rgba(108,99,255,0.4), transparent)" }}
              />
            </div>
            <div className="flex flex-col gap-8">
              {associateResearchers.map((researcher) => (
                <PremiumCard
                  key={researcher.id}
                  person={researcher}
                  level="conseil"
                  onClick={() => scrollToProfile(researcher.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}