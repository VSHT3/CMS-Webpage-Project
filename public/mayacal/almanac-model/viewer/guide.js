// ─────────────────────────────────────────────────────────────────────────────
// Sprievodca tvorbou almanachu — krok za krokom, nič nie je vopred vyplnené.
// Závisí od calendar.js, models.js a templates.js (štatistiky korpusu).
// ─────────────────────────────────────────────────────────────────────────────

const W = {
  step: 0,
  type: null,
  coeff: null, day: null,          // začiatočný tzolk'in
  frames: null,                    // počet rámcov
  rows: null,                      // počet riadkov (kôl); interval = 260 / rows
  dns: [],                         // dištančné čísla, jedno na rámec
  top: 'E',                        // kruhový: svetová strana hore
  pos: '', neg: '', gods: [],      // prekrížený: mená a priradenie rámcov
  name: '',
  numerals: false, glyphs: true,
};

const $   = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[m]));

// ── Kroky ────────────────────────────────────────────────────────────────────

const STEP_TITLES = {
  type: 'Type', start: 'Starting day', frames: 'Frames', rows: 'Rows',
  dns: 'Distance numbers', circle: 'Circle', deities: 'Deities', result: 'Your almanac',
};

function steps() {
  const extra = W.type === 'Circular' ? ['circle'] : W.type === 'Crossover' ? ['deities'] : [];
  return ['type', 'start', 'frames', 'rows', 'dns', ...extra, 'result'];
}

const curKey   = () => steps()[W.step];
const interval = () => W.rows ? TZOLKIN / W.rows : null;
const dnSum    = () => W.dns.reduce((a, b) => a + (Number.isInteger(b) ? b : 0), 0);

function stepDone(key) {
  switch (key) {
    case 'type':   return !!W.type;
    case 'start':  return !!(W.coeff && W.day);
    case 'frames': return Number.isInteger(W.frames) && W.frames >= 1 && W.frames <= 40;
    case 'rows':   return !!W.rows && interval() >= W.frames;
    case 'dns':    return W.dns.length === W.frames
                        && W.dns.every(d => Number.isInteger(d) && d >= 1)
                        && dnSum() === interval();
    default:       return true;
  }
}

// Na krok sa dá prejsť, ak sú všetky predchádzajúce hotové
const reachable = i => steps().slice(0, i).every(stepDone);

function go(i) {
  if (i < 0 || i >= steps().length || !reachable(i)) return;
  W.step = i;
  render();
  $('wz-card').scrollTop = 0;
}
const next = () => go(W.step + 1);
const back = () => go(W.step - 1);

// ── Pomocné výpočty ──────────────────────────────────────────────────────────

const startPos = () => tzolkinPos(W.coeff, W.day);

// Dátum rámca f v prvom riadku (A = počiatok); f === frames znamená začiatok 2. riadku
function stationDate(f) {
  let acc = 0;
  for (let i = 0; i < f; i++) {
    if (!Number.isInteger(W.dns[i])) return null;
    acc += W.dns[i];
  }
  return tzolkinAt(startPos() + acc);
}

const frameLetter = f => f < 26 ? String.fromCharCode(65 + f) : 'A' + String.fromCharCode(65 + f - 26);

function model() {
  if (!steps().slice(0, steps().indexOf('dns') + 1).every(stepDone)) return null;
  const m = buildAlmanac({
    rows: W.rows, interval: interval(),
    startCoeff: W.coeff, startDay: W.day,
    dns: W.dns, type: W.type, name: W.name.trim(),
  });
  return m.valid ? m : null;
}

// ── Zobrazenie dátumov (text / mayské číslice / glyfy) ───────────────────────

// Glyfy dní v glyphs/days/ — súbory sú očíslované podľa poradia v tzolk'ine.
// Názvy zodpovedajú presne nahraným súborom (bez apostrofov, napr. 03_Akbal.png).
const DAY_GLYPH_FILES = [
  '01_Imix', '02_Ik', '03_Akbal', '04_Kan', '05_Chikchan', '06_Kimi', '07_Manik',
  '08_Lamat', '09_Mulul', '10_Ok', '11_Chuwen', '12_Eb', '13_Ben', '14_Ix',
  '15_Men', '16_Kib', '17_Kaban', '18_Etznab', '19_Kawak', '20_Ajaw',
];
const glyphSrc = name => `glyphs/days/${DAY_GLYPH_FILES[DAYS.indexOf(name)]}.png`;

function dayCell(name) {
  const txt = esc(name);
  if (!W.glyphs) return txt;
  const safe = String(name).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `<span class="gly"><img src="${glyphSrc(name)}" alt="${txt}"
            onerror="this.closest('.gly').replaceWith(document.createTextNode('${safe}'))"><span class="gly-cap">${txt}</span></span>`;
}
const coeffCell = v => W.numerals
  ? `<span class="num num-coeff" title="${v}">${mayaNumberSVG(v, { color: 'var(--red)' })}</span>`
  : `<span class="co">${v}</span>`;
const dnCell = v => W.numerals
  ? `<span class="num num-dn" title="${v}">${mayaNumberSVG(v, { color: 'var(--black)' })}</span>`
  : String(v);
const dateCell = tz => `${coeffCell(tz.coeff)} ${dayCell(tz.day)}`;
const plainDate = tz => `${tz.coeff} ${tz.day}`;

// ── Vykreslenie ──────────────────────────────────────────────────────────────

