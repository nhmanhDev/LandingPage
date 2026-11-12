#!/usr/bin/env node
// Kiểm một repo theo chuẩn trong Rules/Repo Scaffold.md và Rules/AI Repo Rules.md:
// manifest, Docker, cổng, test, CI, SEO web, đường dẫn tuyệt đối, file chỉ dẫn agent, CHANGELOG/JOURNAL, UI.
// Dùng: node check-repo-standard.mjs [repo] [--diff <base>] [--vault <thư-mục-vault>] [--strict]
//   --diff <base>  chỉ quét dòng thêm mới so với <base> (đường dẫn tuyệt đối) và đòi CHANGELOG khi đổi code
//   --vault <dir>  vault để đối chiếu Reference/Bảng cổng.md (mặc định: tự nhận nếu script nằm trong vault)
//   --strict       (hoặc SB_STRICT=1) biến các WARN chuyển tiếp (manifest, ENV PORT, restart, giới hạn tài nguyên, luật chép) thành FAIL; repo mới dùng cờ này
// Mỗi kết quả in PASS/FAIL/WARN. Thoát mã 1 nếu có FAIL; WARN không đổi mã thoát. Chỉ đọc file, không sửa gì.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args.splice(i, 2)[1] : undefined; };
let diffBase = opt('--diff');
const STRICT = args.includes('--strict') || process.env.SB_STRICT === '1';
if (args.includes('--strict')) args.splice(args.indexOf('--strict'), 1);
const vaultArg = opt('--vault');
const repo = path.resolve(args[0] || '.');
if (diffBase !== undefined && (!/^[\w./-]+$/.test(diffBase) || diffBase.startsWith('-'))) {
  console.log(`FAIL  --diff: base "${diffBase}" không hợp lệ (chỉ nhận chữ, số, . _ / -, không bắt đầu bằng -)`);
  process.exit(1);
}

const self = fileURLToPath(import.meta.url);
const selfDir = path.dirname(self);
const inVault = fs.existsSync(path.join(selfDir, '..', 'SecondBrain.md')) && path.basename(selfDir) === '_Setup';
const vault = vaultArg ? path.resolve(vaultArg) : inVault ? path.resolve(selfDir, '..') : '';

