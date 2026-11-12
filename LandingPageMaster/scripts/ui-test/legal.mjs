// UI check for the legal pages (/privacy, /terms), run with a real Chrome through Playwright.
// Run: npm i --no-save playwright-core axe-core && npm run build && npx next start -p 3102 && node scripts/ui-test/legal.mjs
// Env: BASE (default http://localhost:3102), SHOTS (folder for screenshots, optional).
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const BASE = (process.env.BASE || "http://localhost:3102").replace(/\/$/, "");
const SHOTS = process.env.SHOTS || "";
const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
};

const browser = await chromium.launch({ channel: "chrome" });

// The home footer must lead to both pages.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "vi-VN" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const links = await page.$$eval('footer a[href="/privacy"], footer a[href="/terms"]', (as) => as.map((a) => a.getAttribute("href")));
  check("home footer links to /privacy and /terms", links.length === 2, links.join(","));
  await ctx.close();
}

for (const doc of ["privacy", "terms"]) {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "vi-VN", colorScheme: scheme });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    const res = await page.goto(`${BASE}/${doc}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const tag = `/${doc} (${scheme})`;
    check(`${tag}: 200 and no console errors`, res?.status() === 200 && errors.length === 0, `${res?.status()} ${errors.join(" | ").slice(0, 160)}`);
    const h1 = await page.$$eval("h1", (hs) => hs.map((h) => h.innerText));
    const h2 = await page.$$eval("h2", (hs) => hs.length);
    check(`${tag}: one title and 10 numbered sections`, h1.length === 1 && h2 === 10, `${h1.join("|")} h2=${h2}`);
    check(`${tag}: no horizontal overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/legal-${doc}-${scheme}.png`, fullPage: true });
    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa"] });
      return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes[0]?.html.slice(0, 120) }));
    });
    check(`${tag}: no axe violations`, axe.length === 0, JSON.stringify(axe).slice(0, 400));
    if (scheme === "light") {
      const title = await page.title();
      check(`/${doc}: tab title is this page's title, not the home title`, /AI42E/.test(title) && !/Công cụ AI dễ dùng/.test(title), title);
      await page.click('button[aria-label^="Chuyển ngôn ngữ"]');
      await page.waitForTimeout(400);
      const enH1 = await page.$eval("h1", (h) => h.innerText);
      const enTitle = await page.title();
      check(`/${doc}: language toggle switches to English`, /Privacy Policy|Terms of Use/.test(enH1) && /Privacy Policy|Terms of Use/.test(enTitle), `${enH1} / ${enTitle}`);
    }
    await ctx.close();
  }
}

{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "vi-VN", hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/privacy`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  check("/privacy (mobile 390): no horizontal overflow", await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/legal-privacy-mobile.png`, fullPage: true });
  await ctx.close();
}

await browser.close();
const failedCount = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failedCount}/${results.length} passed`);
process.exit(failedCount ? 1 : 0);