function render() {
  renderSteps();
  const key = curKey();
  $('wz-card').className = 'wz-card' + (key === 'result' ? ' wz-result' : '');
  $('wz-card').innerHTML = `<div class="wz-inner">${STEP_RENDER[key]()}</div>${FUNDING}`;
  $('wz-preview').hidden = key === 'type' || key === 'result';
  renderPreview();
  if (STEP_AFTER[key]) STEP_AFTER[key]();
}

// Pätička o financovaní — na konci každého kroku aj v tlači
const FUNDING = `
  <footer class="funding">
    <img class="funding-logo" src="funding-logo.png"
         alt="Funded by the European Union — NextGenerationEU · Recovery and Resilience Plan · Ministry of Education, Research, Development and Youth of the Slovak Republic">
    <p class="funding-text">Funded by the EU NextGenerationEU through the Recovery and Resilience Plan
      for Slovakia under the project No.&nbsp;09I03-03-V04-00243</p>
  </footer>`;

function renderSteps() {
  $('wz-steps').innerHTML = steps().map((k, i) => {
    const cls = i === W.step ? 'cur' : (i < W.step || (reachable(i) && stepDone(k))) ? 'done' : '';
    const can = reachable(i) && i !== W.step;
    return `<button class="wz-step ${cls}" ${can ? `onclick="go(${i})"` : 'disabled'}>
      <span class="n">${cls === 'done' && i !== W.step ? '✓' : i + 1}</span>${STEP_TITLES[k]}</button>`;
  }).join('<span class="wz-sep">›</span>');
}

function nav({ nextLabel = 'Next →', showBack = true } = {}) {
  return `<div class="wz-nav">
    ${showBack && W.step > 0 ? `<button class="btn" onclick="back()">← Back</button>` : ''}
    <button id="wz-next" class="btn btn-primary" onclick="next()" ${stepDone(curKey()) ? '' : 'disabled'}>${nextLabel}</button>
    <span id="wz-why" class="wz-hint"></span>
  </div>`;
}

function updateNav(why = '') {
  const b = $('wz-next');
  if (b) b.disabled = !stepDone(curKey());
  if ($('wz-why')) $('wz-why').textContent = stepDone(curKey()) ? '' : why;
  renderSteps();
  renderPreview();
}

const head = (kicker, title) =>
  `<div class="wz-kicker">Step ${W.step + 1} of ${steps().length} · ${kicker}</div><h2 class="wz-title">${title}</h2>`;

const stats = () => (typeof TYPE_STATS !== 'undefined' && TYPE_STATS[W.type]) || null;

// ── Krok: typ ────────────────────────────────────────────────────────────────

const TYPE_INFO = {
  Standard:  'Frames are read left to right, one row after another. Each row covers the same number of days, and after the last row the almanac returns to its first day.',
  Circular:  'The frames lie on a circle divided into the four world directions around a central image. It is read clockwise; each row is one more round.',
  Crossover: 'A single image with two deities, one benevolent and one malevolent. The frames alternate between them.',
};

function renderType() {
  const cards = ALMANAC_TYPES.map(t => {
    const st = (typeof TYPE_STATS !== 'undefined' && TYPE_STATS[t]) || null;
    return `<button class="type-card${W.type === t ? ' sel' : ''}" onclick="chooseType('${t}')">
      <div class="tc-name">${t}</div>
      <div class="tc-desc">${TYPE_INFO[t]}</div>
      ${st ? `<div class="tc-facts">
        <div><span class="tc-k">Attested</span>${st.count} almanacs</div>
        <div><span class="tc-k">Frames</span>usually ${st.medianFrames} (${st.frames[0]}–${st.frames[1]})</div>
      </div>` : ''}
      <div class="tc-go">Create a ${t.toLowerCase()} almanac →</div>
    </button>`;
  }).join('');

  return `
    <div class="wz-kicker">Almanac guide</div>
    <h2 class="wz-title">What kind of almanac do you want to create?</h2>
    <div class="wz-text">
      <p>A Maya almanac distributes the 260 days of the tzolk'in over a series of frames — pictures with
      a date. This guide takes you through it one decision at a time: the starting day, how many frames,
      how many rows, and the distance numbers between the frames. At every step you see what your
      choices produce.</p>
      <p>All three types use the same calendar arithmetic; they differ in how the almanac is laid out.</p>
    </div>
    <div class="type-cards">${cards}</div>`;
}

function chooseType(t) {
  const keepDisplay = { numerals: W.numerals, glyphs: W.glyphs };
  Object.assign(W, {
    type: t, coeff: null, day: null, frames: null, rows: null, dns: [],
    top: 'E', pos: '', neg: '', gods: [], name: '',
  }, keepDisplay);
  go(1);
}

// ── Krok: začiatočný deň ─────────────────────────────────────────────────────

