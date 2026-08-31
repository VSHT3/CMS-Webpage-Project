// ─────────────────────────────────────────────────────────────────────────────
// Tzolk'in Almanac Reconstruction — read-only viewer
//
// Verejná verzia. Nič sa nedá meniť ani ukladať: žiadne vstupné polia, žiadny
// localStorage, žiadny zápis. Dáta prichádzajú zo statického viewer_data.js.
// Pôvodná pracovná aplikácia (../files/) zostáva nedotknutá.
// ─────────────────────────────────────────────────────────────────────────────

const DAYS = [
  'Imix',"Ik'",'Ak\'bal',"K'an",'Chikchan','Kimi',"Manik'",'Lamat',
  'Muluk','Ok','Chuwen','Eb','Ben','Ix','Men','Kib','Kaban',"Etz'nab",'Kawak','Ajaw'
];

const DAY_ALIASES = {
  "B'en": 'Ben', "Eb'": 'Eb', "Kab'an": 'Kaban', "Kib'": 'Kib',
  "Ik": "Ik'", "Manik": "Manik'", "Muluk'": 'Muluk',
  "Etz'nab'": "Etz'nab", "Etz'ab'": "Etz'nab",
  "Ak'b'al": "Ak'bal", "Akb'al": "Ak'bal",
  'Chikkchan': 'Chikchan', 'Oc': 'Ok', '0k': 'Ok', 'Ahaw': 'Ajaw',
};

function normalizeDay(raw) {
  if (!raw) return null;
  if (DAYS.includes(raw)) return raw;
  if (DAY_ALIASES[raw]) return DAY_ALIASES[raw];
  return null;
}

function parseCoeff(raw) {
  if (raw === null || raw === '_' || raw === '-') return null;
  const n = parseInt(raw);
  return isNaN(n) ? null : n;
}

function coeffUncertain(raw) {
  return typeof raw === 'string' && raw.endsWith('?');
}

function advance(coeff, dayName, n) {
  n = ((n % 260) + 260) % 260;
  const di = DAYS.indexOf(dayName);
  if (di === -1) return null;
  return { coeff: ((coeff - 1 + n) % 13) + 1, day: DAYS[(di + n) % 20] };
}

// pos = (di*221 + (c-1)*40) mod 260
function tzolkinPos(coeff, dayName) {
  const canonical = normalizeDay(dayName) || dayName;
  const di = DAYS.indexOf(canonical);
  if (di === -1 || coeff === null) return null;
  return ((di * 221) + ((coeff - 1) * 40)) % 260;
}

const ALMANAC_TYPES = ['Standard', 'Crossover', 'Circular', 'In extenso', 'Non-standard'];

// ── Stav (len navigácia — nič, čo by sa ukladalo) ─────────────────────────────

const V = { codex: 'DRE', pageNum: null, register: null, almanacIdx: 0 };

let DATA = [];
let DELETED = new Set();
let CUSTOM = [];
let _sbCodex = null;

// ── Dáta ──────────────────────────────────────────────────────────────────────

function recordFor(codex, pageNum, register, idx) {
  const key = `tz_${codex}_${pageNum}${register}_${idx}`;
  return (VIEWER_DATA.entries && VIEWER_DATA.entries[key]) || null;
}

function currentRecord() {
  return recordFor(V.codex, V.pageNum, V.register, V.almanacIdx);
}

function parsePage(p) {
  const m = String(p).match(/^(\d+)([a-z])/);
  return m ? { num: m[1], reg: m[2] } : { num: String(p), reg: '?' };
}

