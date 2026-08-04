/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { portableTextComponents } from '@/components/content/portable-text';

// Simple helper pour extraire le texte depuis l'objet {fr, en} de Sanity
function getLocalValue(field: any, locale: string) {
  if (!field) return null;
  if (typeof field === 'string') return field;
  return field[locale] || field.fr || field.en || null;
}

export function PageBuilder({ blocks, locale }: { blocks: any[]; locale: string }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24 w-full">
      {blocks.map((block, index) => {
        const key = block._key || `block-${index}`;

        switch (block._type) {
          case 'heroBlock': {
            const badge = getLocalValue(block.badge, locale);
            const title = getLocalValue(block.title, locale);
            const description = getLocalValue(block.description, locale);
            const actions = block.actions || [];

            return (
              <section key={key} className="text-center max-w-4xl mx-auto pt-16 pb-8 px-4">
                {badge && (
                  <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-800 text-sm font-bold mb-6 tracking-wide uppercase">
                    {badge}
                  </span>
                )}
                {title && <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">{title}</h1>}
                {description && <p className="text-lg md:text-xl text-muted-foreground mb-8">{description}</p>}
                
                {actions.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {actions.map((act: any, i: number) => {
                      const label = getLocalValue(act.labelIntl, locale) || act.label;
                      const variantClass =
                        act.variant === 'primary'
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : act.variant === 'secondary'
                            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            : 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground';
                      return (
                        <Link
                          key={i}
                          href={act.href || '#'}
                          className={`px-6 py-3 rounded-lg font-medium transition-colors ${variantClass}`}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          }

          case 'textImageBlock': {
            const title = getLocalValue(block.title, locale);
            const content = getLocalValue(block.content, locale);
            const isImageLeft = block.imagePosition === 'left';
            
            return (
              <section key={key} className="container mx-auto px-4">
                <div className={`flex flex-col gap-12 items-center md:items-start ${isImageLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  <div className="flex-1 max-w-2xl">
                    {title && <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>}
                    {content && (
                      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                        <PortableText value={content} components={portableTextComponents} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full relative">
                    {block.imageUrl ? (
                      <div className="relative rounded-2xl shadow-xl w-full aspect-video bg-muted overflow-hidden">
                        <Image
                          src={block.imageUrl}
                          alt={block.imageAlt || ""}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-muted aspect-video w-full" />
                    )}
                  </div>
                </div>
              </section>
            );
          }

          case 'featuresBlock': {
            const title = getLocalValue(block.title, locale);
            const intro = getLocalValue(block.intro, locale);
            const features = block.features || [];

            return (
              <section key={key} className="container mx-auto px-4 py-8 bg-muted/30 rounded-3xl">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
                  {intro && <p className="text-lg text-muted-foreground">{intro}</p>}
                </div>
                
                {features.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feat: any, i: number) => {
                      const fTitle = getLocalValue(feat.titleIntl, locale) || feat.title;
                      const fDesc = getLocalValue(feat.descriptionIntl, locale) || feat.description;
                      return (
                        <div key={i} className="bg-background rounded-2xl p-8 shadow-sm border border-border/50">
                          <h3 className="text-xl font-bold mb-3">{fTitle}</h3>
                          <p className="text-muted-foreground">{fDesc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          }

          case 'kpisBlock': {
            const title = getLocalValue(block.title, locale);
            const intro = getLocalValue(block.intro, locale);
            const kpis = block.kpisList || [];

            return (
              <section key={key} className="container mx-auto px-4">
                <div className="mb-10 text-center">
                  {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
                  {intro && <p className="text-lg text-muted-foreground">{intro}</p>}
                </div>
                
                {kpis.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {kpis.map((kpi: any, i: number) => {
                      const kLabel = getLocalValue(kpi.labelIntl, locale) || kpi.label;
                      const kNote = getLocalValue(kpi.noteIntl, locale) || kpi.note;
                      return (
                        <div key={i} className="text-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
                          <div className="text-4xl md:text-5xl font-black text-primary mb-2">{kpi.value}</div>
                          <div className="font-semibold text-lg mb-1">{kLabel}</div>
                          {kNote && <div className="text-sm text-muted-foreground">{kNote}</div>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          }

          case 'ctaBlock': {
            const title = getLocalValue(block.title, locale);
            const body = getLocalValue(block.body, locale);
            const actions = block.actions || [];

            return (
              <section key={key} className="container mx-auto px-4 my-8">
                <div className="bg-primary text-primary-foreground rounded-3xl p-12 text-center shadow-xl">
                  {title && <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>}
                  {body && <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">{body}</p>}
                  
                  {actions.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {actions.map((act: any, i: number) => {
                        const label = getLocalValue(act.labelIntl, locale) || act.label;
                        return (
                          <Link 
                            key={i} 
                            href={act.href || '#'}
                            className="px-8 py-4 rounded-xl font-bold transition-all bg-background text-foreground hover:scale-105 shadow-md"
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            );
          }

          case 'latestNewsBlock': {
            const title = getLocalValue(block.title, locale);
            return (
              <section key={key} className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-border pb-4">
                  {title ? <h2 className="text-3xl font-bold">{title}</h2> : <div />}
                </div>
              </section>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