function renderStart() {
  const coeffs = Array.from({ length: 13 }, (_, i) => i + 1).map(n =>
    `<button class="pick${W.coeff === n ? ' sel' : ''}" onclick="setStart('coeff', ${n})">
       <span class="pick-coeff">${n}</span>${W.numerals ? `<span class="pick-num">${mayaNumberSVG(n, { color: 'var(--red)', scale: 0.7 })}</span>` : ''}
     </button>`).join('');
  const days = DAYS.map((d, i) =>
    `<button class="pick${W.day === d ? ' sel' : ''}" onclick="setStart('day', ${i})">
       ${W.glyphs ? `<img class="pick-gly" src="${glyphSrc(d)}" alt="" onerror="this.remove()">` : ''}
       <span>${esc(d)}</span><small>${i + 1}</small>
     </button>`).join('');

  const chosen = W.coeff && W.day
    ? `<div class="wz-chosen">Your almanac begins on <b class="big">${dateCell({ coeff: W.coeff, day: W.day })}</b>
         <span class="wz-hint">— day ${startPos() + 1} of the 260-day count, counting from 1 Imix</span></div>`
    : `<div class="wz-chosen wz-hint">Choose a coefficient and a day sign.</div>`;

  return `${head('Starting day', 'On which day does the almanac begin?')}
    <div class="wz-text">
      <p>Every date in the tzolk'in combines a <b>coefficient</b> from 1 to 13 with one of <b>20 day signs</b>.
      Both advance together, day by day, so each of the 260 combinations occurs exactly once.</p>
      <p>The first frame of your almanac — frame <b>A</b> — falls on this day. Every other date is counted from here.</p>
    </div>
    <div class="wz-q">Coefficient</div>
    <div class="pick-grid pick-13">${coeffs}</div>
    <div class="wz-q">Day sign</div>
    <div class="pick-grid pick-20">${days}</div>
    ${chosen}
    ${nav()}`;
}

function setStart(what, v) {
  if (what === 'coeff') W.coeff = v;
  else W.day = DAYS[v];
  render();
}

// ── Krok: rámce ──────────────────────────────────────────────────────────────

function renderFrames() {
  const st = stats();
  const n = W.frames;
  const typeTip = {
    Standard:  'In a standard almanac the frames stand side by side and are read from left to right.',
    Circular:  'In a circular almanac the frames are placed around the circle and read clockwise, starting with A at the top.',
    Crossover: 'In a crossover almanac the frames alternate between the two deities, so an even number of frames divides them evenly.',
  }[W.type];

  const strip = n
    ? `<div class="frame-strip">${Array.from({ length: n }, (_, i) => `<span class="frame-box">${frameLetter(i)}</span>`).join('')}</div>`
    : '';

  return `${head('Frames', 'How many frames will the almanac have?')}
    <div class="wz-text">
      <p>A <b>frame</b> is one station of the almanac: a picture accompanied by a date. The frames are
      labelled A, B, C … and the distance numbers you add later lead from one frame to the next.</p>
      <p>${typeTip}</p>
    </div>
    ${st ? `<div class="wz-tip">In the attested ${W.type.toLowerCase()} almanacs the number of frames ranges from
      <b>${st.frames[0]}</b> to <b>${st.frames[1]}</b>; the most typical is <b>${st.medianFrames}</b>.</div>` : ''}
    <div class="wz-q">Number of frames</div>
    <div class="stepper">
      <button class="btn" onclick="setFrames((W.frames || 1) - 1)">−</button>
      <input id="in-frames" type="number" min="1" max="40" value="${n ?? ''}" placeholder="—"
             oninput="setFrames(this.value, true)">
      <button class="btn" onclick="setFrames((W.frames || 0) + 1)">+</button>
    </div>
    <div id="frames-strip">${strip}</div>
    ${nav()}`;
}

function setFrames(v, typing = false) {
  const n = v === '' ? null : Math.round(Number(v));
  W.frames = Number.isInteger(n) && n >= 1 ? Math.min(40, n) : null;
  // počet DN nasleduje počet rámcov; zadané hodnoty sa zachovajú
  if (W.frames) { W.dns = W.dns.slice(0, W.frames); while (W.dns.length < W.frames) W.dns.push(null); }
  W.gods = [];
  if (W.rows && W.frames && interval() < W.frames) W.rows = null;
  if (typing) {
    $('frames-strip').innerHTML = W.frames
      ? `<div class="frame-strip">${Array.from({ length: W.frames }, (_, i) => `<span class="frame-box">${frameLetter(i)}</span>`).join('')}</div>` : '';
    updateNav('Enter a number between 1 and 40.');
  } else render();
}

// ── Krok: riadky ─────────────────────────────────────────────────────────────

function renderRows() {
  const st = stats();
  const unit = W.type === 'Circular' ? ['round', 'rounds'] : ['row', 'rows'];
  const opts = ALMANAC_SHAPES
    .filter(([r, i]) => r >= 2 && i >= 2)
    .map(([r, i]) => {
      const used = st ? (st.shapes[`${r}x${i}`] || 0) : 0;
      const tooShort = i < W.frames;
      return `<button class="opt-card${W.rows === r ? ' sel' : ''}" ${tooShort ? 'disabled' : `onclick="setRows(${r})"`}>
        <b>${r} ${r === 1 ? unit[0] : unit[1]} × ${i} days</b>
        <span>${tooShort ? `too short for ${W.frames} frames`
              : used ? `used in ${used} attested ${W.type.toLowerCase()} almanac${used === 1 ? '' : 's'}` : 'not attested for this type'}</span>
      </button>`;
    }).join('');

  const circularTxt = W.type === 'Circular'
    ? `<p>In a circular almanac each row is <b>one round of the circle</b>: after the last frame you arrive back at A
       and go round again, until all the rounds together make 260 days.</p>` : '';

  return `${head('Rows', `How many ${unit[1]} will it have?`)}
    <div class="wz-text">
      <p>An almanac has to return to its starting day. It does so by repeating the same sequence of frames
      several times — each repetition is a <b>${unit[0]}</b>. One ${unit[0]} spans a fixed number of days, the
      <b>interval</b>, and ${unit[1]} × interval must equal <b>260</b>.</p>
      ${circularTxt}
      <p>So the number of ${unit[1]} decides how many days you will share out between your ${W.frames} frames.
      Each frame needs at least one day, which rules out intervals shorter than ${W.frames}.</p>
    </div>
    <div class="opt-grid">${opts}</div>
    ${W.rows ? `<div class="wz-chosen">${W.rows} ${unit[1]} × <b>${interval()} days</b> = 260.
       Your ${W.frames} distance numbers will have to add up to <b>${interval()}</b>.</div>` : ''}
    ${nav()}`;
}