function getPages(codex) {
  const seen = new Set();
  return DATA.filter(r => r[0] === codex)
    .map(r => parsePage(r[1]).num)
    .filter(n => { if (seen.has(n)) return false; seen.add(n); return true; })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function getRegisters(codex, pageNum) {
  const seen = new Set();
  return DATA.filter(r => r[0] === codex && parsePage(r[1]).num === pageNum)
    .map(r => parsePage(r[1]).reg)
    .filter(r => { if (seen.has(r)) return false; seen.add(r); return true; })
    .sort();
}

function getAlmanacs(codex, pageNum, register) {
  return DATA.filter(r => {
    const p = parsePage(r[1]);
    return r[0] === codex && p.num === pageNum && p.reg === register;
  });
}

function currentEntry() {
  return getAlmanacs(V.codex, V.pageNum, V.register)[V.almanacIdx] || null;
}

function isInterp2Entry(e) { return !!(e && typeof e[5] === 'string' && e[5].startsWith('i2:')); }
function isCustomEntry(e)  { return !!(e && e[5] !== undefined && !isInterp2Entry(e)); }

// ── Typ / štruktúra z mayacodices.org ─────────────────────────────────────────

function normPageKey(page) {
  let l = String(page).trim().replace(/\s+/g, '');
  const p = l.split('-');
  if (p.length === 2 && p[0] === p[1]) l = p[0];
  return l.replace(/\b0+(\d)/g, '$1');
}

function importKey(entry) { return entry ? `${entry[0]}|${normPageKey(entry[1])}` : null; }

function importedInfo(entry) {
  if (typeof IMPORTED_TYPES === 'undefined' || !entry) return null;
  return IMPORTED_TYPES[importKey(entry)] || null;
}

function buildInterp2(base) {
  if (typeof IMPORTED_TYPES === 'undefined') return [];
  const out = [], seen = new Set();
  for (const e of base) {
    const key = importKey(e), info = IMPORTED_TYPES[key];
    if (!info || info.match !== 'mismatch' || seen.has(key)) continue;
    seen.add(key);
    out.push([e[0], e[1], e[2], e[3], [...e[4]], 'i2:' + key]);
  }
  return out;
}

function rebuildData() {
  const base = [...ALMANAC_DATA.filter((_, i) => !DELETED.has(i)), ...CUSTOM];
  DATA = [...base, ...buildInterp2(base)];
}

// ── Efektívne hodnoty ─────────────────────────────────────────────────────────

function effectiveStartCoeff(entry) {
  const rec = currentRecord();
  if (rec && rec.coeffOverride !== null && rec.coeffOverride !== undefined) return rec.coeffOverride;
  return parseCoeff(entry ? entry[3] : null);
}

function effectiveStartDays(entry) {
  if (!entry) return [];
  const rec = currentRecord();
  if (rec && Array.isArray(rec.daysOverride)) return rec.daysOverride;
  return entry[4];
}

function currentDNs() {
  const rec = currentRecord();
  if (!rec) return [];
  return (rec.dns || []).slice(0, rec.count || 4);
}

function interLevelDistance(entry, effCoeff) {
  if (!entry) return null;
  const coeff = effCoeff ?? parseCoeff(entry[3]);
  if (coeff === null) return null;
  const days = effectiveStartDays(entry);
  if (days.length < 2) return null;
  const p0 = tzolkinPos(coeff, days[0]);
  const p1 = tzolkinPos(coeff, days[1]);
  if (p0 === null || p1 === null) return null;
  return ((p1 - p0 + 260) % 260) || 260;
}

function analyzeConstraints() {
  const e = currentEntry();
  const dns = currentDNs();
  if (dns.length === 0) return { status: 'none' };
  const erasedIdx   = dns.reduce((a, d, i) => d === null ? [...a, i] : a, []);
  const knownSum    = dns.filter(d => d !== null).reduce((a, b) => a + b, 0);
  const erasedCount = erasedIdx.length;
  if (erasedCount === 0) return { status: 'complete' };

  const baseDist = interLevelDistance(e, effectiveStartCoeff(e));
  let total = baseDist ?? 260;
  while (total - knownSum < erasedCount) total += 260;
  const remaining = total - knownSum;

  if (erasedCount === 1) {
    if (remaining >= 1 && remaining <= 260)
      return { status: 'unique', value: remaining, total, baseDist, erasedIdx };
    return { status: 'impossible', knownSum, total, baseDist, erasedIdx };
  }
  return { status: 'multiple', erasedSum: remaining, erasedCount, total, baseDist, erasedIdx };
}

function effectiveDNs() {
  const c = analyzeConstraints();
  const dns = currentDNs();
  if (c.status === 'unique') return dns.map(d => d === null ? c.value : d);
  return dns;
}

// ── Vykreslenie ───────────────────────────────────────────────────────────────

const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[m]));

