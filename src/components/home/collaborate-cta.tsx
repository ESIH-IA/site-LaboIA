export default function CollaborateCta() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Collaborer avec le laboratoire
              </h2>
              <p className="mt-2 max-w-2xl text-neutral-600">
                Partenariats institutionnels, stages, financements ou projets appliqués :
                construisons ensemble des solutions d’impact.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-800">
                Proposer un partenariat
              </button>
              <button className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-500">
                Candidater à un stage
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