function setRows(r) { W.rows = r; render(); }

// ── Krok: dištančné čísla ────────────────────────────────────────────────────

function renderDns() {
  const I = interval();
  const rows = W.dns.map((d, f) => {
    const to = f + 1 < W.frames ? `frame ${frameLetter(f + 1)}` : `frame A of the next ${W.type === 'Circular' ? 'round' : 'row'}`;
    return `<tr>
      <td class="dn-from">${frameLetter(f)} → ${f + 1 < W.frames ? frameLetter(f + 1) : 'A'}</td>
      <td><input id="dn-${f}" type="number" min="1" value="${d ?? ''}" placeholder="days" oninput="setDn(${f}, this.value)"></td>
      <td class="dn-land" id="land-${f}"></td>
    </tr>`;
  }).join('');

  return `${head('Distance numbers', 'How many days lie between the frames?')}
    <div class="wz-text">
      <p>A <b>distance number</b> tells how many days to count forward from one frame to the next.
      Starting on <b>${plainDate({ coeff: W.coeff, day: W.day })}</b> at frame A, you add the first number to reach B,
      the second to reach C, and so on. The last number leads back to frame A of the next ${W.type === 'Circular' ? 'round' : 'row'}.</p>
      <p>Together they must use up exactly <b>${I} days</b> — the interval you chose. As you type, you can see which
      day each frame falls on.</p>
    </div>
    <table class="dn-table">
      <tr><td class="dn-from">A</td><td></td><td class="dn-land">starts on <b>${dateCell({ coeff: W.coeff, day: W.day })}</b></td></tr>
      ${rows}
    </table>
    <div id="dn-meter" class="meter"><i></i></div>
    <div id="dn-remaining" class="remaining"></div>
    <div class="btn-row" style="margin-top:.8rem">
      <button class="btn btn-sm" onclick="fillEven()">Split ${I} days evenly</button>
      <button class="btn btn-sm" onclick="clearDns()">Clear</button>
    </div>
    ${nav()}`;
}

function setDn(f, v) {
  const n = v === '' ? null : Math.round(Number(v));
  W.dns[f] = Number.isInteger(n) && n >= 1 ? n : null;
  W.gods = [];
  updateDns();
}

function updateDns() {
  const I = interval(), used = dnSum();
  const left = I - used;

  W.dns.forEach((d, f) => {
    const el = $(`land-${f}`);
    if (!el) return;
    const tz = stationDate(f + 1);
    const where = f + 1 < W.frames ? `frame ${frameLetter(f + 1)} falls on` : `next ${W.type === 'Circular' ? 'round' : 'row'} begins on`;
    el.innerHTML = tz ? `${where} <b>${dateCell(tz)}</b>` : `<span class="wz-hint">${where} …</span>`;
  });

  const meter = $('dn-meter');
  meter.className = 'meter' + (left < 0 ? ' over' : left === 0 && W.dns.every(Number.isInteger) ? ' full' : '');
  meter.firstElementChild.style.width = `${Math.min(100, used / I * 100)}%`;

  const missing = W.dns.filter(d => !Number.isInteger(d)).length;
  $('dn-remaining').innerHTML =
    left < 0 ? `<span class="bad">${used} days — ${-left} too many.</span> Reduce some of the numbers.`
    : missing ? `Used <b>${used}</b> of ${I} days · <b>${left}</b> left for ${missing} frame${missing === 1 ? '' : 's'}.`
    : left > 0 ? `Used <b>${used}</b> of ${I} days · <span class="bad"><b>${left}</b> day${left === 1 ? '' : 's'} still unassigned.</span>`
    : `<span class="ok">All ${I} days are shared out.</span>`;

  updateNav(missing ? 'Fill in every distance number.' : left !== 0 ? `The numbers must add up to ${I}.` : '');
}

function fillEven() {
  W.dns = splitInterval(interval(), W.frames);
  W.gods = [];
  render();
}
function clearDns() { W.dns = W.dns.map(() => null); W.gods = []; render(); }

// ── Krok: kruh ───────────────────────────────────────────────────────────────

const DIRS = {
  E: { name: 'East',  color: 'red',    swatch: '#b3261e' },
  S: { name: 'South', color: 'yellow', swatch: '#d9a521' },
  W: { name: 'West',  color: 'black',  swatch: '#2a2622' },
  N: { name: 'North', color: 'white',  swatch: '#b9b2a6' },
};

// hore, vpravo, dole, vľavo — v smere hodinových ručičiek
function circleDirs() {
  const ring = ['E', 'S', 'W', 'N'];
  const i = ring.indexOf(W.top);
  return [...ring.slice(i), ...ring.slice(0, i)];
}
const frameAngle = (f, F) => f * 360 / F;
const quadrantOf = a => Math.floor(((a + 45) % 360) / 90);
const directionOfFrame = (f, F) => circleDirs()[quadrantOf(frameAngle(f, F))];