function renderCodexTabs() {
  const names = { DRE: 'Dresden (DRE)', MAD: 'Madrid (MAD)', PAR: 'Paris (PAR)' };
  document.getElementById('codex-tabs').innerHTML = ['DRE', 'MAD', 'PAR']
    .filter(c => DATA.some(r => r[0] === c))
    .map(c => `<button class="ctab${c === V.codex ? ' active' : ''}" onclick="selectCodex('${c}')">${names[c]}</button>`)
    .join('');
}

function renderSelectors() {
  const pages = getPages(V.codex);
  document.getElementById('sel-page').innerHTML = pages.map(p =>
    `<option value="${esc(p)}"${p === V.pageNum ? ' selected' : ''}>${esc(p)}</option>`).join('');

  const regs = getRegisters(V.codex, V.pageNum);
  document.getElementById('sel-register').innerHTML = regs.map(r =>
    `<option value="${esc(r)}"${r === V.register ? ' selected' : ''}>${esc(r)}</option>`).join('');

  const almanacs = getAlmanacs(V.codex, V.pageNum, V.register);
  document.getElementById('lbl-almanac').textContent =
    `Almanac on page ${V.pageNum}${V.register} (${almanacs.length})`;
  document.getElementById('sel-almanac').innerHTML = almanacs.map((a, i) => {
    const coeff = parseCoeff(a[3]);
    const cStr  = coeff === null ? '?' : String(a[3]).padStart(2, '0');
    const days  = a[4].slice(0, 3).join(', ') + (a[4].length > 3 ? '…' : '');
    const tag   = isInterp2Entry(a) ? ' [Interpretation 2 · mayacodices]' : '';
    return `<option value="${i}"${i === V.almanacIdx ? ' selected' : ''}>${i+1}. ${a[2]} levels · coeff. ${cStr} · ${esc(days)}${esc(tag)}</option>`;
  }).join('');
}

function renderBreadcrumb() {
  const almanacs = getAlmanacs(V.codex, V.pageNum, V.register);
  document.getElementById('breadcrumb').innerHTML = `
    <span class="bc-seg">${V.codex}</span><span class="bc-div">/</span>
    <span class="bc-seg">page ${esc(V.pageNum)}</span><span class="bc-div">/</span>
    <span class="bc-seg">register ${esc(V.register)}</span><span class="bc-div">/</span>
    <span class="bc-seg bc-cur">almanac ${V.almanacIdx + 1} of ${almanacs.length}</span>`;
}

function renderMeta() {
  const e = currentEntry();
  const host = document.getElementById('meta-cards');
  if (!e) { host.innerHTML = ''; return; }

  const rec       = currentRecord();
  const effCoeff  = effectiveStartCoeff(e);
  const uncertain = coeffUncertain(e[3]);
  const effDays   = effectiveStartDays(e);
  const types     = (rec && rec.almanacTypes) || [];
  const imp       = importedInfo(e);

  const badges = [];
  if (isCustomEntry(e))  badges.push('custom');
  if (isInterp2Entry(e)) badges.push('interpretation 2');
  const badgeHtml = badges.length
    ? `<span class="alm-badges">${badges.map(b => `<span class="badge-tag">${b}</span>`).join('')}</span>`
    : '';

  const coeffStr = effCoeff === null ? '?'
    : `${effCoeff}${uncertain ? '<sup title="partially legible">?</sup>' : ''}`;

  const typeStr = types.length
    ? `<span class="alm-type">${esc(types.join(', '))}</span>`
    : `<span class="alm-type-none">not classified</span>`;

  const days = effDays.map(d => {
    const canon = normalizeDay(d) || d;
    return `<span class="day${DAYS.includes(canon) ? '' : ' day-unknown'}">${esc(canon)}</span>`;
  }).join('');

  const facts = [
    ['Starting days', days],
  ];

  if (imp) {
    const label = imp.type.toLowerCase() + (imp.uncertain ? '?' : '');
    const struct = imp.structure ? ` <span class="sep">·</span> ${esc(imp.structure.replace(/\bx\b/, '×'))}` : '';
    let note = ` <span class="fact-note">(almanac #${imp.alm})</span>`;
    if (imp.match === 'mismatch') {
      note += isInterp2Entry(e)
        ? `<div class="fact-note">Reading by mayacodices.org — ${imp.levels ?? '?'} levels.</div>`
        : `<div class="fact-warn">Structure differs — see Interpretation 2 in the list.</div>`;
    }
    facts.push(['mayacodices.org', esc(label) + struct + note]);
  }

  host.innerHTML = `
    <div class="alm-head">
      <div class="alm-title">${e[0]} ${esc(e[1])}${badgeHtml}</div>
      <div class="alm-line">
        ${effDays.length} levels
        <span class="sep">·</span> starting coefficient <span class="alm-coeff">${coeffStr}</span>
        <span class="sep">·</span> ${typeStr}
      </div>
      <div class="alm-facts">
        ${facts.map(([k, v]) => `<div class="fact-k">${k}</div><div class="fact-v">${v}</div>`).join('')}
      </div>
    </div>`;
}

