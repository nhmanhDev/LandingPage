import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

/**
 * UI smoke + accessibility suite for the AI42E brand landing ("/").
 * Run: npm i --no-save playwright-core axe-core && npm run build && npx next start -p 3100
 *      node scripts/ui-test/ui.mjs
 * ai42e.com is mapped to 127.0.0.1:PORT inside Chrome so the host-based middleware treats it as the master domain.
 * Screenshots go to the OS temp folder (SHOTS_DIR to override).
 */
const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const PORT = process.env.PORT || "3100";
const BASE = "http://ai42e.com/";
const shots = process.env.SHOTS_DIR || path.join(os.tmpdir(), "ai42e-ui-shots");
fs.mkdirSync(shots, { recursive: true });

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  —  " + detail : ""}`);
};

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: [`--host-resolver-rules=MAP ai42e.com 127.0.0.1:${PORT}`],
});

async function open(viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: "vi-VN", ...opts });
  const page = await ctx.newPage();
  const errors = [];
  const failed = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("requestfailed", (r) => failed.push(r.url() + " " + (r.failure()?.errorText || "")));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  return { ctx, page, errors, failed };
}

const canvasInk = (page) =>
  page.evaluate(() => {
    const c = document.querySelector("canvas");
    if (!c) return -1;
    const g = c.getContext("2d");
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let n = 0;
    for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++;
    return n;
  });
const canvasHash = (page) =>
  page.evaluate(() => {
    const c = document.querySelector("canvas");
    const g = c.getContext("2d");
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let h = 0;
    for (let i = 0; i < d.length; i += 97) h = (h * 31 + d[i + 3] + d[i]) | 0;
    return h;
  });

// ---------- Desktop, light ----------
{
  const { ctx, page, errors, failed } = await open({ width: 1440, height: 900 }, { colorScheme: "light" });
  check("desktop: no console or page errors", errors.length === 0, errors.join(" | ").slice(0, 200));
  check("desktop: no failed requests", failed.length === 0, failed.join(" | ").slice(0, 200));
  check("desktop: title is brand title", (await page.title()).includes("AI42E"), await page.title());
  check("desktop: html lang vi", (await page.getAttribute("html", "lang")) === "vi");
  check("desktop: single h1", (await page.locator("h1").count()) === 1);
  check("desktop: h1 contains 'AI cho mọi người'", (await page.locator("h1").innerText()).includes("AI cho mọi người"));
  check("desktop: 6 product cards", (await page.locator("#products > div > ul > li").count()) === 6);
  check("desktop: ribbon canvas has pixels", (await canvasInk(page)) > 1000, String(await canvasInk(page)));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check("desktop: no horizontal overflow", overflow <= 0, `overflow ${overflow}px`);
  await page.screenshot({ path: path.join(shots, "desktop-light-top.png") });

  // motion: ribbon animates
  const h1 = await canvasHash(page);
  await page.waitForTimeout(700);
  const h2 = await canvasHash(page);
  check("desktop: ribbon animates", h1 !== h2);

  // anchors
  const anchors = await page.$$eval('a[href^="#"]', (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  const missing = [];
  for (const a of anchors) if (a !== "#top" && !(await page.$(a))) missing.push(a);
  check("desktop: every anchor target exists", missing.length === 0, missing.join(","));
  await page.click('nav a[href="#pricing"]');
  await page.waitForTimeout(900);
  const pricingTop = await page.$eval("#pricing", (e) => Math.round(e.getBoundingClientRect().top));
  check("desktop: nav anchor lands below sticky header", pricingTop >= 0 && pricingTop <= 120, `top=${pricingTop}`);

  // external links hygiene
  const bad = await page.$$eval('a[target="_blank"]', (as) => as.filter((a) => !/noopener/.test(a.rel)).map((a) => a.href));
  check("desktop: target=_blank links have rel=noopener", bad.length === 0, bad.join(","));

  // FAQ
  await page.click("#faq button >> nth=1");
  await page.waitForTimeout(400);
  const open1 = await page.$$eval('#faq [data-state="open"]', (e) => e.length);
  check("desktop: FAQ item opens", open1 >= 1);

  // theme toggle
  await page.evaluate(() => window.scrollTo(0, 0));
  const before = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  await page.click('button[aria-label^="Đổi giao diện"]');
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  check("desktop: theme toggle flips class", before !== after, `${before} -> ${after}`);
  await page.waitForTimeout(500);
  check("desktop: ribbon redraws in dark", (await canvasInk(page)) > 1000);
  await page.screenshot({ path: path.join(shots, "desktop-dark-top.png") });

  // language toggle + persistence
  await page.click('button[aria-label="Đổi ngôn ngữ"]');
  await page.waitForTimeout(300);
  check("desktop: language toggle to EN", (await page.locator("h1").innerText()).includes("AI for everyone"));
  check("desktop: html lang en", (await page.getAttribute("html", "lang")) === "en");
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  check("desktop: language persists after reload", (await page.locator("h1").innerText()).includes("AI for everyone"));
  await ctx.close();
}

// ---------- Full page screenshots + a11y (light and dark) ----------
for (const scheme of ["light", "dark"]) {
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: scheme });
  // scroll through so reveal animations run
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 350));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(shots, `desktop-${scheme}-full.png`), fullPage: true });
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa"] });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes[0]?.html.slice(0, 120) }));
  });
  check(`a11y (${scheme}): no axe violations`, axe.length === 0, JSON.stringify(axe).slice(0, 600));
  await ctx.close();
}