function renderCircle() {
  const dirs = ['E', 'S', 'W', 'N'].map(k =>
    `<button class="pick${W.top === k ? ' sel' : ''}" onclick="W.top='${k}'; render()">
       <span class="sw" style="background:${DIRS[k].swatch}"></span><span>${DIRS[k].name}</span><small>${DIRS[k].color}</small>
     </button>`).join('');
  const counts = [0, 0, 0, 0];
  for (let f = 0; f < W.frames; f++) counts[quadrantOf(frameAngle(f, W.frames))]++;
  const order = circleDirs();

  return `${head('Circle', 'How is the circle oriented?')}
    <div class="wz-text">
      <p>The circle is divided into the <b>four world directions</b>, which follow each other clockwise:
      East → South → West → North. Your ${W.frames} frames are spaced evenly around it, and each frame belongs
      to the direction of the quarter it lies in.</p>
      <p>Frame A is always at the top. Choose which direction is at the top — the others follow clockwise.</p>
    </div>
    <div class="wz-q">Direction at the top</div>
    <div class="pick-grid dir-picks">${dirs}</div>
    <div class="wz-tip">${order.map((d, q) => `${DIRS[d].name}: <b>${counts[q]}</b> frame${counts[q] === 1 ? '' : 's'}`).join(' · ')}
      ${W.frames % 4 ? `<br><span class="warn-t">${W.frames} frames cannot be split evenly into four quarters, so the directions receive different numbers of frames.</span>` : ''}</div>
    <div id="circle-preview" class="diagram"></div>
    ${nav()}`;
}

// Kruh sa kreslí v súradniciach so stredom v (0, 0). Skutočné rozmiestnenie
// stĺpcov dátumov a nápisov robí layoutRing() až po vložení do stránky, keď sú
// známe skutočné rozmery stĺpcov (glyfy a mayské číslice ich menia).
function ringHTML(m) {
  const F = m.frames, R = m.rows;
  const rNode = Math.max(120, Math.min(200, 26 * F));
  const polar = (a, r) => [r * Math.sin(a * Math.PI / 180), -r * Math.cos(a * Math.PI / 180)];
  const dirs = circleDirs();

  let g = dirs.map((d, q) =>
    `<path class="ring-sector" data-q="${q}" fill="${DIRS[d].swatch}" fill-opacity="0.07" stroke="${DIRS[d].swatch}" stroke-opacity="0.25"/>`).join('');
  g += `<circle cx="0" cy="0" r="${rNode}" fill="none" stroke="var(--rule-2)" stroke-width="1.5"/>`;

  const overlay = [];
  if (F > 1) for (let f = 0; f < F; f++) {
    const a1 = frameAngle(f, F), a2 = f + 1 === F ? 360 : frameAngle(f + 1, F);
    const padA = Math.min(9, (a2 - a1) / 4);
    const [x1, y1] = polar(a1 + padA, rNode), [x2, y2] = polar(a2 - padA, rNode);
    const large = (a2 - a1 - 2 * padA) > 180 ? 1 : 0;
    g += `<path d="M${x1},${y1} A${rNode},${rNode} 0 ${large} 1 ${x2},${y2}" fill="none" stroke="var(--ink-2)" stroke-width="1.6" marker-end="url(#arr)"/>`;
    const [lx, ly] = polar((a1 + a2) / 2, rNode - 30);
    overlay.push(`<div class="ring-dn" data-x="${lx}" data-y="${ly}">${dnCell(m.dns[f])}</div>`);
  }
  for (let f = 0; f < F; f++) {
    const a = frameAngle(f, F);
    const [nx, ny] = polar(a, rNode);
    g += `<circle cx="${nx}" cy="${ny}" r="14" fill="var(--paper)" stroke="var(--accent)" stroke-width="1.5"/>
          <text x="${nx}" y="${ny + 4.5}" text-anchor="middle" class="ring-letter">${frameLetter(f)}</text>`;
    const dates = m.matrix.map(r => `<div><span class="muted">${r.row}</span> ${dateCell(stationsOf(r)[f])}</div>`).join('');
    overlay.push(`<div class="ring-box" data-a="${a}">${dates}</div>`);
  }
  dirs.forEach((d, q) => overlay.push(
    `<div class="ring-dir" data-q="${q}"><span class="sw" style="background:${DIRS[d].swatch}"></span>${DIRS[d].name}</div>`));
  overlay.push(`<div class="ring-center" data-x="0" data-y="0"><span>central image</span><small>${R} rounds · clockwise</small></div>`);

  return `<div class="ring" data-rnode="${rNode}">
    <svg><defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--ink-2)"/></marker></defs><g class="ring-g">${g}</g></svg>
    ${overlay.join('')}
  </div>`;
}

