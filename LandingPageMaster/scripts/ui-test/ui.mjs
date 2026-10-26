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
  check("desktop: wall renders tiles", (await page.locator(".wall-tile").count()) >= 20, String(await page.locator(".wall-tile").count()));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check("desktop: no horizontal overflow", overflow <= 0, `overflow ${overflow}px`);
  await page.screenshot({ path: path.join(shots, "desktop-light-top.png") });

  // motion: pointer eases the wall, pause stops it
  const wallTransform = () => page.$eval(".wall", (e) => getComputedStyle(e).transform);
  await page.mouse.move(200, 200);
  await page.waitForTimeout(700);
  const t1 = await wallTransform();
  await page.mouse.move(1200, 700, { steps: 8 });
  await page.waitForTimeout(900);
  const t2 = await wallTransform();
  check("desktop: pointer moves the wall", t1 !== t2);
  await page.click('main button[aria-pressed]');
  await page.waitForTimeout(300);
  const pausedAttr = await page.$eval("[data-wall-paused]", (e) => e.getAttribute("data-wall-paused"));
  const playState = await page.$eval(".wall-col", (e) => getComputedStyle(e).animationPlayState);
  check("desktop: pause button stops the drift", pausedAttr === "true" && playState === "paused", `${pausedAttr}/${playState}`);
  await page.mouse.move(300, 300, { steps: 4 });
  await page.waitForTimeout(500);
  const t3 = await wallTransform();
  await page.mouse.move(1300, 800, { steps: 4 });
  await page.waitForTimeout(500);
  check("desktop: paused wall ignores the pointer", t3 === (await wallTransform()));
  await page.click('main button[aria-pressed]');

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
  check("desktop: wall still rendered in dark", (await page.locator(".wall-tile").count()) >= 20);
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

// ---------- Header: products drop-down, product strip, mobile menu ----------
{
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: "light" });
  const strip = await page.$$eval("header a[href*='ai42e.com']", (as) => as.filter((a) => a.getBoundingClientRect().width > 0).map((a) => a.href));
  check("header: product strip links Studio and Game", strip.some((h) => h.includes("studio.ai42e.com")) && strip.some((h) => h.includes("play.ai42e.com")), strip.join(","));
  await page.click('header nav button[aria-haspopup]');
  await page.waitForTimeout(250);
  const items = await page.locator('[role="menuitem"]').count();
  check("header: products drop-down lists all 6 products", items === 6, String(items));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  check("header: Escape closes the drop-down", (await page.locator('[role="menuitem"]').count()) === 0);
  const burger = await page.$eval('button[aria-label="Mở menu"]', (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
  check("header: the phone menu button is hidden on desktop", burger === false);
  const sticky = await page.$eval("header", (e) => getComputedStyle(e).position);
  check("header: stays on screen while scrolling", sticky === "sticky");
  await ctx.close();
  const m = await open({ width: 390, height: 844 }, { colorScheme: "light", hasTouch: true, isMobile: true });
  await m.page.click('button[aria-label="Mở menu"]');
  await m.page.waitForTimeout(250);
  const links = await m.page.locator("#mobile-menu a").count();
  check("header (mobile): menu opens with the section links and the CTA", links >= 5, String(links));
  await m.page.click('#mobile-menu a[href="#faq"]');
  await m.page.waitForTimeout(300);
  check("header (mobile): choosing a link closes the menu", (await m.page.locator("#mobile-menu").count()) === 0);
  await m.ctx.close();
}

// ---------- Design system (the "why does this look random" guard) ----------
for (const scheme of ["light", "dark"]) {
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: scheme });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 250)); }
    window.scrollTo(0, 0);
  });
  const ds = await page.evaluate(() => {
    const fam = new Set(), size = new Set(), color = new Set(), weight = new Set();
    const root = document.querySelector(".brand-landing");
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const el = node.parentElement;
      if (!el || el.closest(".wall, [data-decor]")) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      fam.add(cs.fontFamily.split(",")[0].replace(/["']/g, "").trim());
      size.add(cs.fontSize);
      weight.add(cs.fontWeight);
      color.add(cs.color.replace(/, 0\.\d+\)/, ")").replace(/rgba?\(([^)]*)\)/, "$1"));
    }
    return { fam: [...fam], size: [...size].sort((a, b) => parseFloat(a) - parseFloat(b)), weight: [...weight], color: [...color] };
  });
  check(`design (${scheme}): exactly one typeface`, ds.fam.length === 1, ds.fam.join(" | "));
  const SCALE = ["13px", "15px", "18px", "36px", "56px"];
  const strays = ds.size.filter((size) => !SCALE.includes(size));
  check(`design (${scheme}): font sizes stay on the 5-step scale`, strays.length === 0, `used ${ds.size.join(" ")}; stray ${strays.join(" ")}`);
  check(`design (${scheme}): at most 2 font weights`, ds.weight.length <= 2, ds.weight.join(" "));
  check(`design (${scheme}): at most 5 text colours`, ds.color.length <= 5, ds.color.join(" | "));
  await ctx.close();
}
{
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: "light" });
  const cards = await page.$$eval("#products > div > ul > li", (lis) => lis.map((li) => ({ name: li.querySelector("h3")?.textContent, link: Boolean(li.querySelector("a[href]")) })));
  const dl = cards.find((c) => c.name === "DownloadAnything");
  check("links: DownloadAnything has no link while its domain is down", dl && dl.link === false);
  const live = cards.filter((c) => c.link).map((c) => c.name).sort().join(",");
  check("links: only AI42E Studio and AI42E Game are linked", live === "AI42E Game,AI42E Studio", live);
  await ctx.close();
}

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
  check("reduced-motion: wall still rendered", (await page.locator(".wall-tile").count()) >= 20);
  const anim = await page.$eval(".wall-col", (e) => getComputedStyle(e).animationName);
  check("reduced-motion: no drift animation", anim === "none", anim);
  check("reduced-motion: pause control is disabled and pressed", (await page.$eval("main button[aria-pressed]", (e) => e.disabled && e.getAttribute("aria-pressed") === "true")));
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


