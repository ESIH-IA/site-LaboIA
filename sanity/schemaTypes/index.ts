import { projectType } from "./project";
import { publicationType } from "./publication";
import { memberType } from "./member";
import { partnerType } from "./partner";
import { eventType } from "./event";
import { newsType } from "./news";
import { offerType } from "./offer";
import { programType } from "./program";
import { researchAxisType } from "./researchAxis";
import { institutionalPageType } from "./institutionalPage";
import { localeBlockContent, localeString, localeText } from "./locale";
import { localeSlug } from "./localeSlug";
import { resourceType } from "./resource";
import { formSubmissionType } from "./formSubmission";
import { kpiType } from "./kpi";
import { labReportType } from "./labReport";

export const schemaTypes = [
  localeString,
  localeText,
  localeBlockContent,
  localeSlug,
  projectType,
  publicationType,
  memberType,
  partnerType,
  eventType,
  newsType,
  offerType,
  programType,
  researchAxisType,
  resourceType,
  formSubmissionType,
  kpiType,
  labReportType,
  institutionalPageType,
];
