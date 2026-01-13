import type { UseCase } from "@/data/solutions";

interface UseCaseCardProps {
  useCase: UseCase;
}

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-200 transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 px-6 py-5">
        <h3 className="text-lg font-bold text-white">{useCase.title}</h3>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col bg-slate-50 p-6">
        {/* Contexte */}
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Contexte
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">{useCase.context}</p>
        </div>

        {/* Solution */}
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Solution mise en place
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">{useCase.solution}</p>
        </div>

        {/* Bénéfices */}
        <div className="mt-auto">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Bénéfices concrets
          </h4>
          <div className="flex flex-wrap gap-2">
            {useCase.benefits.map((benefit, idx) => (
              <span
                key={idx}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
