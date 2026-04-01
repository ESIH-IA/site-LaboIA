import { defineField, defineType } from "sanity";

const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({ name: "href", type: "url", title: "URL" }),
              defineField({ name: "blank", type: "boolean", title: "Open in new tab" }),
            ],
          },
        ],
      },
    },
    { type: "image", options: { hotspot: true } },
  ],
});

const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "fr", type: "string", title: "FR" }),
    defineField({ name: "en", type: "string", title: "EN" }),
  ],
});

const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "fr", type: "text", rows: 4, title: "FR" }),
    defineField({ name: "en", type: "text", rows: 4, title: "EN" }),
  ],
});

const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Localized Block Content",
  type: "object",
  fields: [
    defineField({ name: "fr", type: "blockContent", title: "FR" }),
    defineField({ name: "en", type: "blockContent", title: "EN" }),
  ],
});

const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "labelIntl", type: "localeString", title: "Label (i18n)" }),
    defineField({ name: "href", type: "string", title: "Href" }),
  ],
});

const linkAction = defineType({
  name: "linkAction",
  title: "Link Action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "labelIntl", type: "localeString", title: "Label (i18n)" }),
    defineField({ name: "href", type: "string", title: "Href" }),
    defineField({
      name: "variant",
      type: "string",
      title: "Variant",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Tertiary", value: "tertiary" },
        ],
      },
    }),
  ],
});

const highlightItem = defineType({
  name: "highlightItem",
  title: "Highlight Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "titleIntl", type: "localeString", title: "Title (i18n)" }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({ name: "descriptionIntl", type: "localeText", title: "Description (i18n)" }),
  ],
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Site name" }),
    defineField({ name: "shortName", type: "string", title: "Short name" }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({ name: "tagline", type: "string", title: "Tagline" }),
    defineField({ name: "taglineIntl", type: "localeString", title: "Tagline (i18n)" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "object",
      fields: [
        defineField({ name: "image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "banner",
      title: "Banner",
      type: "object",
      fields: [
        defineField({ name: "image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({ name: "footerContactTitle", type: "string", title: "Footer contact title" }),
    defineField({ name: "footerContactTitleIntl", type: "localeString", title: "Footer contact title (i18n)" }),
    defineField({ name: "footerContactText", type: "text", title: "Footer contact text" }),
    defineField({ name: "footerContactTextIntl", type: "localeText", title: "Footer contact text (i18n)" }),
    defineField({ name: "footerContactCtaLabel", type: "string", title: "Footer contact CTA label" }),
    defineField({ name: "footerContactCtaLabelIntl", type: "localeString", title: "Footer contact CTA label (i18n)" }),
    defineField({ name: "footerContactCtaHref", type: "string", title: "Footer contact CTA href" }),
    defineField({ name: "footerLanguageNote", type: "string", title: "Footer language note" }),
    defineField({ name: "footerLanguageNoteIntl", type: "localeString", title: "Footer language note (i18n)" }),
  ],
});

const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "mainNav", type: "array", of: [{ type: "navItem" }] }),
    defineField({ name: "footerNav", type: "array", of: [{ type: "navItem" }] }),
  ],
});

const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroBadge", type: "localeString", title: "Hero badge" }),
    defineField({ name: "heroTitle", type: "localeString", title: "Hero title" }),
    defineField({ name: "heroSubtitle", type: "localeText", title: "Hero subtitle" }),
    defineField({ name: "heroDescription", type: "localeText", title: "Hero description" }),
    defineField({ name: "heroActions", type: "array", of: [{ type: "linkAction" }] }),
    defineField({ name: "introEyebrow", type: "localeString", title: "Intro eyebrow" }),
    defineField({ name: "introTitle", type: "localeString", title: "Intro title" }),
    defineField({ name: "introBody", type: "localeText", title: "Intro body" }),
    defineField({ name: "introActions", type: "array", of: [{ type: "linkAction" }] }),
    defineField({ name: "highlightsTitle", type: "localeString", title: "Highlights title" }),
    defineField({ name: "highlightsIntro", type: "localeText", title: "Highlights intro" }),
    defineField({ name: "highlights", type: "array", of: [{ type: "highlightItem" }] }),
    defineField({ name: "kpisTitle", type: "localeString", title: "KPIs title" }),
    defineField({ name: "kpisIntro", type: "localeText", title: "KPIs intro" }),
    defineField({ name: "featuredProjectsTitle", type: "localeString", title: "Featured projects title" }),
    defineField({ name: "featuredProjectsIntro", type: "localeText", title: "Featured projects intro" }),
    defineField({ name: "featuredProjectsCtaLabel", type: "localeString", title: "Featured projects CTA label" }),
    defineField({ name: "featuredProjectsCtaHref", type: "string", title: "Featured projects CTA href" }),
    defineField({ name: "publicationsTitle", type: "localeString", title: "Publications title" }),
    defineField({ name: "publicationsIntro", type: "localeText", title: "Publications intro" }),
    defineField({ name: "partnersTitle", type: "localeString", title: "Partners title" }),
    defineField({ name: "partnersIntro", type: "localeText", title: "Partners intro" }),
    defineField({ name: "partnersBadge", type: "localeString", title: "Partners badge" }),
    defineField({ name: "collaborateTitle", type: "localeString", title: "Collaborate title" }),
    defineField({ name: "collaborateBody", type: "localeText", title: "Collaborate body" }),
    defineField({ name: "collaborateActions", type: "array", of: [{ type: "linkAction" }] }),
    defineField({
      name: "eventBanner",
      title: "Event banner",
      type: "object",
      fields: [
        defineField({ name: "enabled", type: "boolean", title: "Enabled" }),
        defineField({ name: "label", type: "localeString", title: "Label" }),
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "date", type: "localeString", title: "Date" }),
        defineField({ name: "location", type: "localeString", title: "Location" }),
        defineField({ name: "ctaLabel", type: "localeString", title: "CTA label" }),
        defineField({ name: "ctaHref", type: "string", title: "CTA href" }),
      ],
    }),
  ],
});