// ---------- Footer channels, copy sanity, no-JS fallback ----------
const CHANNELS = '#contact a[href*="youtube.com"], #contact a[href*="facebook.com"], #contact a[href*="t.me/"], #contact a[href*="github.com/nhmanhDev"], #contact a[href^="mailto:"]';
{
  const { ctx, page } = await open({ width: 1440, height: 900 }, { colorScheme: "light" });
  await page.evaluate(() => document.querySelector("#contact").scrollIntoView());
  await page.waitForTimeout(800);
  const visible = await page.$$eval(CHANNELS, (as) => as.map((a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0; }));
  check("footer: 5 official channels are visible", visible.length === 5 && visible.every(Boolean), String(visible.length));
  const text = await page.evaluate(() => document.querySelector(".brand-landing").innerText);
  check("copy: no placeholder leaks", !/undefined|\[object|NaN|TODO|lorem/i.test(text));
  const headings = await page.$$eval("h1, h2", (hs) => hs.map((h) => h.innerText));
  const broken = headings.filter((t) => /\n/.test(t.trim()) && !t.includes("người,"));
  check("copy: section headings copy as one line (no word-per-line)", broken.length === 0, JSON.stringify(broken).slice(0, 200));
  await ctx.close();
  const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, locale: "vi-VN" });
  const p2 = await ctx2.newPage();
  await p2.goto(BASE, { waitUntil: "load" });
  const vis = await p2.$$eval("h1, #products > div > ul > li", (els) => els.map((e) => { let n = e, o = 1; while (n && n !== document.body) { o *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return o; }));
  check("no-JS: hero and product cards are visible", vis.length === 7 && vis.every((o) => o > 0.99), `${vis.length} nodes, min opacity ${Math.min(...vis)}`);
  const channels = await p2.$$(CHANNELS);
  check("no-JS: footer channels are present", channels.length === 5, String(channels.length));
  await ctx2.close();
}

await browser.close();
const failedCount = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failedCount}/${results.length} passed`);
process.exit(failedCount ? 1 : 0);
