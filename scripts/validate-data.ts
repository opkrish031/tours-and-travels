// Build-time data validation (TRD 4.5).
// Passes with warnings in dev; any error (incl. DUMMY markers) fails in
// production mode (NODE_ENV=production) or with --strict.

import { attractions } from "../data/attractions";
import { homeFaqs } from "../data/faqs";
import { policies } from "../data/policies";
import { routes } from "../data/routes";
import { services } from "../data/services";
import { site } from "../data/site";
import { testimonials } from "../data/testimonials";
import { vehicles } from "../data/vehicles";
import { validateData, type Issue } from "../lib/validate";

const strict = process.argv.includes("--strict") || process.env.NODE_ENV === "production";

console.log(`validate-data: running (${strict ? "strict" : "dev"} mode)`);

const issues: Issue[] = validateData(
  { site, vehicles, routes, services, homeFaqs, attractions, testimonials, policies },
  { strict },
);

const errors = issues.filter((issue) => issue.level === "error");
const warnings = issues.filter((issue) => issue.level === "warning");

for (const issue of issues) {
  const label = issue.level === "error" ? "ERROR  " : "warning";
  console.log(`  ${label} ${issue.message}`);
}

if (errors.length > 0) {
  console.error(`validate-data: FAILED — ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}

console.log(`validate-data: OK — 0 errors, ${warnings.length} warning(s)`);