const kpi = defineType({
  name: "kpi",
  title: "KPI",
  type: "document",
  fields: [
    defineField({ name: "key", type: "string", title: "Key" }),
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "labelIntl", type: "localeString", title: "Label (i18n)" }),
    defineField({ name: "value", type: "string", title: "Value" }),
    defineField({ name: "note", type: "text", title: "Note" }),
    defineField({ name: "noteIntl", type: "localeText", title: "Note (i18n)" }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Confirmed", value: "confirmed" },
        ],
      },
    }),
  ],
});

const kpiSettings = defineType({
  name: "kpiSettings",
  title: "KPI Settings",
  type: "document",
  fields: [
    defineField({ name: "lastUpdated", type: "string", title: "Last updated" }),
    defineField({ name: "lastUpdatedIntl", type: "localeString", title: "Last updated (i18n)" }),
    defineField({ name: "disclaimer", type: "string", title: "Disclaimer" }),
    defineField({ name: "disclaimerIntl", type: "localeString", title: "Disclaimer (i18n)" }),
  ],
});

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "projectType", type: "string" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "shortDescription", type: "text" }),
    defineField({ name: "shortDescriptionIntl", type: "localeText" }),
    defineField({ name: "statusLabel", type: "string", title: "Project status label" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "objectives", type: "blockContent" }),
    defineField({ name: "objectivesIntl", type: "localeBlockContent" }),
    defineField({ name: "methods", type: "blockContent" }),
    defineField({ name: "methodsIntl", type: "localeBlockContent" }),
    defineField({ name: "results", type: "blockContent" }),
    defineField({ name: "resultsIntl", type: "localeBlockContent" }),
    defineField({ name: "members", type: "array", of: [{ type: "reference", to: [{ type: "member" }] }] }),
    defineField({ name: "partners", type: "array", of: [{ type: "reference", to: [{ type: "partner" }] }] }),
    defineField({ name: "publications", type: "array", of: [{ type: "reference", to: [{ type: "publication" }] }] }),
  ],
});