// Dištančné čísla a obmedzenie sú zlúčené do jedného riadku.
function renderConstraintBar() { /* zlúčené do renderDNSection */ }

function renderDNSection() {
  const wrap = document.getElementById('dn-section');
  const dns  = currentDNs();
  if (dns.length === 0) {
    wrap.innerHTML = `<div class="dn-empty">No distance numbers recorded for this almanac.</div>`;
    return;
  }

  const c = analyzeConstraints();
  const terms = dns.map(d => {
    if (d !== null) return `<span class="dn-num">${d}</span>`;
    return c.status === 'unique'
      ? `<span class="dn-num-solved">${c.value}</span>`
      : `<span class="dn-num-erased">?</span>`;
  }).join('<span class="dn-op">+</span>');

  const sum = c.status === 'complete'
    ? dns.reduce((a, b) => a + b, 0)
    : (c.total || 260);

  const bits = [];
  if (c.baseDist) bits.push(`inter-level distance ${c.baseDist}`);
  if (c.status === 'unique')      bits.push(`<span class="ok">one erased number, uniquely determined as ${c.value}</span>`);
  else if (c.status === 'multiple') bits.push(`<span class="warn">${c.erasedCount} erased, summing to ${c.erasedSum}</span>`);
  else if (c.status === 'impossible') bits.push(`<span class="warn">inconsistent with the inter-level distance</span>`);

  wrap.innerHTML = `
    <div class="dn-line">${terms}<span class="dn-op">=</span><span class="dn-total">${sum}</span></div>
    ${bits.length ? `<div class="dn-meta">${bits.join(' <span class="sep">·</span> ')}</div>` : ''}`;
}

