import type { SchemaTypeDefinition } from "sanity";

import { localeBlockContent, localeString, localeText } from "./locale";
import { localeSlug } from "./localeSlug";

import { eventType } from "./event";
import { formSubmissionType } from "./formSubmission";
import { governancePageType } from "./governancePage";
import { institutionalPageType } from "./institutionalPage";
import { kpiType } from "./kpi";
import { labReportType } from "./labReport";
import { memberType } from "./member";
import { newsType } from "./news";
import { offerType } from "./offer";
import { orgChartType } from "./orgChart";
import { orgNodeType } from "./orgNode";
import { orgUnitType } from "./orgUnit";
import { partnerType } from "./partner";
import { personType } from "./person";
import { teamPageType } from "./teamPage";
import { programType } from "./program";
import { projectType } from "./project";
import { publicationType } from "./publication";
import { researchAxisType } from "./researchAxis";
import { resourceType } from "./resource";

const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localeBlockContent,
  localeSlug,

  projectType,
  publicationType,
  memberType,
  partnerType,
  newsType,
  eventType,
  offerType,
  programType,
  researchAxisType,
  resourceType,
  institutionalPageType,
  labReportType,
  kpiType,
  formSubmissionType,

  personType,
  orgUnitType,
  orgNodeType,
  orgChartType,
  governancePageType,
  teamPageType,
];

export default schemaTypes;
