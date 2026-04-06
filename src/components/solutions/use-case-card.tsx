import type { UseCase } from "@/data/solutions";

interface UseCaseCardProps {
  useCase: UseCase;
}

export function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <article className="usecase-card">
      {/* Header */}
      <div className="usecase-card-header">
        <h3 className="text-lg font-bold text-white">{useCase.title}</h3>
      </div>

      {/* Contenu */}
      <div className="usecase-card-body">
        {/* Contexte */}
        <div className="usecase-section">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Contexte
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">{useCase.context}</p>
        </div>

        {/* Solution */}
        <div className="usecase-section">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Solution mise en place
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed">{useCase.solution}</p>
        </div>

        {/* Bénéfices */}
        <div className="usecase-benefits">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Bénéfices concrets
          </h4>
          <div className="flex flex-wrap gap-2">
            {useCase.benefits.map((benefit, idx) => (
              <span
                key={idx}
                className="usecase-benefit"
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