function layoutRing(el) {
  if (!el) return;
  const rNode = Number(el.dataset.rnode), GAP = 10, MARGIN = 12;
  const rad = a => a * Math.PI / 180;

  // 1. stĺpce dátumov: odsunúť od kruhu podľa ich rozmerov v danom smere
  const boxes = [...el.querySelectorAll('.ring-box')].map(b => ({ el: b, a: Number(b.dataset.a), w: b.offsetWidth, h: b.offsetHeight }));
  const place = b => { b.x = b.r * Math.sin(rad(b.a)); b.y = -b.r * Math.cos(rad(b.a)); };
  boxes.forEach(b => {
    b.r = rNode + 28 + (b.w / 2) * Math.abs(Math.sin(rad(b.a))) + (b.h / 2) * Math.abs(Math.cos(rad(b.a)));
    place(b);
  });
  // 2. prekrývajúce sa stĺpce postupne odsúvať ďalej
  const hit = (p, q) => Math.abs(p.x - q.x) < (p.w + q.w) / 2 + GAP && Math.abs(p.y - q.y) < (p.h + q.h) / 2 + GAP;
  for (let it = 0; it < 300; it++) {
    let moved = false;
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++)
        if (hit(boxes[i], boxes[j])) { boxes[i].r += 5; boxes[j].r += 5; place(boxes[i]); place(boxes[j]); moved = true; }
    if (!moved) break;
  }

  // 3. nápisy strán za najvzdialenejšími stĺpcami
  const ext = { minX: -rNode - 24, maxX: rNode + 24, minY: -rNode - 24, maxY: rNode + 24 };
  boxes.forEach(b => {
    ext.minX = Math.min(ext.minX, b.x - b.w / 2); ext.maxX = Math.max(ext.maxX, b.x + b.w / 2);
    ext.minY = Math.min(ext.minY, b.y - b.h / 2); ext.maxY = Math.max(ext.maxY, b.y + b.h / 2);
  });
  const dirs = [...el.querySelectorAll('.ring-dir')].map(d => {
    const q = Number(d.dataset.q), w = d.offsetWidth, h = d.offsetHeight;
    const pos = [[0, ext.minY - 14 - h / 2], [ext.maxX + 16 + w / 2, 0], [0, ext.maxY + 14 + h / 2], [ext.minX - 16 - w / 2, 0]][q];
    return { el: d, x: pos[0], y: pos[1], w, h };
  });

  // 4. výseky svetových strán siahajú až k najvzdialenejšiemu rohu stĺpca
  let R2 = rNode + 60;
  boxes.forEach(b => {
    for (const sx of [-1, 1]) for (const sy of [-1, 1])
      R2 = Math.max(R2, Math.hypot(b.x + sx * b.w / 2, b.y + sy * b.h / 2) + 14);
  });

  // 5. plocha a posun počiatku
  let minX = -R2, maxX = R2, minY = -R2, maxY = R2;
  dirs.forEach(d => {
    minX = Math.min(minX, d.x - d.w / 2); maxX = Math.max(maxX, d.x + d.w / 2);
    minY = Math.min(minY, d.y - d.h / 2); maxY = Math.max(maxY, d.y + d.h / 2);
  });
  const ox = -minX + MARGIN, oy = -minY + MARGIN;
  const W = Math.ceil(maxX - minX + 2 * MARGIN), H = Math.ceil(maxY - minY + 2 * MARGIN);

  el.style.width = `${W}px`;
  el.style.height = `${H}px`;
  const svg = el.querySelector(':scope > svg');
  svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  el.querySelector('.ring-g').setAttribute('transform', `translate(${ox},${oy})`);

  const polar = (a, r) => [r * Math.sin(rad(a)), -r * Math.cos(rad(a))];
  el.querySelectorAll('.ring-sector').forEach(p => {
    const q = Number(p.dataset.q);
    const [x1, y1] = polar(-45 + 90 * q, R2), [x2, y2] = polar(45 + 90 * q, R2);
    p.setAttribute('d', `M0,0 L${x1},${y1} A${R2},${R2} 0 0 1 ${x2},${y2} Z`);
  });

  const put = (node, x, y) => { node.style.left = `${ox + x}px`; node.style.top = `${oy + y}px`; };
  boxes.forEach(b => put(b.el, b.x, b.y));
  dirs.forEach(d => put(d.el, d.x, d.y));
  el.querySelectorAll('[data-x]').forEach(n => put(n, Number(n.dataset.x), Number(n.dataset.y)));
}

// ── Krok: bohovia ────────────────────────────────────────────────────────────

function syncGods() {
  if (W.gods.length !== W.frames) W.gods = Array.from({ length: W.frames }, (_, i) => i % 2 === 0 ? '+' : '-');
}
const deityName = s => s === '+' ? (W.pos.trim() || 'Positive deity') : (W.neg.trim() || 'Negative deity');

function renderDeities() {
  syncGods();
  return `${head('Deities', 'Who are the two deities?')}
    <div class="wz-text">
      <p>A crossover almanac is one image with <b>two deities</b> — one benevolent, one malevolent.
      Each frame belongs to one of them, and the sequence of dates crosses back and forth between the two.</p>
      <p>By default the frames alternate: A to the positive deity, B to the negative, C to the positive, and so on.
      Click a frame to move it to the other deity.</p>
    </div>
    <div class="f-row wz-names">
      <label class="f"><span class="f-k">Positive deity <span class="opt">optional</span></span>
        <input type="text" value="${esc(W.pos)}" placeholder="e.g. Chaak" oninput="W.pos=this.value; drawCross()"></label>
      <label class="f"><span class="f-k">Negative deity <span class="opt">optional</span></span>
        <input type="text" value="${esc(W.neg)}" placeholder="e.g. God A" oninput="W.neg=this.value; drawCross()"></label>
    </div>
    <div class="wz-q">Frames</div>
    <div id="god-chips" class="god-chips"></div>
    <div class="btn-row">
      <button class="btn btn-sm" onclick="W.gods=[]; drawCross()">Alternate</button>
      <button class="btn btn-sm" onclick="W.gods=W.gods.map(g=>g==='+'?'-':'+'); drawCross()">Swap</button>
    </div>
    <div id="cross-preview" class="diagram"></div>
    ${nav()}`;
}

function toggleGod(i) { W.gods[i] = W.gods[i] === '+' ? '-' : '+'; drawCross(); }

