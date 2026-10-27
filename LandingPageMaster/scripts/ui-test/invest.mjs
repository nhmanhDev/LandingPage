// UI check for the Trading page (/invest), run with a real Chrome through Playwright.
// Run: npm i --no-save playwright-core axe-core && npm run build && npx next start -p 3101 && node scripts/ui-test/invest.mjs
// Env: BASE (default http://localhost:3101), SHOTS (folder for screenshots, optional).
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const BASE = process.env.BASE || "http://localhost:3101";
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

for (const width of [360, 390, 768, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, locale: "vi-VN" });
  const page = await context.newPage();
  const problems = [];
  page.on("console", (m) => { if (m.type() === "error") problems.push("console: " + m.text()); });
  page.on("pageerror", (e) => problems.push("pageerror: " + e.message));
  await page.goto(`${BASE}/invest`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  check(`${width}px: no console or page errors`, problems.length === 0, problems.join(" | "));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`${width}px: no horizontal overflow`, overflow <= 1, `extra ${overflow}px`);

  if (width === 390 || width === 1440) {
    const h1 = await page.locator("h1").count();
    check(`${width}px: exactly one h1`, h1 === 1, `found ${h1}`);
    const body = (await page.locator("body").innerText()).toLowerCase();
    check(`${width}px: risk disclaimer is on the page`, body.includes("không phải lời khuyên đầu tư") && body.includes("rủi ro"));
    check(`${width}px: no performance claims`, !/(lợi nhuận \d|\d+\s?%\s?(lợi|profit)|win ?rate|roi)/i.test(body));
    const links = await page.locator("footer a").evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
    const want = ["youtube.com", "facebook.com", "t.me", "github.com", "mailto:"];
    check(`${width}px: footer has the 5 official channels`, want.every((w) => links.some((l) => l.includes(w))), links.join(" "));
    const small = await page.evaluate(() =>
      [...document.querySelectorAll(".pill, .nav-link")].filter((el) => el.offsetParent !== null && el.getBoundingClientRect().height < 38).length);
    check(`${width}px: buttons are at least 38px tall`, small === 0, `${small} too small`);
  }

  if (width === 390 || width === 1440) {
    // The blocks fade in when scrolled into view, so walk down the page like a visitor before judging what is visible.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("main [style*='opacity']")].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length);
    check(`${width}px: every block is visible after scrolling`, hidden === 0, `${hidden} still transparent`);
    const sectionsShown = await page.evaluate(() => ["work", "risk-title"].map((id) => {
      const el = document.getElementById(id);
      const box = id === "risk-title" ? el?.closest("aside") : el;
      return box ? box.getBoundingClientRect().height : 0;
    }));
    check(`${width}px: work and risk sections take space`, sectionsShown.every((h) => h > 60), sectionsShown.join(","));
    for (const theme of ["light", "dark"]) {
      if (theme === "dark") {
        await page.getByRole("button", { name: /giao diện/i }).click();
        await page.waitForTimeout(500);
      }
      await page.addScriptTag({ content: axeSource });
      const axe = await page.evaluate(async () => {
        const r = await window.axe.run(document, { resultTypes: ["violations"] });
        return r.violations.filter((v) => ["serious", "critical"].includes(v.impact)).map((v) => `${v.id} (${v.nodes.map((n) => n.html.slice(0, 90)).join(" ; ")})`);
      });
      check(`${width}px ${theme}: axe has no serious or critical issue`, axe.length === 0, axe.join(", "));
      if (SHOTS) await page.screenshot({ path: `${SHOTS}/invest-${width}-${theme}.png`, fullPage: true });
    }
  }

  if (width === 1440) {
    await page.getByRole("button", { name: /ngôn ngữ/i }).click();
    await page.waitForTimeout(400);
    const title = await page.locator("h1").innerText();
    check("language switch changes the title to English", /automated trading/i.test(title), title);
  }
  await context.close();
}

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