const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "publicationType", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "doi", type: "string" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "pdf", type: "file" }),
    defineField({ name: "bibtex", type: "text" }),
    defineField({ name: "authors", type: "array", of: [{ type: "reference", to: [{ type: "member" }] }] }),
    defineField({ name: "externalAuthors", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "projects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] }),
    defineField({ name: "axes", type: "array", of: [{ type: "reference", to: [{ type: "researchAxis" }] }] }),
    defineField({ name: "resources", type: "array", of: [{ type: "reference", to: [{ type: "resource" }] }] }),
  ],
});

const news = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "blockContent" }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "sourceUrl", type: "url" }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({ name: "relatedProjects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] }),
    defineField({ name: "relatedMembers", type: "array", of: [{ type: "reference", to: [{ type: "member" }] }] }),
  ],
});

const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "visibility", type: "string", options: { list: ["public", "internal"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "eventType", type: "string" }),
    defineField({ name: "startDate", type: "datetime" }),
    defineField({ name: "endDate", type: "datetime" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "blockContent" }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({ name: "registrationUrl", type: "url" }),
    defineField({ name: "speakers", type: "array", of: [{ type: "reference", to: [{ type: "member" }] }] }),
  ],
});

const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "nameIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "name" } }),
        defineField({ name: "en", type: "slug", options: { source: "name" } }),
      ],
    }),
    defineField({ name: "partnerType", type: "string" }),
    defineField({ name: "shortDescription", type: "text" }),
    defineField({ name: "shortDescriptionIntl", type: "localeText" }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean" }),
  ],
});

const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "offerType", type: "string" }),
    defineField({ name: "openDate", type: "date" }),
    defineField({ name: "closeDate", type: "date" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
  ],
});

const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "programType", type: "string" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "blockContent" }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({ name: "members", type: "array", of: [{ type: "reference", to: [{ type: "member" }] }] }),
  ],
});

const researchAxis = defineType({
  name: "researchAxis",
  title: "Research Axis",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "blockContent" }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
    defineField({ name: "projects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] }),
    defineField({ name: "publications", type: "array", of: [{ type: "reference", to: [{ type: "publication" }] }] }),
  ],
});

const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "resourceType", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "publications", type: "array", of: [{ type: "reference", to: [{ type: "publication" }] }] }),
    defineField({ name: "projects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] }),
  ],
});

const institutionalPage = defineType({
  name: "institutionalPage",
  title: "Institutional Page",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "content", type: "blockContent" }),
    defineField({ name: "contentIntl", type: "localeBlockContent" }),
  ],
});

const member = defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "fullName", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "fullName" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "fullName" } }),
        defineField({ name: "en", type: "slug", options: { source: "fullName" } }),
      ],
    }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "affiliation", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "bioIntl", type: "localeText" }),
    defineField({ name: "expertise", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "links",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "scholar", type: "url" }),
        defineField({ name: "orcid", type: "url" }),
        defineField({ name: "website", type: "url" }),
      ],
    }),
    defineField({ name: "projects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }] }),
    defineField({ name: "publications", type: "array", of: [{ type: "reference", to: [{ type: "publication" }] }] }),
  ],
});

const person = defineType({
  name: "person",
  title: "Person (Governance)",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "roleTitle", type: "string" }),
    defineField({ name: "roleCategory", type: "string" }),
    defineField({ name: "shortBio", type: "text" }),
    defineField({ name: "longBio", type: "text" }),
    defineField({ name: "affiliation", type: "string" }),
    defineField({
      name: "governanceGroup",
      type: "string",
      options: { list: ["direction", "gouvernance", "comite_scientifique"] },
    }),
    defineField({
      name: "teamGroup",
      type: "string",
      options: { list: ["research", "associate"] },
    }),
    defineField({ name: "expertise", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "links",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "scholar", type: "url" }),
        defineField({ name: "orcid", type: "url" }),
        defineField({ name: "website", type: "url" }),
      ],
    }),
    defineField({ name: "contribution", type: "text" }),
    defineField({ name: "order", type: "number" }),
  ],
});