function renderTable() {
  const e = currentEntry();
  const wrap = document.getElementById('table-wrap');
  if (!e) { wrap.innerHTML = ''; return; }

  const startCoeff = effectiveStartCoeff(e);
  const startDays  = effectiveStartDays(e);
  const effDNs     = effectiveDNs();

  if (effDNs.length === 0) {
    wrap.innerHTML = `<div class="dn-empty">No reconstruction available — distance numbers have not been recorded.</div>`;
    return;
  }

  const head = ['Level', 'Start'].concat(effDNs.map((_, i) => `Frame ${i+1}`));
  let html = `<table class="rc-table"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;

  for (let lvl = 0; lvl < startDays.length; lvl++) {
    const day0 = normalizeDay(startDays[lvl]) || startDays[lvl];
    html += `<tr><td class="rc-lvl">${lvl + 1}</td>`;
    html += `<td class="rc-start">${startCoeff ?? '?'} ${esc(day0)}</td>`;
    let cc = startCoeff, cd = normalizeDay(day0);
    for (const dn of effDNs) {
      if (dn === null || cc === null || cd === null) { html += `<td class="rc-unk">?</td>`; continue; }
      const r = advance(cc, cd, dn);
      if (!r) { html += `<td class="rc-unk">?</td>`; continue; }
      html += `<td><span class="rc-coeff">${r.coeff}</span> ${esc(r.day)}</td>`;
      cc = r.coeff; cd = r.day;
    }
    html += `</tr>`;
  }
  wrap.innerHTML = html + `</tbody></table>`;
}

// ── Bočný panel ───────────────────────────────────────────────────────────────

function sbItemId(codex, page, reg, idx) {
  return `sbi-${codex}-${page}-${reg === '?' ? '_' : reg}-${idx}`;
}

function almanacStatus(codex, pNum, pReg, idx) {
  const rec = recordFor(codex, pNum, pReg, idx);
  if (!rec) return 'empty';
  const hasDNs  = (rec.dns || []).some(d => d !== null);
  const hasType = (rec.almanacTypes || []).length > 0;
  if (hasDNs && hasType) return 'complete';
  if (hasDNs || hasType) return 'partial';
  return 'empty';
}

function renderSidebar() {
  const list = document.getElementById('sb-list');
  if (!list) return;
  _sbCodex = V.codex;
  let html = '';

  for (const page of getPages(V.codex)) {
    for (const reg of getRegisters(V.codex, page)) {
      const almanacs = getAlmanacs(V.codex, page, reg);
      if (!almanacs.length) continue;
      const isCur = page === V.pageNum && reg === V.register;
      const statuses = almanacs.map((_, i) => almanacStatus(V.codex, page, reg, i));
      let grp = 'empty';
      if (statuses.every(s => s === 'complete')) grp = 'complete';
      else if (statuses.some(s => s !== 'empty')) grp = 'partial';

      html += `<div class="sb-group"><button class="sb-group-head" onclick="sbToggleGroup(this)">`;
      html += `<span class="sb-arrow">${isCur ? '▾' : '▸'}</span>`;
      html += `<span class="sb-dot sb-dot-${grp}"></span>`;
      html += `<span class="sb-page-label">${esc(page + (reg !== '?' ? reg : ''))}</span>`;
      html += `<span class="sb-count">${almanacs.length}</span></button>`;
      html += `<div class="sb-items"${isCur ? '' : ' hidden'}>`;
      almanacs.forEach((a, i) => {
        const coeff = a[3] ? String(a[3]).replace(/^0/, '') : '?';
        const days  = a[4].length > 2 ? a[4].slice(0, 2).join(', ') + '…' : a[4].join(', ');
        html += `<div id="${sbItemId(V.codex, page, reg, i)}" class="sb-item${isCur && i === V.almanacIdx ? ' sb-active' : ''}${isCustomEntry(a) ? ' sb-custom' : ''}" onclick="navigateSb('${V.codex}','${page}','${reg}',${i})">`;
        html += `<span class="sb-dot sb-dot-${statuses[i]}"></span>`;
        html += `<span class="sb-label">#${i+1}</span>`;
        html += `<span class="sb-sub">${esc(coeff)} · ${esc(days)}</span></div>`;
      });
      html += `</div></div>`;
    }
  }
  list.innerHTML = html;
  const active = list.querySelector('.sb-active');
  if (active) active.scrollIntoView({ block: 'nearest' });
}

function updateSidebarActive() {
  const list = document.getElementById('sb-list');
  if (!list) return;
  if (_sbCodex !== V.codex) { renderSidebar(); return; }
  list.querySelectorAll('.sb-item').forEach(el => el.classList.remove('sb-active'));
  const el = document.getElementById(sbItemId(V.codex, V.pageNum, V.register, V.almanacIdx));
  if (!el) return;
  const items = el.closest('.sb-items');
  if (items && items.hasAttribute('hidden')) {
    items.removeAttribute('hidden');
    const arrow = items.previousElementSibling?.querySelector('.sb-arrow');
    if (arrow) arrow.textContent = '▾';
  }
  el.classList.add('sb-active');
  el.scrollIntoView({ block: 'nearest' });
}

