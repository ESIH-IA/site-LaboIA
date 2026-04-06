import type { Metadata } from "next";
import Link from "next/link";

import { getServerLocale } from "@/lib/i18n-server";
import { localizedPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { services, servicePoles, techDepartmentInfo } from "@/data/services";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return await buildMetadata({
    locale,
    title: "LaCDIA Tech - Département Technologique et Innovation",
    description:
      "Transformez votre recherche en solutions concrètes. Découvrez nos services de développement, conseil et formation en IA pour institutions et entreprises.",
    path: localizedPath("/lacdia-tech", locale),
    alternates: {
      fr: localizedPath("/lacdia-tech", "fr"),
      en: localizedPath("/lacdia-tech", "en"),
    },
  });
}

export default async function LaCDIATechPage() {
  const locale = await getServerLocale();

  // Group services by pole
  const servicesByPole = services.reduce(
    (acc, service) => {
      if (!acc[service.pole]) {
        acc[service.pole] = [];
      }
      acc[service.pole].push(service);
      return acc;
    },
    {} as Record<string, typeof services>,
  );

  const pipelineSteps = [
    {
      phase: 1,
      name: "Recherche",
      inputs: ["Production scientifique", "Prototypes de laboratoire"],
      outputs: ["Publications", "POC validés"],
      description: "Exploration et validation scientifique des concepts",
    },
    {
      phase: 2,
      name: "Maturation",
      inputs: ["Validation technique", "Études de marché"],
      outputs: ["Prototype avancé", "Business plan"],
      description: "Raffinement et faisabilité commerciale",
    },
    {
      phase: 3,
      name: "Développement",
      inputs: ["Ingénierie logicielle", "Tests rigoureux"],
      outputs: ["MVP", "Documentation complète"],
      description: "Implémentation production-ready",
    },
    {
      phase: 4,
      name: "Déploiement",
      inputs: ["Mise en production", "Support utilisateur"],
      outputs: ["Solution opérationnelle", "Revenu généré"],
      description: "Adoption et impact à grande échelle",
    },
  ];

  const useCases = [
    {
      sector: "Agriculture",
      title: "Système de Détection de Maladies des Cultures par IA",
      description:
        "Solution de vision par ordinateur et analyse d'images pour identifier et prédire les maladies des cultures en temps réel, permettant aux agriculteurs des Caraïbes d'intervenir avant les pertes massives.",
      impacts: [
        "Réduction des pertes agricoles de 35-40%",
        "Rendement optimisé grâce à détection précoce",
        "Accessibilité via application mobile hors ligne",
      ],
    },
    {
      sector: "Santé",
      title: "Assistant de Structuration de Comptes Rendus Médicaux",
      description:
        "Chatbot NLP pour assister les professionnels de santé dans la création de comptes rendus structurés conformes aux standards internationaux, en français et en créole haïtien.",
      impacts: [
        "Gain de temps de 40% sur rédaction de rapports",
        "Conformité aux standards médicaux",
        "Documentation de qualité pour audit et recherche",
      ],
    },
    {
      sector: "Services Publics",
      title: "Plateforme e-Gouvernement avec Automatisation Documentaire",
      description:
        "Plateforme SaaS intégrant traitement automatique de documents administratifs, validation d'identité, et workflow de dossiers pour gouvernements caribéens modernisant leurs services.",
      impacts: [
        "Réduction du temps de traitement administratif de 60%",
        "Accès citoyen amélioré et plus transparent",
        "Réduction des coûts opérationnels",
      ],
    },
    {
      sector: "Finance",
      title: "Système de Détection de Fraudes pour Institutions Financières",
      description:
        "Système de machine learning pour analyse en temps réel des transactions financières, identification de patterns frauduleux et alertes intelligentes pour équipes de conformité.",
      impacts: [
        "Détection de fraudes avec 94% de précision",
        "Réduction des pertes fraudes de 55%",
        "Conformité accrue aux standards FATF/AML",
      ],
    },
  ];

  const clientCategories = [
    {
      title: "Institutions Publiques",
      description: "Ministères, collectivités, administrations en transformation numérique",
      icon: "landmark",
    },
    {
      title: "Secteur Privé",
      description: "Banques, agriculture, télécoms, grande distribution",
      icon: "briefcase",
    },
    {
      title: "Organisations Internationales",
      description: "BID, PNUD, FAO, OMS, bailleurs de fonds",
      icon: "globe",
    },
    {
      title: "Monde Académique",
      description: "Universités, centres de recherche, écoles d'ingénieurs",
      icon: "book",
    },
  ];

  const engagementModels = [
    {
      model: "Forfait Projet",
      description: "Scope et budget défini, timeline fixe pour projet clairement délimité",
      ideal: "Projets bien spécifiés avec livrables clairs",
      icon: "package",
    },
    {
      model: "Régie",
      description: "Facturation au temps et matériaux, flexibilité maximale sur scope",
      ideal: "Projets exploratoires ou en évolution",
      icon: "calendar",
    },
    {
      model: "Abonnement",
      description: "Support SaaS et maintenance mensuelle incluse pour solutions existantes",
      ideal: "Solutions cloud à long terme avec support",
      icon: "repeat",
    },
    {
      model: "Licence",
      description: "Modules réutilisables et solutions packagées avec droits d'exploitation",
      ideal: "Solutions à déployer dans plusieurs contextes",
      icon: "key",
    },
  ];

  return (
    <main className="section-white">
      {/* SECTION 1: HERO */}
      <section className="page-hero" style={{
        background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(15, 23, 42) 100%)',
      }}>
        {/* Gradient mesh background */}
        <div style={{position:'absolute', inset:0, overflow:'hidden'}}>
          <div className="animate-pulse" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
          <div
            className="animate-pulse" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(139,92,246,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
          />
          <div className="animate-pulse" style={{position:'absolute', right:'25%', top:'50%', height:'20rem', width:'20rem', borderRadius:'9999px', background:'rgba(20,184,166,0.1)', filter:'blur(48px)', animationDelay: "2s"}}
          />
        </div>

        <div className="container" style={{position:'relative'}}>
          {/* Badge */}
          <div style={{display:'inline-flex', alignItems:'center', gap:'0.5rem', borderRadius:'9999px', padding:'0.625rem 1.5rem', marginBottom:'1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(6, 182, 212, 0.2)'}}>
            <span className="animate-pulse" style={{height:'0.5rem', width:'0.5rem', borderRadius:'9999px', background:'#22d3ee'}} />
            <span style={{fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', color:'#cffafe'}}>
              LaCDIA Tech
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{fontSize:'clamp(2.25rem,5vw,3.75rem)', fontWeight:700, letterSpacing:'-0.01em', color:'#fff', marginBottom:'1.5rem'}}>
            {techDepartmentInfo.mission.split(' ')[0]}
          </h1>
          <p style={{marginTop:'1rem', fontSize:'clamp(1.875rem,4vw,2.25rem)', fontWeight:700, color:'#fff', marginBottom:'1.5rem', lineHeight:1.2}}>
            Département Technologique et Innovation
          </p>
          <p style={{marginTop:'1rem', maxWidth:'48rem', fontSize:'clamp(1.125rem,2vw,1.25rem)', color:'#e2e8f0', lineHeight:1.7}}>
            Transformer la recherche en solutions concrètes pour les institutions et les entreprises
          </p>
          <p style={{marginTop:'0.75rem', maxWidth:'42rem', fontSize:'1rem', color:'#cbd5e1'}}>
            LaCDIA Tech opère à l'interface entre la recherche académique de classe mondiale et les besoins réels du marché, convertissant la découverte scientifique en applications à fort impact économique et social.
          </p>

          {/* CTAs */}
          <div style={{marginTop:'2rem', display:'flex', flexWrap:'wrap', gap:'1rem'}}>
            <Link
              href="#services"
              className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem', boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.3)'}}
            >
              Découvrir nos services
              <svg
                style={{height:'1.25rem', width:'1.25rem'}}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a
              href="#contact"
              className="btn btn-secondary"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Demander un devis
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Notre Mission
            </h2>
            <p className="section-subtitle">
              LaCDIA Tech transfère les connaissances scientifiques vers le monde socio-économique tout en générant les revenus qui soutiennent la recherche fondamentale. Nous positionnons l'organisation à l'interface entre la recherche académique et les besoins du marché.
            </p>
          </div>

          <div className="card-grid card-grid-3">
            {[
              {
                title: "Transfert Technologique",
                description:
                  "Conversion systématique de découvertes scientifiques en solutions commercialisables et déployables à grande échelle",
              },
              {
                title: "Création de Valeur Économique",
                description:
                  "Génération de revenus durables qui financent la recherche fondamentale et soutiennent l'écosystème d'innovation",
              },
              {
                title: "Impact Socio-Économique",
                description:
                  "Résolution des défis pressants des institutions et entreprises caribéennes par des solutions technologiques de pointe",
              },
            ].map((prop, idx) => (
              <article
                key={idx}
                className="card card-hover" style={{padding:'2rem', backgroundColor: 'rgba(248, 250, 252, 0.8)', borderColor: 'rgba(226, 232, 240, 1)'}}
              >
                <div className="card-accent-top" />
                <div style={{marginBottom:'1rem', display:'flex', height:'3rem', width:'3rem', alignItems:'center', justifyContent:'center', borderRadius:'0.75rem', background:'#ecfeff', color:'#0891b2'}}>
                  <span style={{fontSize:'1.5rem', fontWeight:700}}>{idx + 1}</span>
                </div>
                <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>{prop.title}</h3>
                <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7}}>{prop.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PIPELINE */}
      <section className="section section-light">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'4rem'}}>
            <h2 className="section-title">
              Pipeline Recherche → Produit
            </h2>
            <p className="section-subtitle">
              Un processus structuré transformant la découverte scientifique en solutions opérationnelles et à fort impact
            </p>
          </div>

          <div className="card-grid card-grid-4">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} style={{position:'relative'}}>
                {/* Card */}
                <div
                  className="card card-hover" style={{padding:'1.5rem', height:'100%', backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'rgba(226, 232, 240, 1)'}}
                >
                  <div className="card-accent-top" />

                  {/* Phase number */}
                  <div style={{marginBottom:'1rem', display:'flex', height:'2.5rem', width:'2.5rem', alignItems:'center', justifyContent:'center', borderRadius:'0.5rem', background:'#ecfeff', color:'#0891b2'}}>
                    <span style={{fontSize:'1.125rem', fontWeight:700}}>{step.phase}</span>
                  </div>

                  <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{step.name}</h3>
                  <p style={{fontSize:'0.875rem', color:'#64748b', marginBottom:'1rem'}}>{step.description}</p>

                  {/* Inputs */}
                  <div style={{marginBottom:'1rem'}}>
                    <p style={{fontSize:'0.75rem', fontWeight:600, color:'#334155', marginBottom:'0.5rem', textTransform:'uppercase', letterSpacing:'0.05em'}}>
                      Entrées
                    </p>
                    <ul style={{display:'flex', flexDirection:'column', gap:'0.25rem'}}>
                      {step.inputs.map((input, i) => (
                        <li key={i} style={{fontSize:'0.875rem', color:'#475569', display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                          <span style={{color:'#06b6d4', fontWeight:700, marginTop:'0.125rem'}}>▸</span>
                          {input}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outputs */}
                  <div>
                    <p style={{fontSize:'0.75rem', fontWeight:600, color:'#334155', marginBottom:'0.5rem', textTransform:'uppercase', letterSpacing:'0.05em'}}>
                      Résultats
                    </p>
                    <ul style={{display:'flex', flexDirection:'column', gap:'0.25rem'}}>
                      {step.outputs.map((output, i) => (
                        <li key={i} style={{fontSize:'0.875rem', color:'#475569', display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                          <span style={{color:'#14b8a6', fontWeight:700, marginTop:'0.125rem'}}>▸</span>
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow connector (not on last) */}
                {idx < pipelineSteps.length - 1 && (
                  <div style={{display:'none', position:'absolute', right:'-1rem', top:'50%', transform:'translateY(-50%)', zIndex:10}} className="hidden-mobile">
                    <svg style={{width:'2rem', height:'2rem', color:'#22d3ee'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: POLES D'EXPERTISE */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Nos Pôles d'Expertise
            </h2>
            <p className="section-subtitle">
              Trois pôles de compétences complémentaires couvrant toute la chaîne de valeur de l'innovation technologique
            </p>
          </div>

          <div className="card-grid card-grid-3">
            {servicePoles.map((pole) => {
              const serviceCount = servicesByPole[pole.id]?.length || 0;
              const iconMap: Record<string, string> = {
                code: "💻",
                briefcase: "💼",
                "graduation-cap": "🎓",
              };
              return (
                <article
                  key={pole.id}
                  className="card card-hover" style={{padding:'2rem', backgroundColor: 'rgba(248, 250, 252, 0.8)', borderColor: 'rgba(226, 232, 240, 1)'}}
                >
                  <div className="card-accent-top" />

                  <div style={{fontSize:'2.25rem', marginBottom:'1rem'}}>{iconMap[pole.icon] || "🔧"}</div>
                  <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>{pole.name}</h3>
                  <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7, marginBottom:'1rem'}}>{pole.description}</p>
                  <div style={{paddingTop:'1rem', borderTop:'1px solid #e2e8f0'}}>
                    <span className="badge badge-cyan">
                      {serviceCount} service{serviceCount > 1 ? "s" : ""}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: CATALOGUE DE SERVICES */}
      <section id="services" className="section section-light">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Catalogue de Services
            </h2>
            <p className="section-subtitle">
              Une gamme complète de services regroupés par pôle d'expertise pour couvrir tous les besoins de transformation numérique et technologique
            </p>
          </div>

          {/* Services grouped by pole */}
          {servicePoles.map((pole) => (
            <div key={pole.id} style={{marginBottom:'4rem'}}>
              <h3 style={{fontSize:'1.5rem', fontWeight:700, color:'#0f172a', marginBottom:'2rem', paddingBottom:'1rem', borderBottom:'2px solid', borderBottomColor: 'rgba(6, 182, 212, 0.2)'}}>
                {pole.name}
              </h3>

              <div className="card-grid card-grid-2">
                {(servicesByPole[pole.id] || []).map((service, idx) => (
                  <article
                    key={service.id}
                    className="card card-hover" style={{padding:'2rem', backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'rgba(226, 232, 240, 1)', animationDelay: `${idx * 100}ms`}}
                  >
                    <div className="card-accent-top" />

                    {/* Pole badge */}
                    <span className="badge badge-cyan" style={{marginBottom:'1rem', textTransform:'uppercase', letterSpacing:'0.05em', borderColor: 'rgba(6, 182, 212, 0.3)', backgroundColor: 'rgba(6, 182, 212, 0.05)', color: 'rgb(6, 100, 150)'}}>
                      {pole.name}
                    </span>

                    {/* Title */}
                    <h4 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>
                      {service.title}
                    </h4>

                    {/* Summary */}
                    <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7, marginBottom:'1rem'}}>
                      {service.summary}
                    </p>

                    {/* Deliverables */}
                    <div style={{marginBottom:'1rem', paddingBottom:'1rem', borderBottom:'1px solid #e2e8f0'}}>
                      <p style={{fontSize:'0.75rem', fontWeight:600, color:'#334155', marginBottom:'0.5rem', textTransform:'uppercase', letterSpacing:'0.05em'}}>
                        Livrables clés
                      </p>
                      <ul style={{display:'flex', flexDirection:'column', gap:'0.25rem'}}>
                        {service.deliverables.slice(0, 3).map((deliverable, i) => (
                          <li key={i} style={{fontSize:'0.75rem', color:'#475569', display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                            <span style={{color:'#14b8a6', fontWeight:700, marginTop:'0.125rem'}}>▪</span>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target audience tags */}
                    <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem'}}>
                      {service.targetAudience.slice(0, 2).map((audience, i) => (
                        <span
                          key={i}
                          className="tag"
                          style={{
                            backgroundColor: 'rgba(206, 250, 254, 0.4)',
                            color: 'rgb(6, 100, 150)',
                          }}
                        >
                          {audience}
                        </span>
                      ))}
                    </div>

                    {/* Learn more link */}
                    <button className="btn-link" style={{marginTop:'1rem', color:'#0891b2'}}>
                      En savoir plus →
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CAS D'USAGE CONCRETS */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Cas d'Usage Concrets
            </h2>
            <p className="section-subtitle">
              Découvrez comment nos solutions créent un impact tangible dans divers secteurs d'activité
            </p>
          </div>

          <div className="card-grid">
            {useCases.map((useCase, idx) => (
              <article
                key={idx}
                className="card card-hover" style={{padding:'2rem', backgroundColor: 'rgba(248, 250, 252, 0.8)', borderColor: 'rgba(226, 232, 240, 1)'}}
              >
                <div className="card-accent-top" />

                <div style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
                  <div style={{flex:1}}>
                    <span className="badge badge-teal" style={{marginBottom:'1rem', textTransform:'uppercase', letterSpacing:'0.05em', borderColor: 'rgba(13, 148, 136, 0.3)', backgroundColor: 'rgba(13, 148, 136, 0.05)'}}>
                      {useCase.sector}
                    </span>

                    <h3 style={{fontSize:'1.25rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>
                      {useCase.title}
                    </h3>

                    <p style={{fontSize:'1rem', color:'#475569', lineHeight:1.7, marginBottom:'1.5rem'}}>
                      {useCase.description}
                    </p>

                    <div>
                      <p style={{fontSize:'0.875rem', fontWeight:600, color:'#334155', marginBottom:'0.75rem', textTransform:'uppercase', letterSpacing:'0.05em'}}>
                        Impacts clés
                      </p>
                      <ul style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                        {useCase.impacts.map((impact, i) => (
                          <li key={i} style={{fontSize:'0.875rem', color:'#475569', display:'flex', alignItems:'flex-start', gap:'0.5rem'}}>
                            <span style={{color:'#06b6d4', fontWeight:700, marginTop:'0.125rem'}}>✓</span>
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CLIENTS ET PARTENAIRES */}
      <section className="section section-light">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Clients et Partenaires Cibles
            </h2>
            <p className="section-subtitle">
              Nous servons les acteurs majeurs des transformations numériques caribéennes et régionales
            </p>
          </div>

          <div className="card-grid card-grid-2 card-grid-4">
            {clientCategories.map((category, idx) => (
              <article
                key={idx}
                className="card card-hover" style={{padding:'2rem', textAlign:'center', backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'rgba(226, 232, 240, 1)'}}
              >
                <div className="card-accent-top" style={{height:'2px', background:'linear-gradient(to right, #14b8a6, #06b6d4)', opacity:0, transition:'opacity 0.3s'}} />

                <div style={{fontSize:'1.875rem', marginBottom:'1rem'}}>
                  {category.icon === "landmark" && "🏛️"}
                  {category.icon === "briefcase" && "💼"}
                  {category.icon === "globe" && "🌍"}
                  {category.icon === "book" && "📚"}
                </div>

                <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.5rem'}}>{category.title}</h3>
                <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7}}>{category.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: MODELES DE COLLABORATION */}
      <section className="section section-white">
        <div className="container">
          <div style={{maxWidth:'48rem', marginBottom:'3rem'}}>
            <h2 className="section-title">
              Modèles de Collaboration
            </h2>
            <p className="section-subtitle">
              Nous nous adaptons à votre contexte avec des formats d'engagement flexibles et adaptés à vos besoins
            </p>
          </div>

          <div className="card-grid card-grid-2 card-grid-4">
            {engagementModels.map((model, idx) => (
              <article
                key={idx}
                className="card card-hover" style={{padding:'2rem', backgroundColor: 'rgba(248, 250, 252, 0.8)', borderColor: 'rgba(226, 232, 240, 1)'}}
              >
                <div className="card-accent-top" />

                <div style={{fontSize:'1.875rem', marginBottom:'1rem'}}>
                  {model.icon === "package" && "📦"}
                  {model.icon === "calendar" && "📅"}
                  {model.icon === "repeat" && "🔄"}
                  {model.icon === "key" && "🔑"}
                </div>

                <h3 style={{fontSize:'1.125rem', fontWeight:700, color:'#0f172a', marginBottom:'0.75rem'}}>{model.model}</h3>
                <p style={{fontSize:'0.875rem', color:'#475569', lineHeight:1.7, marginBottom:'1rem'}}>
                  {model.description}
                </p>
                <p style={{fontSize:'0.75rem', fontWeight:600, color:'#0f766e', textTransform:'uppercase', letterSpacing:'0.05em'}}>
                  Idéal pour: {model.ideal}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section id="contact" className="page-hero" style={{
        background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(15, 23, 42) 100%)',
      }}>
        {/* Gradient mesh */}
        <div style={{position:'absolute', inset:0, overflow:'hidden'}}>
          <div className="animate-pulse" style={{position:'absolute', right:0, top:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(6,182,212,0.1)', filter:'blur(48px)'}} />
          <div
            className="animate-pulse" style={{position:'absolute', left:0, bottom:0, height:'24rem', width:'24rem', borderRadius:'9999px', background:'rgba(20,184,166,0.1)', filter:'blur(48px)', animationDelay: "1s"}}
          />
        </div>

        <div className="container" style={{position:'relative', maxWidth:'56rem', textAlign:'center'}}>
          <h2 className="section-title section-title-white" style={{marginBottom:'1.5rem'}}>
            Prêt à transformer vos données en solutions ?
          </h2>
          <p style={{fontSize:'1.125rem', color:'#e2e8f0', marginBottom:'2rem', lineHeight:1.7, maxWidth:'42rem', margin:'0 auto 2rem'}}>
            Contactez-nous pour discuter comment LaCDIA Tech peut transformer votre organisation à travers l'innovation technologique et la science des données.
          </p>

          <div style={{display:'flex', flexWrap:'wrap', gap:'1rem', justifyContent:'center'}}>
            <a
              href="#services"
              className="btn btn-cta-primary" style={{padding:'0.875rem 2rem', fontSize:'1rem', boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.3)'}}
            >
              Voir nos solutions
              <svg
                style={{height:'1.25rem', width:'1.25rem'}}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="mailto:tech@lacdia.com"
              className="btn btn-secondary"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