const governanceChartStrict = defineType({
  name: "governanceChartStrict",
  title: "Governance Chart (Strict)",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "orgSectionTitle", type: "string" }),
    defineField({ name: "orgSectionTitleIntl", type: "localeString" }),
    defineField({ name: "orgSectionIntro", type: "blockContent" }),
    defineField({ name: "orgSectionIntroIntl", type: "localeBlockContent" }),
    defineField({ name: "topPerson", type: "reference", to: [{ type: "person" }] }),
    defineField({ name: "coFounders", type: "array", of: [{ type: "reference", to: [{ type: "person" }] }] }),
    defineField({ name: "associateResearchers", type: "array", of: [{ type: "reference", to: [{ type: "person" }] }] }),
    defineField({ name: "membersSectionTitle", type: "string" }),
    defineField({ name: "membersSectionTitleIntl", type: "localeString" }),
    defineField({ name: "membersSectionIntro", type: "blockContent" }),
    defineField({ name: "membersSectionIntroIntl", type: "localeBlockContent" }),
    defineField({ name: "membersToShow", type: "array", of: [{ type: "reference", to: [{ type: "person" }] }] }),
  ],
});

const governancePage = defineType({
  name: "governancePage",
  title: "Governance Page",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "intro", type: "blockContent" }),
    defineField({ name: "introIntl", type: "localeBlockContent" }),
    defineField({ name: "showOrgChart", type: "boolean" }),
    defineField({ name: "orgChartSectionTitle", type: "string" }),
    defineField({ name: "orgChartSectionTitleIntl", type: "localeString" }),
    defineField({ name: "orgChartSectionIntro", type: "blockContent" }),
    defineField({ name: "orgChartSectionIntroIntl", type: "localeBlockContent" }),
    defineField({ name: "showMembers", type: "boolean" }),
    defineField({ name: "membersSectionTitle", type: "string" }),
    defineField({ name: "membersSectionTitleIntl", type: "localeString" }),
    defineField({ name: "membersSectionIntro", type: "blockContent" }),
    defineField({ name: "membersSectionIntroIntl", type: "localeBlockContent" }),
    defineField({
      name: "membersGroupsToShow",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["direction", "gouvernance", "comite_scientifique"] },
    }),
    defineField({
      name: "membersOrder",
      type: "string",
      options: { list: ["nameAsc", "orderAsc"] },
    }),
    defineField({ name: "governanceChartStrict", type: "reference", to: [{ type: "governanceChartStrict" }] }),
  ],
});

const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "intro", type: "blockContent" }),
    defineField({ name: "introIntl", type: "localeBlockContent" }),
    defineField({ name: "researchSectionTitle", type: "string" }),
    defineField({ name: "researchSectionTitleIntl", type: "localeString" }),
    defineField({ name: "associatesSectionTitle", type: "string" }),
    defineField({ name: "associatesSectionTitleIntl", type: "localeString" }),
    defineField({ name: "readMoreLabel", type: "string" }),
    defineField({ name: "readMoreLabelIntl", type: "localeString" }),
    defineField({ name: "associateBadgeLabel", type: "string" }),
    defineField({ name: "associateBadgeLabelIntl", type: "localeString" }),
    defineField({ name: "emptyResearchText", type: "string" }),
    defineField({ name: "emptyResearchTextIntl", type: "localeString" }),
    defineField({ name: "emptyAssociatesText", type: "string" }),
    defineField({ name: "emptyAssociatesTextIntl", type: "localeString" }),
  ],
});

const resourcePage = defineType({
  name: "resourcePage",
  title: "Resource Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
  ],
});

const labReport = defineType({
  name: "labReport",
  title: "Lab Report",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["draft", "published"] } }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "slugIntl",
      type: "object",
      fields: [
        defineField({ name: "fr", type: "slug", options: { source: "title" } }),
        defineField({ name: "en", type: "slug", options: { source: "title" } }),
      ],
    }),
    defineField({ name: "year", type: "number" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "summaryIntl", type: "localeText" }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "url", type: "url" }),
  ],
});