function sbToggleGroup(head) {
  const items = head.nextElementSibling;
  if (!items) return;
  const open = !items.hasAttribute('hidden');
  items.toggleAttribute('hidden', open);
  const arrow = head.querySelector('.sb-arrow');
  if (arrow) arrow.textContent = open ? '▸' : '▾';
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const btn = document.getElementById('sb-toggle');
  const collapsed = sb.classList.toggle('sb-collapsed');
  if (btn) btn.textContent = collapsed ? '›' : '‹';
}

// ── Navigácia ─────────────────────────────────────────────────────────────────

function render() {
  renderCodexTabs();
  renderSelectors();
  renderBreadcrumb();
  renderMeta();
  renderConstraintBar();
  renderDNSection();
  renderTable();
  updateSidebarActive();
}

function selectCodex(codex) {
  V.codex = codex;
  const pages = getPages(codex);
  V.pageNum = pages[0] || null;
  V.register = V.pageNum ? (getRegisters(codex, V.pageNum)[0] || null) : null;
  V.almanacIdx = 0;
  renderSidebar();
  render();
}

function selectPage(pageNum) {
  V.pageNum = pageNum;
  V.register = getRegisters(V.codex, pageNum)[0] || null;
  V.almanacIdx = 0;
  render();
}

function selectRegister(reg) { V.register = reg; V.almanacIdx = 0; render(); }
function selectAlmanac(idx)  { V.almanacIdx = parseInt(idx); render(); }

function navigateSb(codex, page, reg, idx) {
  V.codex = codex; V.pageNum = page; V.register = reg; V.almanacIdx = idx;
  render();
}

// ── Vyhľadávanie ──────────────────────────────────────────────────────────────

function onSearch(q) {
  const box = document.getElementById('search-results');
  const term = q.trim().toLowerCase();
  if (term.length < 2) { box.classList.add('hidden'); return; }

  const hits = [];
  for (const e of DATA) {
    const p = parsePage(e[1]);
    const hay = `${e[0]} ${e[1]} ${e[3]} ${e[4].join(' ')}`.toLowerCase();
    if (!hay.includes(term)) continue;
    const idx = getAlmanacs(e[0], p.num, p.reg).indexOf(e);
    hits.push({ e, num: p.num, reg: p.reg, idx });
    if (hits.length >= 40) break;
  }

  box.innerHTML = hits.length
    ? hits.map(h => `<div class="sr-item" onclick="navigateSb('${h.e[0]}','${h.num}','${h.reg}',${h.idx});document.getElementById('search-results').classList.add('hidden')">
         <b>${h.e[0]} ${esc(h.e[1])}</b> #${h.idx + 1} · coeff. ${esc(h.e[3] ?? '?')} · ${esc(h.e[4].slice(0, 3).join(', '))}</div>`).join('')
    : `<div class="sr-empty">No match</div>`;
  box.classList.remove('hidden');
}

// ── Štart ─────────────────────────────────────────────────────────────────────

function init() {
  try {
    DELETED = new Set(VIEWER_DATA.deleted || []);
    CUSTOM  = VIEWER_DATA.custom || [];
    rebuildData();

    document.getElementById('sel-page').addEventListener('change', e => selectPage(e.target.value));
    document.getElementById('sel-register').addEventListener('change', e => selectRegister(e.target.value));
    document.getElementById('sel-almanac').addEventListener('change', e => selectAlmanac(e.target.value));
    document.getElementById('search-input').addEventListener('input', e => onSearch(e.target.value));
    document.addEventListener('click', e => {
      if (!e.target.closest('#search-input') && !e.target.closest('#search-results'))
        document.getElementById('search-results').classList.add('hidden');
    });

    const pages = getPages(V.codex);
    V.pageNum  = pages[0] || null;
    V.register = V.pageNum ? (getRegisters(V.codex, V.pageNum)[0] || null) : null;

    const stamp = document.getElementById('data-stamp');
    if (stamp && VIEWER_DATA.generated) stamp.textContent = `Data as of ${VIEWER_DATA.generated}`;

    renderSidebar();
    render();
  } catch (err) {
    document.getElementById('app').innerHTML =
      `<div class="error-state">Error loading data: ${esc(err.message)}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
