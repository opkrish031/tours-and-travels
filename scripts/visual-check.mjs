import { chromium } from "playwright-core";
import fs from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const OUT = ".next-dev/screens";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE });

const viewports = [
  { name: "home-375", width: 375, height: 812 },
  { name: "home-768", width: 768, height: 1024 },
  { name: "home-1280", width: 1280, height: 900 },
  { name: "home-1536", width: 1536, height: 960 },
];

const consoleErrors = [];

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`[${vp.name}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`[${vp.name}] ${String(err)}`));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${vp.name}.png` });
  if (vp.width >= 1280) {
    await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });
  }
  await page.close();
}

// Desktop dropdown open
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on("pageerror", (err) => consoleErrors.push(`[dropdown] ${String(err)}`));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Services" }).click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}/dropdown-open.png` });
  await page.close();
}

// Mobile menu open + group expanded
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  page.on("pageerror", (err) => consoleErrors.push(`[mobile-menu] ${String(err)}`));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}/mobile-menu.png` });
  await page.locator("summary", { hasText: "Routes" }).click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: `${OUT}/mobile-menu-routes.png` });
  await page.close();
}

await browser.close();

if (consoleErrors.length) {
  console.log("CONSOLE ERRORS:");
  for (const e of consoleErrors) console.log(" -", e);
  process.exitCode = 1;
} else {
  console.log("no console errors");
}
console.log(`screenshots → ${OUT}`);