function crossHTML(m) {
  syncGods();
  const seq = [];
  m.matrix.forEach(r => stationsOf(r).forEach((tz, f) =>
    seq.push({ idx: seq.length, row: r.row, frame: f, tz, dn: m.dns[f] })));
  const side = sign => {
    const list = seq.filter(st => W.gods[st.frame] === sign);
    return `<div class="god-col god-${sign === '+' ? 'pos' : 'neg'}">
      <div class="god-head">${esc(deityName(sign))} <span class="muted">· ${list.length} stations</span></div>
      <table class="arm-list">${list.map(st => `
        <tr><td class="seq-n">${st.idx + 1}</td><td class="muted">${st.row}${frameLetter(st.frame)}</td>
            <td>${dateCell(st.tz)}</td><td class="arm-dn">→ ${dnCell(st.dn)}</td></tr>`).join('')}</table></div>`;
  };
  const pos = W.gods.filter(g => g === '+').length;
  return `<div class="cross">
      ${side('+')}
      <div class="cross-center">
        <div class="cc-half cc-pos">${esc(deityName('+'))}</div>
        <div class="cc-half cc-neg">${esc(deityName('-'))}</div>
        <small>one image · ${pos} + / ${m.frames - pos} − frames</small>
      </div>
      ${side('-')}
    </div>
    <p class="diag-note">The numbers on the left give the reading order — follow them to see the sequence cross between the two deities.</p>`;
}

function drawCross() {
  const m = model();
  if (!m) return;
  syncGods();
  if ($('god-chips')) $('god-chips').innerHTML = W.gods.map((g, i) =>
    `<button class="god-chip ${g === '+' ? 'pos' : 'neg'}" onclick="toggleGod(${i})">${frameLetter(i)} ${g === '+' ? '+' : '−'}</button>`).join('');
  const host = $('cross-preview') || $('res-diagram');
  if (host) host.innerHTML = crossHTML(m);
  renderPreview();
}

// ── Krok: výsledok ───────────────────────────────────────────────────────────

function stationsOf(r) { return [r.start, ...r.cells.slice(0, -1).map(c => c.tz)]; }

function renderResult() {
  const m = model();
  if (!m) return `${head('Your almanac', 'Something is still missing')}${nav({ nextLabel: '' })}`;

  const letters = m.dns.map((_, f) => frameLetter(f));
  let table = `<table class="grid"><thead>
      <tr><th>${W.type === 'Circular' ? 'Round' : 'Row'}</th>${letters.map(l => `<th>Frame ${l}</th>`).join('')}</tr>
      <tr class="dn-head"><th class="dn-lab">DN</th>${m.dns.map(d => `<th>${dnCell(d)} <span class="dn-arrow">→</span></th>`).join('')}</tr>
    </thead><tbody>`;
  for (const r of m.matrix)
    table += `<tr><td class="c-row">${r.row}</td>${stationsOf(r).map((tz, f) =>
      `<td${f === 0 ? ' class="c-start"' : ''}>${dateCell(tz)}</td>`).join('')}</tr>`;
  table += `</tbody></table>`;

  const extra = W.type === 'Circular'
    ? `<div class="sum-k">Top of the circle</div><div class="sum-v">${DIRS[W.top].name}</div>`
    : W.type === 'Crossover'
    ? `<div class="sum-k">Deities</div><div class="sum-v">${esc(deityName('+'))} (+) · ${esc(deityName('-'))} (−)</div>` : '';

  return `
    <div class="wz-kicker">Step ${W.step + 1} of ${steps().length} · Done</div>
    <h2 class="wz-title">Your ${W.type.toLowerCase()} almanac</h2>
    <div class="status st-ok">The almanac is complete: ${m.rows} ${W.type === 'Circular' ? 'rounds' : 'rows'} × ${m.interval} days = 260,
      and after the last frame it returns to ${plainDate(m.start)}.</div>

    <div class="res-top">
      <div class="sum-grid">
        <div class="sum-k">Type</div><div class="sum-v">${m.type}</div>
        <div class="sum-k">Starts on</div><div class="sum-v">${plainDate(m.start)}</div>
        <div class="sum-k">Frames</div><div class="sum-v">${m.frames} (${letters[0]}–${letters[letters.length - 1]})</div>
        <div class="sum-k">${W.type === 'Circular' ? 'Rounds' : 'Rows'}</div><div class="sum-v">${m.rows} × ${m.interval} days</div>
        <div class="sum-k">Distance numbers</div><div class="sum-v">${m.dns.join(' + ')} = ${m.dnSum}</div>
        ${extra}
      </div>
      <div class="res-opts">
        <label class="f"><span class="f-k">Name <span class="opt">optional</span></span>
          <input type="text" value="${esc(W.name)}" placeholder="e.g. my almanac 1" oninput="W.name=this.value"></label>
        <label class="chk"><input type="checkbox" ${W.numerals ? 'checked' : ''} onchange="W.numerals=this.checked; render()"> Maya numerals (bar &amp; dot)</label>
        <label class="chk"><input type="checkbox" ${W.glyphs ? 'checked' : ''} onchange="W.glyphs=this.checked; render()"> Day glyphs from <code>glyphs/</code></label>
      </div>
    </div>

    <div id="res-diagram" class="diagram"></div>
    <div class="result">${table}</div>

    <div class="wz-nav no-print">
      <button class="btn" onclick="back()">← Back</button>
      <button class="btn" onclick="exportCSV()">↓ CSV</button>
      <button class="btn" onclick="copyTSV()">⧉ Copy for spreadsheet</button>
      <button class="btn" onclick="window.print()">⎙ Print / PDF</button>
      <button class="btn btn-primary" onclick="go(0)">＋ New almanac</button>
    </div>`;
}