// ---------- Mobile ----------
for (const [label, vp] of [
  ["mobile-390", { width: 390, height: 844 }],
  ["mobile-360", { width: 360, height: 740 }],
  ["tablet-768", { width: 768, height: 1024 }],
]) {
  const { ctx, page, errors } = await open(vp, { colorScheme: "light", hasTouch: vp.width < 700, isMobile: vp.width < 700 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(`${label}: no horizontal overflow`, overflow <= 0, `overflow ${overflow}px`);
  check(`${label}: no console errors`, errors.length === 0, errors.join("|").slice(0, 160));
  const small = await page.$$eval("header button, header a, main a.inline-flex", (els) =>
    els
      .map((e) => ({ t: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 24), r: e.getBoundingClientRect() }))
      .filter((x) => x.r.width > 0 && (x.r.height < 40 || x.r.width < 40))
      .map((x) => `${x.t}:${Math.round(x.r.width)}x${Math.round(x.r.height)}`),
  );
  check(`${label}: tap targets >= 40px`, small.length === 0, small.join(", "));
  await page.screenshot({ path: path.join(shots, `${label}-top.png`) });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(shots, `${label}-full.png`), fullPage: true });
  await ctx.close();
}

// ---------- Reduced motion ----------
{
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: "light", reducedMotion: "reduce" });
  check("reduced-motion: ribbon still drawn", (await canvasInk(page)) > 1000);
  const a = await canvasHash(page);
  await page.waitForTimeout(800);
  const b = await canvasHash(page);
  check("reduced-motion: ribbon is static", a === b);
  const opacity = await page.$eval("h1", (e) => getComputedStyle(e).opacity);
  check("reduced-motion: content visible", opacity === "1", `h1 opacity ${opacity}`);
  await ctx.close();
}

// ---------- Keyboard ----------
{
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: "light" });
  await page.keyboard.press("Tab");
  const skipVisible = await page.evaluate(() => {
    const a = document.activeElement;
    const r = a.getBoundingClientRect();
    return a.tagName === "A" && r.width > 1 && r.height > 1;
  });
  check("keyboard: first Tab reveals skip link", skipVisible);
  const outlines = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const a = document.activeElement;
      const cs = getComputedStyle(a);
      return { tag: a.tagName, outline: cs.outlineStyle + " " + cs.outlineWidth };
    });
    if (info.outline.startsWith("none") || info.outline.endsWith(" 0px")) outlines.push(info.tag);
  }
  check("keyboard: focus ring on first 14 stops", outlines.length === 0, outlines.join(","));
  await ctx.close();
}

// ---------- Performance (cold, throttled-less) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await ctx.newPage();
  let bytes = 0;
  page.on("response", async (r) => {
    try {
      const len = Number(r.headers()["content-length"] || 0);
      bytes += len || (await r.body()).length;
    } catch {}
  });
  await page.addInitScript(() => {
    window.__lcp = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const lcp = await page.evaluate(() => Math.round(window.__lcp));
  check("perf: LCP under 2500ms (local server)", lcp > 0 && lcp < 2500, `LCP ${lcp}ms, transferred ${(bytes / 1024).toFixed(0)}KB`);
  await ctx.close();
}


// ---------- Reveal + no-JS fallback ----------
{
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: "light" });
  await page.evaluate(() => document.querySelector("#contact").scrollIntoView());
  await page.waitForTimeout(1200);
  const op = await page.$$eval("#contact ul > li a", (as) => as.map((a) => { let n = a, o = 1; while (n && n !== document.body) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o; }));
  check("reveal: 5 contact cards visible after scrolling to them", op.length === 5 && op.every((o) => o > 0.99), JSON.stringify(op));
  await ctx.close();
  const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, locale: "vi-VN" });
  const p2 = await ctx2.newPage();
  await p2.goto(BASE, { waitUntil: "load" });
  const vis = await p2.$$eval("h1, #products > div > ul > li, #contact > div > ul > li", (els) => els.map((e) => { let n = e, o = 1; while (n && n !== document.body) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o; }));
  check("no-JS: hero, product cards and contact are visible", vis.length === 12 && vis.every((o) => o > 0.99), `${vis.length} nodes, min opacity ${Math.min(...vis)}`);
  await ctx2.close();
}

await browser.close();
const failedCount = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failedCount}/${results.length} passed`);
process.exit(failedCount ? 1 : 0);
