#!/usr/bin/env node
// Lint UI theo Rules/UI stack.md: spellcheck, alert(), icon mạng xã hội từ lucide, reduced-motion, donate/social theo loại app.
// Dùng: node check-ui.mjs [đường-dẫn-repo]      (đọc kind/free từ .ai42e.json của repo)
// Hoặc được check-repo-standard.mjs gọi. Thoát mã 1 nếu có FAIL. Chỉ đọc file, không sửa gì.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EXT = /\.(tsx|jsx|html|vue|js|css)$/i;
const SKIP_DIR = new Set(['node_modules', 'dist', 'build', '.next', 'coverage', 'vendor']);
const MAX_BYTES = 1024 * 1024;
const NO_SPELL_TYPES = /^(hidden|checkbox|radio|file|range|color|button|submit|reset|image)$/i;
const SOCIAL_ICONS = new Set(['Youtube', 'Facebook', 'Github', 'Instagram', 'Twitter', 'Linkedin']);

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isSymbolicLink() || SKIP_DIR.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (EXT.test(e.name) && !/\.min\./.test(e.name) && fs.statSync(full).size <= MAX_BYTES) yield full;
  }
}

// Thay comment bằng khoảng trắng, giữ nguyên số dòng và vị trí ký tự.
const blank = (s) => s.replace(/[^\n]/g, ' ');
function stripComments(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/(^|[^:\\'"`])(\/\/[^\n]*)/g, (_, a, b) => a + blank(b));
}

// Tìm điểm kết thúc thẻ mở bắt đầu ở `start`: bỏ qua `>` trong {...} và chuỗi.
function tagEnd(text, start) {
  let depth = 0;
  let quote = '';
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (quote) { if (c === quote) quote = ''; continue; }
    if (c === '"' || c === "'" || (c === '`' && depth > 0)) quote = c;
    else if (c === '{') depth++;
    else if (c === '}') depth = Math.max(0, depth - 1);
    else if (c === '>' && depth === 0) return i;
  }
  return Math.min(text.length, start + 2000);
}

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;
const SPELL_OFF = /spellcheck\s*=\s*(\{\s*false\s*\}|["']false["'])/i;

export function checkUi(repo, { kind = '', free = false } = {}) {
  const res = [];
  const push = (level, msg) => res.push({ level, msg });
  const roots = fs.readdirSync(repo, { withFileTypes: true })
    .filter((e) => e.isDirectory() && (['src', 'web', 'static'].includes(e.name) || /^frontend/.test(e.name)))
    .map((e) => path.join(repo, e.name));
  const files = roots.flatMap((r) => [...walk(r)]).map((f) => {
    const raw = fs.readFileSync(f, 'utf8');
    return { rel: path.relative(repo, f).split(path.sep).join('/'), raw, text: stripComments(raw) };
  });
  if (!files.length) { push('warn', 'UI: không thấy thư mục src/ web/ static/ frontend*/ để quét'); return res; }

  const report = (level, okMsg, failMsg, hits) => {
    if (!hits.length) return push('pass', okMsg);
    const shown = hits.slice(0, 8).join(', ') + (hits.length > 8 ? `, ... (+${hits.length - 8})` : '');
    push(level, `${failMsg} (${hits.length} chỗ: ${shown})`);
  };

  const spell = [];
  const spellSpread = [];
  const alerts = [];
  const lucide = [];
  const social = [];
  const socialWeak = [];
  let keyframes = null;
  let reduced = false;
  let socialSeen = false;
  let donateInHeader = false;
  let donateElsewhere = '';

  for (const { rel, text } of files) {
    const isCss = /\.css$/i.test(rel);
    if (!isCss) {
      const seen = new Set();
      for (const m of text.matchAll(/<(input|textarea)\b/gi)) {
        const tag = text.slice(m.index, tagEnd(text, m.index) + 1);
        const type = tag.match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1];
        if (m[1].toLowerCase() === 'input' && type && NO_SPELL_TYPES.test(type)) continue;
        if (!SPELL_OFF.test(tag)) { (/\{\s*\.\.\./.test(tag) ? spellSpread : spell).push(`${rel}:${lineOf(text, m.index)}`); seen.add(m.index); }
      }
      for (const m of text.matchAll(/contenteditable(?!\s*=\s*(\{\s*false\s*\}|["']false["']))/gi)) {
        const open = text.lastIndexOf('<', m.index);
        if (open < 0 || !/^<[A-Za-z]/.test(text.slice(open, open + 2)) || seen.has(open)) continue;
        const tag = text.slice(open, tagEnd(text, open) + 1);
        if (!SPELL_OFF.test(tag)) { (/\{\s*\.\.\./.test(tag) ? spellSpread : spell).push(`${rel}:${lineOf(text, m.index)}`); seen.add(open); }
      }
      for (const m of text.matchAll(/(?<![\w$.])alert\s*\(|\bwindow\.alert\s*\(/g)) alerts.push(`${rel}:${lineOf(text, m.index)}`);
      for (const m of text.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g)) {
        const bad = m[1].split(',').map((s) => s.trim().split(/\s+as\s+/)[0]).filter((n) => SOCIAL_ICONS.has(n));
        if (bad.length) lucide.push(`${rel}:${lineOf(text, m.index)}`);
      }
    }
    if (!keyframes) {
      const m = text.match(/@keyframes|\banimation\s*:/);
      if (m) keyframes = `${rel}:${lineOf(text, m.index)}`;
    }
    if (/prefers-reduced-motion|motion-reduce|motion-safe/.test(text)) reduced = true;
    if (/social[-_]?card|footer[-_]?social/i.test(text)) socialSeen = true;
    if (kind === 'web-internal') {
      // Chắc chắn khi là thẻ <Donate/<SocialCard hoặc id/class trong markup; còn lại (css, chữ thường) chỉ WARN.
      const strong = /<(Donate|SocialCard)\b|\b(?:id|class|className)\s*=\s*\{?\s*["'`][^"'`]*(?:donate|social[-_]?card)/gi;
      const strongLines = new Set();
      if (!isCss) for (const m of text.matchAll(strong)) { strongLines.add(lineOf(text, m.index)); social.push(`${rel}:${lineOf(text, m.index)}`); }
      for (const m of text.matchAll(/\bDonate|social[-_]?card/g)) if (!strongLines.has(lineOf(text, m.index))) socialWeak.push(`${rel}:${lineOf(text, m.index)}`);
    }
    if (!isCss && /donate/i.test(text)) { if (/header/i.test(rel)) donateInHeader = true; else donateElsewhere ||= rel; }
  }

  report('fail', 'UI: mọi input/textarea/contenteditable tắt spellcheck', 'UI: thiếu spellCheck={false}', spell);
  if (spellSpread.length) report('warn', '', 'UI: thẻ input/textarea có spread {...props}, không chắc đã tắt spellcheck', spellSpread);
  report('fail', 'UI: không dùng alert()', 'UI: dùng alert() trần (cần error-card)', alerts);
  report('fail', 'UI: icon mạng xã hội không lấy từ lucide-react', 'UI: import icon mạng xã hội từ lucide-react (dùng _Assets/icons)', lucide);
  if (keyframes) {
    if (reduced) push('pass', 'UI: có prefers-reduced-motion cho animation');
    else push('fail', `UI: có animation (${keyframes}) mà không có prefers-reduced-motion`);
  } else push('pass', 'UI: không có animation CSS cần reduced-motion');
  if (kind === 'web-internal') {
    report('fail', 'UI: tool nội bộ không có Donate/social-card trong markup', 'UI: tool nội bộ có Donate/social-card', social);
    if (socialWeak.length) report('warn', '', 'UI: tool nội bộ nhắc tới Donate/social-card ngoài markup (css, chữ), kiểm lại', socialWeak);
  }
  if (kind === 'web-public') {
    if (socialSeen) push('pass', 'UI: web công khai có social-card/footer-social');
    else push('fail', 'UI: web công khai thiếu social-card/footer-social');
  }
  if (free && kind.startsWith('web-') && kind !== 'web-internal') {
    if (donateInHeader) push('pass', 'UI: app free có Donate ở header');
    else if (donateElsewhere) push('warn', `UI: app free: header không có Donate, nhưng thấy ở ${donateElsewhere} (kiểm header có dùng không)`);
    else push('fail', 'UI: app free (free=true) nhưng không thấy Donate trong header');
  }
  return res;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const repo = path.resolve(process.argv[2] || '.');
  let m = {};
  try { m = JSON.parse(fs.readFileSync(path.join(repo, '.ai42e.json'), 'utf8')); } catch { /* không có manifest: chỉ chạy luật chung */ }
  const res = checkUi(repo, { kind: m.kind, free: m.free === true });
  let fail = 0;
  console.log(`Repo: ${path.basename(repo)}`);
  for (const r of res) {
    if (r.level === 'fail') fail++;
    console.log(`${r.level.toUpperCase().padEnd(4)}  ${r.msg}`);
  }
  console.log(`${fail} lỗi.`);
  process.exit(fail ? 1 : 0);
}