const formSubmission = defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string" }),
    defineField({
      name: "statusHistory",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "status", type: "string" }),
            defineField({ name: "note", type: "string" }),
            defineField({ name: "changedAt", type: "datetime" }),
          ],
        },
      ],
    }),
    defineField({ name: "formType", type: "string" }),
    defineField({ name: "fullName", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "organization", type: "string" }),
    defineField({ name: "subject", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "consent", type: "boolean" }),
    defineField({ name: "createdAt", type: "datetime" }),
    defineField({ name: "updatedAt", type: "datetime" }),
  ],
});

const aiSolution = defineType({
  name: "aiSolution",
  title: "AI Solution",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "shortDescription", type: "text" }),
    defineField({ name: "shortDescriptionIntl", type: "localeText" }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "examples", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "order", type: "number" }),
  ],
});

const useCase = defineType({
  name: "useCase",
  title: "Use Case",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleIntl", type: "localeString" }),
    defineField({ name: "context", type: "text" }),
    defineField({ name: "contextIntl", type: "localeText" }),
    defineField({ name: "solution", type: "text" }),
    defineField({ name: "solutionIntl", type: "localeText" }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", type: "number" }),
  ],
});

const sector = defineType({
  name: "sector",
  title: "Sector",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "nameIntl", type: "localeString" }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "order", type: "number" }),
  ],
});

const solutionsPage = defineType({
  name: "solutionsPage",
  title: "Solutions Page",
  type: "document",
  fields: [
    defineField({ name: "heroBadge", type: "localeString" }),
    defineField({ name: "heroTitle", type: "localeString" }),
    defineField({ name: "heroSubtitle", type: "localeText" }),
    defineField({ name: "heroDescription", type: "localeText" }),
    defineField({ name: "heroPrimaryCta", type: "linkAction" }),
    defineField({ name: "heroSecondaryCta", type: "linkAction" }),
    defineField({ name: "approachTitle", type: "localeString" }),
    defineField({ name: "approachIntro", type: "localeText" }),
    defineField({
      name: "approachSteps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "titleIntl", type: "localeString" }),
            defineField({ name: "description", type: "text" }),
            defineField({ name: "descriptionIntl", type: "localeText" }),
          ],
        },
      ],
    }),
    defineField({ name: "solutionsTitle", type: "localeString" }),
    defineField({ name: "solutionsIntro", type: "localeText" }),
    defineField({ name: "solutions", type: "array", of: [{ type: "reference", to: [{ type: "aiSolution" }] }] }),
    defineField({ name: "useCasesTitle", type: "localeString" }),
    defineField({ name: "useCasesIntro", type: "localeText" }),
    defineField({ name: "featuredUseCase", type: "reference", to: [{ type: "useCase" }] }),
    defineField({ name: "flowTitle", type: "localeString" }),
    defineField({ name: "flowDescription", type: "localeText" }),
    defineField({ name: "flowSteps", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "servicesTitle", type: "localeString" }),
    defineField({ name: "servicesIntro", type: "localeText" }),
    defineField({ name: "services", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "sectorsTitle", type: "localeString" }),
    defineField({ name: "sectorsIntro", type: "localeText" }),
    defineField({ name: "sectors", type: "array", of: [{ type: "reference", to: [{ type: "sector" }] }] }),
    defineField({ name: "projectsTitle", type: "localeString" }),
    defineField({ name: "projectsIntro", type: "localeText" }),
  ],
});

export const schemaTypes = [
  blockContent,
  localeString,
  localeText,
  localeBlockContent,
  navItem,
  linkAction,
  highlightItem,
  siteSettings,
  navigation,
  homePage,
  kpi,
  kpiSettings,
  project,
  publication,
  news,
  event,
  partner,
  offer,
  program,
  researchAxis,
  resource,
  institutionalPage,
  member,
  person,
  governanceChartStrict,
  governancePage,
  teamPage,
  resourcePage,
  labReport,
  formSubmission,
  aiSolution,
  useCase,
  sector,
  solutionsPage,
];