const out = [];
const add = (ok, msg) => out.push({ level: ok ? 'pass' : 'fail', msg });
const warn = (ok, msg) => out.push({ level: ok ? 'pass' : 'warn', msg });
const p = (...s) => path.join(repo, ...s);
const has = (...s) => fs.existsSync(p(...s));
const read = (...s) => (has(...s) && fs.statSync(p(...s)).isFile() ? fs.readFileSync(p(...s), 'utf8') : '');
const git = (...a) => execFileSync('git', ['-C', repo, '-c', 'core.quotepath=off', ...a], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;
const shortList = (a, n = 6) => a.slice(0, n).join(', ') + (a.length > n ? `, ... (+${a.length - n})` : '');

// Cổng mặc định của framework hay nền tảng: không được dùng (xem Reference/Bảng cổng.md).
const DEFAULT_PORTS = new Set([3000, 3001, 4000, 4200, 5000, 5173, 7860, 8000, 8080, 8501, 8888, 9000]);
const isDefault = (n) => DEFAULT_PORTS.has(Number(n));

// ---- Manifest .ai42e.json ----
const KINDS = ['web-public', 'web-internal', 'desktop', 'backend', 'static', 'lib'];
let manifest = null;
if (!has('.ai42e.json')) {
  (STRICT ? add : warn)(false, '.ai42e.json: thiếu manifest repo. Tạo từ _Skills/sb-new-repo/assets/ai42e.json (khai kind, free, port, integrationBranch, designSystem) rồi đặt ở gốc repo');
} else {
  try {
    manifest = JSON.parse(read('.ai42e.json'));
    const errs = [];
    if (!KINDS.includes(manifest.kind)) errs.push(`kind phải thuộc ${KINDS.join('|')}`);
    if (typeof manifest.free !== 'boolean') errs.push('free phải là true/false');
    if (!(manifest.port === null || Number.isInteger(manifest.port))) errs.push('port phải là số hoặc null');
    if (typeof manifest.integrationBranch !== 'string' || !manifest.integrationBranch) errs.push('integrationBranch phải là chuỗi');
    add(errs.length === 0, `.ai42e.json: hợp lệ${errs.length ? ` (lỗi: ${errs.join('; ')})` : ` (kind=${manifest.kind}, port=${manifest.port}, nhánh=${manifest.integrationBranch})`}`);
    if (errs.length) manifest = { ...manifest, kind: KINDS.includes(manifest.kind) ? manifest.kind : undefined };
  } catch (e) {
    add(false, `.ai42e.json: không đọc được JSON (${e.message})`);
  }
}
const kind = manifest?.kind;
const port = manifest && Number.isInteger(manifest.port) ? manifest.port : null;
const branch = manifest?.integrationBranch || 'dev';
// desktop/static/lib: các mục Docker chỉ cảnh báo.
const dk = ['desktop', 'static', 'lib'].includes(kind) ? warn : add;
// Mục mới thêm: WARN trong giai đoạn chuyển tiếp, FAIL khi --strict (vẫn theo kind).
const tr = STRICT ? dk : warn;

// ---- Dockerfile ----
const dockerfile = read('Dockerfile');
if (!dockerfile) {
  dk(false, 'Dockerfile: thiếu');
} else {
  const lines = dockerfile.split(/\r?\n/);
  const users = lines.map((l) => l.match(/^\s*USER\s+(\S+)/i)?.[1]).filter(Boolean);
  const lastUser = users[users.length - 1];
  dk(!!lastUser && !/^(root|0)(:|$)/.test(lastUser), 'Dockerfile: chạy bằng user thường (có USER không phải root)');
  dk(!/chmod\s+(-R\s+)?777/.test(dockerfile), 'Dockerfile: không chmod 777');
  const copyEnv = lines.findIndex((l) => /^\s*(COPY|ADD)\s+(--\S+\s+)*\.env(\s|$)/i.test(l));
  dk(copyEnv < 0, `Dockerfile: không COPY .env${copyEnv >= 0 ? ` (Dockerfile:${copyEnv + 1})` : ''}`);

  const stages = new Set();
  const badFrom = [];
  for (const l of lines) {
    const m = l.match(/^\s*FROM\s+(\S+)(?:\s+AS\s+(\S+))?/i);
    if (!m) continue;
    const [, image, alias] = m;
    if (alias) stages.add(alias.toLowerCase());
    if (stages.has(image.toLowerCase()) && !alias) continue;
    const pinned = image.includes('@sha256:') || (image.includes(':') && !image.endsWith(':latest'));
    if (!pinned) badFrom.push(image);
  }
  dk(badFrom.length === 0, `Dockerfile: base image có tag cụ thể, không dùng latest${badFrom.length ? ` (lỗi: ${badFrom.join(', ')})` : ''}`);

  const exposed = [...dockerfile.matchAll(/^\s*EXPOSE\s+(.+)$/gim)].flatMap((m) => m[1].split(/\s+/)).map((s) => s.replace(/\/\w+$/, ''));
  const envPort = dockerfile.match(/^\s*ENV\s+PORT[= ]\s*(\d+)/im)?.[1];
  tr(!!envPort, 'Dockerfile: có ENV PORT');
  const portsUsed = [...exposed, ...(envPort ? [envPort] : [])].filter((x) => /^\d+$/.test(x));
  const defaults = portsUsed.filter(isDefault);
  dk(defaults.length === 0, `Dockerfile: không dùng cổng mặc định${defaults.length ? ` (lỗi: ${[...new Set(defaults)].join(', ')})` : ''}`);
  if (envPort) dk(exposed.length === 0 || exposed.every((e) => e === envPort), `Dockerfile: EXPOSE khớp ENV PORT (${envPort})`);
  if (port) {
    if (envPort) dk(Number(envPort) === port, `Dockerfile: ENV PORT (${envPort}) khớp port trong .ai42e.json (${port})`);
    const wrong = exposed.filter((e) => /^\d+$/.test(e) && Number(e) !== port);
    dk(wrong.length === 0, `Dockerfile: mọi EXPOSE khớp port trong .ai42e.json (${port})${wrong.length ? ` (lỗi: ${wrong.join(', ')})` : ''}`);
  }
}
dk(has('.dockerignore'), '.dockerignore: có');

// ---- Compose ----
const composeFile = ['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'].find((f) => has(f));
if (!composeFile) {
  dk(false, 'docker-compose: thiếu');
} else {
  const compose = read(composeFile);
  dk(/^\s*healthcheck:/m.test(compose), `${composeFile}: có healthcheck`);
  tr(/^\s*restart:\s*["']?unless-stopped["']?\s*(#.*)?$/m.test(compose), `${composeFile}: restart: unless-stopped`);
  tr(/^\s*(mem_limit|cpus|mem_reservation):|^\s*limits:/m.test(compose), `${composeFile}: có giới hạn bộ nhớ/CPU (mem_limit, cpus hoặc deploy.resources.limits)`);
  const hostPorts = [];
  const containerPorts = [];
  const notLocal = [];
  let ctx = '';
  compose.split(/\r?\n/).forEach((l, i) => {
    const key = l.match(/^\s*([A-Za-z_]+):\s*$/)?.[1];
    if (key) ctx = key;
    const entry = ctx === 'ports' && l.match(/^\s*-\s*["']?(.+?)["']?\s*$/)?.[1];
    if (!entry) return;
    if (!/^(127\.0\.0\.1:|\$\{[A-Za-z_]\w*:-127\.0\.0\.1\}:)/.test(entry)) notLocal.push(`${composeFile}:${i + 1}`);
    const m = entry.match(/(\d+):(\d+)(?:\/\w+)?$/);
    if (m) { hostPorts.push(m[1], m[2]); containerPorts.push(Number(m[2])); }
  });
  dk(notLocal.length === 0, `${composeFile}: ports bind 127.0.0.1${notLocal.length ? ` (lỗi: ${shortList(notLocal)})` : ''}`);
  const bad = hostPorts.filter(isDefault);
  dk(bad.length === 0, `${composeFile}: không publish cổng mặc định${bad.length ? ` (lỗi: ${[...new Set(bad)].join(', ')})` : ''}`);
  if (port) dk(containerPorts.includes(port), `${composeFile}: có publish cổng container ${port} (port trong .ai42e.json)`);
}

// ---- Cổng so với Bảng cổng của vault ----
if (port) {
  add(!isDefault(port), `Cổng ${port} (.ai42e.json): không phải cổng mặc định`);
  const tableFile = vault && path.join(vault, 'Reference', 'Bảng cổng.md');
  if (tableFile && fs.existsSync(tableFile)) {
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const me = norm(manifest.name || path.basename(repo));
    const rows = [];
    for (const l of fs.readFileSync(tableFile, 'utf8').split(/\r?\n/)) {
      const c = l.split('|').map((s) => s.trim());
      const name = c[1]?.match(/\[\[([^\]|]+)/)?.[1];
      if (name && c[2] && /^[\d,\s]+$/.test(c[2])) rows.push({ name, ports: c[2].split(',').map(Number) });
    }
    const other = rows.find((r) => norm(r.name) !== me && r.ports.includes(port));
    const mine = rows.filter((r) => norm(r.name) === me);
    if (other) add(false, `Bảng cổng: cổng ${port} đã thuộc ${other.name}`);
    else if (mine.some((r) => r.ports.includes(port))) add(true, `Bảng cổng: cổng ${port} khớp bảng`);
    else if (mine.length) warn(false, `Bảng cổng: ${mine[0].name} ghi cổng ${mine[0].ports.join(', ')}, manifest khai ${port}`);
    else warn(false, `Bảng cổng: cổng ${port} chưa có trong Reference/Bảng cổng.md (thêm một dòng; nếu tên repo khác tên sản phẩm thì khai "name" trong .ai42e.json)`);
  }
}

// ---- Test, CI, .env ----
const hasTests = has('tests') || has('test') || has('__tests__');
add(hasTests, 'tests/: có');
const wfDir = p('.github', 'workflows');
const wf = fs.existsSync(wfDir) ? fs.readdirSync(wfDir).filter((f) => /\.ya?ml$/.test(f)) : [];
add(wf.length > 0, 'CI: có workflow trong .github/workflows');
if (wf.length) {
  const wfText = wf.map((f) => fs.readFileSync(path.join(wfDir, f), 'utf8'));
  const tokenRe = new RegExp(`(^|[\\s\\[,'"-])${branch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[\\s\\],'"])`);
  // Đạt khi có pull_request không giới hạn nhánh (mọi PR) hoặc có branches chứa nhánh tích hợp.
  const onPr = wfText.some((t) => {
    if (/^\s*on\s*:\s*(pull_request|\[[^\]]*\bpull_request\b[^\]]*\])\s*(#.*)?$/m.test(t) || /^\s*-\s*pull_request\s*$/m.test(t)) return true;
    const ls = t.split(/\r?\n/);
    return ls.some((l, i) => {
      if (!/^\s*pull_request\s*:/.test(l)) return false;
      const indent = l.match(/^\s*/)[0].length;
      const block = [l];
      for (const x of ls.slice(i + 1, i + 8)) { if (x.trim() && x.match(/^\s*/)[0].length <= indent) break; block.push(x); }
      if (!block.some((x) => /^\s*branches\s*:/.test(x))) return true;
      return block.some((x) => (/branches/.test(x) || /^\s*-\s/.test(x)) && tokenRe.test(x));
    });
  });
  add(onPr, `CI: có workflow chạy khi mở PR vào ${branch} (pull_request.branches)`);
  add(wfText.some((t) => t.includes('scripts/check-standard.mjs')), 'CI: có bước chạy scripts/check-standard.mjs');
  add(wfText.some((t) => /gitleaks|trufflehog/i.test(t)), 'CI: có quét secret (gitleaks hoặc trufflehog)');
  if (dockerfile) dk(wfText.some((t) => /trivy/i.test(t)), 'CI: có quét image (trivy) vì repo có Dockerfile');
}
if (inVault && vault) {
  for (const f of ['check-standard.mjs', 'check-ui.mjs']) {
    if (f === 'check-ui.mjs' && !(kind?.startsWith('web-') || kind === 'desktop')) continue;
    const mine = path.join(selfDir, f === 'check-standard.mjs' ? 'check-repo-standard.mjs' : f);
    const theirs = p('scripts', f);
    if (!fs.existsSync(theirs)) { if (f === 'check-standard.mjs') add(false, 'scripts/check-standard.mjs: thiếu (chép từ _Setup/check-repo-standard.mjs của vault)'); continue; }
    const h = (file) => crypto.createHash('sha256').update(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).digest('hex');
    warn(h(mine) === h(theirs), `scripts/${f}: giống bản trong vault (lệch thì chép lại từ _Setup)`);
  }
}
add(has('.env.example'), '.env.example: có');

// ---- Web công khai (chỉ khi là dự án Next.js) ----
let pkg = {};
try { pkg = JSON.parse(read('package.json') || '{}'); } catch { /* bỏ qua */ }
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
if (deps.next) {
  const anyOf = (...paths) => paths.some((x) => has(...x.split('/')));
  add(anyOf('public/robots.txt', 'src/app/robots.ts', 'src/app/robots.js', 'app/robots.ts', 'app/robots.js'), 'SEO: có robots (Next.js)');
  add(anyOf('public/sitemap.xml', 'src/app/sitemap.ts', 'src/app/sitemap.js', 'app/sitemap.ts', 'app/sitemap.js'), 'SEO: có sitemap (Next.js)');
}

// ---- Đường dẫn tuyệt đối theo máy: file git theo dõi + file mới chưa ignore (hoặc chỉ dòng thêm mới với --diff) ----
// /Users và /home phân biệt hoa thường (tránh nhầm route /api/admin/users/{id}/); /home/<user mặc định của image>/ bỏ qua.
const DRIVE_RE = /(?:\b[A-Za-z]:[\\/]|file:\/\/\/[A-Za-z]:\/)/;
const ABS_RE = /(?:\b[A-Za-z]:[\\/]|file:\/\/\/[A-Za-z]:\/|\/(?:Users|home)\/(?!(?:user|node|app|appuser|runner|ubuntu)\/)[^/\s"'<>]+\/)/;
const isInfra = (f) => /(^|\/)(Dockerfile[^/]*|docker-compose[^/]*\.ya?ml|compose\.ya?ml)$/.test(f) || f.startsWith('.github/');
const reFor = (f) => (isInfra(f) ? DRIVE_RE : ABS_RE);
const globRe = (g) => new RegExp('^' + g.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\0').replace(/\*/g, '[^/]*').replace(/\?/g, '[^/]').replace(/\0/g, '.*') + '$');
const allowRe = read('.sb-allow-abs').split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#')).map(globRe);
const allowed = (file, n) => allowRe.some((r) => r.test(file) || r.test(`${file}:${n}`));
// Một bộ lọc file cho cả hai chế độ.
const SKIP_FILE = /(^|\/)(node_modules|dist|build)\/|(^|\/)(package-lock\.json|npm-shrinkwrap\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb|[\w.-]+\.lock)$|^docs\/(CHANGELOG|JOURNAL)\.md$|^\.sb-allow-abs$/;
// Trả về [{file, n, text}] các dòng khớp (regex chạy trên toàn nội dung trước, rồi mới tách dòng).
function absHits() {
  const res = [];
  const scanText = (file, content, firstLine = 1) => {
    if (!reFor(file).test(content)) return;
    content.split(/\r?\n/).forEach((text, i) => { if (reFor(file).test(text)) res.push({ file, n: firstLine + i, text }); });
  };
  if (diffBase) {
    let cur = null;
    let n = 0;
    for (const l of git('diff', '-U0', '--no-color', `${diffBase}...HEAD`).split('\n')) {
      if (l.startsWith('+++ ')) { cur = l.startsWith('+++ b/') && !SKIP_FILE.test(l.slice(6)) ? l.slice(6) : null; continue; }
      const h = l.match(/^@@ -\S+ \+(\d+)/);
      if (h) { n = Number(h[1]); continue; }
      if (cur && l.startsWith('+')) { if (reFor(cur).test(l)) res.push({ file: cur, n, text: l.slice(1) }); n++; }
    }
    return res;
  }
  for (const f of new Set(git('ls-files', '-co', '--exclude-standard', '-z').split('\0').filter(Boolean))) {
    if (SKIP_FILE.test(f)) continue;
    let st;
    try { st = fs.lstatSync(p(f)); } catch { continue; }
    if (!st.isFile() || st.size > 1024 * 1024) continue;
    const buf = fs.readFileSync(p(f));
    if (buf.subarray(0, 8000).includes(0)) continue;
    scanText(f, buf.toString('utf8'));
  }
  return res;
}
try {
  const all = absHits().filter((x) => !allowed(x.file, x.n));
  const inTests = (x) => /^(tests?|__tests__)\//.test(x.file);
  const fmt = (a) => a.map((x) => `${x.file}:${x.n}`);
  const hard = fmt([...new Map(all.filter((x) => !inTests(x)).map((x) => [`${x.file}:${x.n}`, x])).values()]);
  const soft = fmt(all.filter(inTests));
  add(hard.length === 0, `Không có đường dẫn tuyệt đối theo máy${diffBase ? ` (dòng thêm mới so với ${diffBase})` : ''}${hard.length ? ` (lỗi: ${shortList(hard, 10)})` : ''}`);
  if (soft.length) warn(false, `Đường dẫn tuyệt đối trong tests/ (${shortList(soft, 10)})`);
} catch (e) {
  warn(false, `Đường dẫn tuyệt đối: không quét được (cần repo git${diffBase ? ` và base "${diffBase}" hợp lệ` : ''})`);
}

// ---- File chỉ dẫn agent ----
const agentFiles = ['CLAUDE.md', 'AGENTS.md', 'GEMINI.md'].filter((f) => has(f));
const sections = {};
for (const f of agentFiles) {
  const t = read(f).replace(/\r\n/g, '\n');
  const hits = (re) => [...new Set([...t.matchAll(re)].map((m) => `${f}:${lineOf(t, m.index)}`))];
  const pathHits = hits(/@[A-Za-z]:\\|SecondBrain[\\/]SecondBrain\.md/g);
  add(pathHits.length === 0, `${f}: không trỏ tới đường dẫn máy/vault${pathHits.length ? ` (lỗi: ${shortList(pathHits)})` : ''}`);
  const copied = hits(/Behavioral guidelines|KHÔNG tự code|Workflow bắt buộc|Đầu MỖI phiên/g);
  tr(copied.length === 0, `${f}: không chép luật chung (đã có ở global/AI Repo Rules)${copied.length ? ` (lỗi: ${shortList(copied)})` : ''}`);
  const trimmed = t
    .replace(/<!--\s*gitnexus:start\s*-->[\s\S]*?<!--\s*gitnexus:end\s*-->/g, '')
    .replace(/<!--\s*BEGIN:nextjs[^>]*-->[\s\S]*?<!--\s*END:nextjs[^>]*-->/g, '');
  warn(trimmed.length <= 3000, `${f}: ngắn gọn (${trimmed.length}/3000 ký tự, không tính khối GitNexus/Next.js)`);
  const refs = [];
  const refsIgnored = [];
  const seen = new Set();
  for (const m of t.matchAll(/`([^`\n]+)`/g)) {
    const tok = m[1].trim().split(/\s+/)[0].replace(/[.,;:)]+$/, '').replace(/:\d+$/, '');
    if (seen.has(tok) || /[<>*{}$|]|\.\.\.|…/.test(tok)) continue;
    if (/^_Templates\//.test(tok)) { seen.add(tok); refs.push(`${f}:${lineOf(t, m.index)} ${tok} (đường dẫn vault cũ)`); continue; }
    if (/^(\.claude|\.codex|docs|scripts)\//.test(tok) && !has(...tok.replace(/\/$/, '').split('/'))) {
      seen.add(tok);
      const ref = `${f}:${lineOf(t, m.index)} ${tok}`;
      let ignored = false;
      try { git('check-ignore', '-q', tok.replace(/\/$/, '')); ignored = true; } catch { /* không bị ignore */ }
      (ignored ? refsIgnored : refs).push(ref);
    }
  }
  if (refsIgnored.length) warn(false, `${f}: nhắc tới đường dẫn bị gitignore, chưa có trên máy này (${shortList(refsIgnored, 8)})`);
  add(refs.length === 0, `${f}: đường dẫn nhắc tới đều tồn tại${refs.length ? ` (lỗi: ${shortList(refs, 8)})` : ''}`);
  const sec = t.match(/^## Quy tắc dự án[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1] ?? '';
  if (!/^\s*@AGENTS\.md\s*$/.test(t)) sections[f] = sec.replace(/\s+/g, ' ').trim();
}
const secNames = Object.keys(sections);
if (secNames.length > 1) {
  const same = secNames.every((f) => sections[f] === sections[secNames[0]]);
  warn(same, `Agent files: mục "Quy tắc dự án" giống nhau giữa ${secNames.join(', ')}`);
}

// ---- CHANGELOG và JOURNAL ----
const changelog = read('docs', 'CHANGELOG.md');
add(!!changelog, 'docs/CHANGELOG.md: có');
if (changelog) {
  const head = changelog.split(/\r?\n/).slice(0, 60);
  const i = head.findIndex((l) => /\|\s*(Lỗi|Vấn đề)\s*\|\s*Nguyên nhân[^|]*\|\s*Giải pháp/.test(l));
  add(i >= 0, 'docs/CHANGELOG.md: 60 dòng đầu có bảng "Lỗi | Nguyên nhân | Giải pháp"');
}
const journal = read('docs', 'JOURNAL.md');
add(!!journal, 'docs/JOURNAL.md: có');
if (journal) {
  const jl = journal.replace(/\n+$/, '').split(/\r?\n/);
  add(jl.length <= 45, `docs/JOURNAL.md: tối đa 45 dòng (hiện ${jl.length})`);
  const bad = [];
  const old = [];
  jl.forEach((l, i) => {
    if (!/^### /.test(l)) return;
    const m = l.match(/^### (\d{4}-\d{2}-\d{2}) — \[[^\]]+\] — .+/);
    if (!m) return bad.push(`docs/JOURNAL.md:${i + 1}`);
    if ((Date.now() - Date.parse(m[1])) / 864e5 > 14) old.push(`docs/JOURNAL.md:${i + 1}`);
  });
  add(bad.length === 0, `docs/JOURNAL.md: heading dạng "### YYYY-MM-DD — [tool] — tiêu đề"${bad.length ? ` (lỗi: ${shortList(bad)})` : ''}`);
  warn(old.length === 0, `docs/JOURNAL.md: không có mục dở quá 14 ngày${old.length ? ` (${shortList(old)})` : ''}`);
}
if (diffBase) {
  try {
    const files = git('diff', '--name-only', `${diffBase}...HEAD`).split('\n').filter(Boolean);
    const code = files.filter((f) => !/\.md$/i.test(f) && !/^(docs|tests?|__tests__|\.github)\//.test(f) && !SKIP_FILE.test(f));
    const skip = /^Changelog:\s*skip\s*$/im.test(git('log', '--format=%B', `${diffBase}..HEAD`));
    if (code.length && !files.includes('docs/CHANGELOG.md') && !skip) add(false, `CHANGELOG: có đổi code (${shortList(code, 3)}) mà docs/CHANGELOG.md không đổi (bỏ qua bằng trailer "Changelog: skip")`);
    else add(true, `CHANGELOG: cập nhật cùng thay đổi code so với ${diffBase}`);
  } catch {
    warn(false, `CHANGELOG: không so được với base "${diffBase}"`);
  }
}

// ---- UI (web-*, desktop) ----
if (kind?.startsWith('web-') || kind === 'desktop') {
  try {
    const { checkUi } = await import('./check-ui.mjs');
    for (const r of checkUi(repo, { kind, free: manifest.free === true })) out.push(r);
  } catch (e) {
    warn(false, `UI: không chạy được check-ui.mjs cạnh checker (${e.code || e.message}); chép cả check-ui.mjs vào scripts/`);
  }
}

// ---- In kết quả ----
const count = { pass: 0, warn: 0, fail: 0 };
console.log(`Repo: ${path.basename(repo)}`);
for (const r of out) {
  count[r.level]++;
  console.log(`${r.level.toUpperCase().padEnd(4)}  ${r.msg}`);
}
console.log(`${count.pass}/${out.length} đạt, ${count.warn} cảnh báo, ${count.fail} lỗi.`);
process.exit(count.fail ? 1 : 0);