// Kroky, ktoré po vykreslení dopĺňajú živý obsah
const STEP_AFTER = {
  dns:     () => updateDns(),
  circle:  () => {
    const m = model();
    if (!m) return;
    $('circle-preview').innerHTML = ringHTML(m);
    layoutRing($('circle-preview').querySelector('.ring'));
  },
  deities: () => drawCross(),
  result:  () => {
    const m = model();
    if (!m) return;
    if (W.type === 'Circular') {
      $('res-diagram').innerHTML = ringHTML(m);
      layoutRing($('res-diagram').querySelector('.ring'));
    }
    if (W.type === 'Crossover') $('res-diagram').innerHTML = crossHTML(m);
  },
};

const STEP_RENDER = {
  type: renderType, start: renderStart, frames: renderFrames, rows: renderRows,
  dns: renderDns, circle: renderCircle, deities: renderDeities, result: renderResult,
};

// ── Priebežný prehľad ────────────────────────────────────────────────────────

function renderPreview() {
  const pv = $('wz-preview');
  if (!pv || pv.hidden) return;
  const empty = '<span class="pv-empty">—</span>';
  const I = interval();
  const dnsTxt = W.dns.length && W.dns.some(Number.isInteger)
    ? W.dns.map(d => Number.isInteger(d) ? d : '_').join(' + ') + (I ? ` = ${dnSum()} / ${I}` : '')
    : empty;

  const m = model();
  const mini = m
    ? `<div class="pv-sub">First ${W.type === 'Circular' ? 'round' : 'row'}</div>
       <div class="pv-mini">${stationsOf(m.matrix[0]).map((tz, f) =>
         `<div><span class="muted">${frameLetter(f)}</span> ${plainDate(tz)}</div>`).join('')}</div>`
    : '';

  pv.innerHTML = `
    <div class="pv-title">Your almanac so far</div>
    <div class="pv-row"><span>Type</span><span>${W.type || empty}</span></div>
    <div class="pv-row"><span>Starts on</span><span>${W.coeff && W.day ? plainDate({ coeff: W.coeff, day: W.day }) : empty}</span></div>
    <div class="pv-row"><span>Frames</span><span>${W.frames || empty}</span></div>
    <div class="pv-row"><span>${W.type === 'Circular' ? 'Rounds' : 'Rows'}</span><span>${W.rows ? `${W.rows} × ${I} days` : empty}</span></div>
    <div class="pv-row pv-dns"><span>Distance numbers</span><span>${dnsTxt}</span></div>
    ${mini}`;
}

// ── Export ───────────────────────────────────────────────────────────────────

function exportRows() {
  const m = model();
  if (!m) return null;
  const rows = [['Type', m.type], ['Start', plainDate(m.start)], ['Shape', `${m.rows} x ${m.interval}`],
                ['Distance numbers', m.dns.join(' + ')]];
  if (W.type === 'Circular')  rows.push(['Top of circle', DIRS[W.top].name]);
  if (W.type === 'Crossover') rows.push(['Positive deity', deityName('+')], ['Negative deity', deityName('-')]);
  rows.push([]);

  const hd = [W.type === 'Circular' ? 'Round' : 'Row'];
  m.dns.forEach((_, f) => hd.push(`${frameLetter(f)} coeff.`, `${frameLetter(f)} day`, `DN ${frameLetter(f)}→`));
  if (W.type === 'Circular')  m.dns.forEach((_, f) => hd.push(`${frameLetter(f)} direction`));
  if (W.type === 'Crossover') { syncGods(); m.dns.forEach((_, f) => hd.push(`${frameLetter(f)} deity`)); }
  rows.push(hd);

  for (const r of m.matrix) {
    const row = [r.row];
    stationsOf(r).forEach((tz, f) => row.push(tz.coeff, tz.day, m.dns[f]));
    if (W.type === 'Circular')  m.dns.forEach((_, f) => row.push(DIRS[directionOfFrame(f, m.frames)].name));
    if (W.type === 'Crossover') m.dns.forEach((_, f) => row.push(deityName(W.gods[f])));
    rows.push(row);
  }
  return { rows, name: W.name.trim() || `${m.type.toLowerCase()}_${m.rows}x${m.interval}` };
}

function exportCSV() {
  const out = exportRows();
  if (!out) return;
  const csv = out.rows.map(r => r.map(c => {
    const s = String(c ?? '');
    return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `${out.name}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function copyTSV() {
  const out = exportRows();
  if (!out) return;
  try {
    await navigator.clipboard.writeText(out.rows.map(r => r.join('\t')).join('\n'));
    flash('Copied — paste straight into Excel or Numbers.');
  } catch {
    flash('Could not access the clipboard. Use the CSV button instead.');
  }
}

function flash(msg) {
  const el = document.createElement('div');
  el.className = 'flash';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

// ── Prepínanie častí: sprievodca / tabuľka P.21 (odkaz index.html#p21) ───────

function showView(view) {
  const v = view === 'p21' ? 'p21' : 'guide';
  $('guide-view').hidden = v !== 'guide';
  $('p21-view').hidden   = v !== 'p21';
  $('nav-guide').classList.toggle('active', v === 'guide');
  $('nav-p21').classList.toggle('active', v === 'p21');
  if (v === 'p21') renderP21(); else render();
  const hash = v === 'p21' ? '#p21' : '';
  if (location.hash !== hash) history.replaceState(null, '', location.pathname + location.search + hash);
}

document.addEventListener('DOMContentLoaded', () => showView(location.hash === '#p21' ? 'p21' : 'guide'));
window.addEventListener('hashchange', () => showView(location.hash === '#p21' ? 'p21' : 'guide'));
