// ─────────────────────────────────────────────────────────────────────────────
// Parížsky kódex, strana 21 — tabuľka znakov dní a výpočet intervalov.
// Prevzaté z tzolkin_interval_calculator_final_EN.html; pozície v 260-dňovom
// cykle sa dopočítavajú z calendar.js (overené: všetkých 80 buniek sa zhoduje).
// Závisí od calendar.js a guide.js (W.glyphs, glyphSrc, esc, FUNDING).
// ─────────────────────────────────────────────────────────────────────────────

// Stĺpec: koeficient, skupina mien dní, 5 dní nad riadkom koeficientov, 5 pod ním
const P21_COLUMNS = [
  { coef: 1, grp: 'even', top: ['Imix', 'Muluk', 'Kaban', 'Chikchan', 'Ben'],     bottom: ["Manik'", 'Men', "Ak'bal", 'Chuwen', 'Kawak'] },
  { coef: 2, grp: 'even', top: ["Ak'bal", 'Kawak', 'Men', 'Chuwen', "Manik'"],    bottom: ['Muluk', 'Chikchan', 'Imix', 'Kaban', 'Ben'] },
  { coef: 3, grp: 'odd',  top: ['Kimi', "Ik'", "Etz'nab", 'Ix', 'Ok'],           bottom: ['Eb', 'Lamat', "K'an", 'Ajaw', 'Kib'] },
  { coef: 4, grp: 'odd',  top: ['Ok', 'Kimi', "Ik'", "Etz'nab", 'Ix'],           bottom: ['Kib', 'Eb', 'Lamat', "K'an", 'Ajaw'] },
  { coef: 5, grp: 'even', top: ['Men', 'Chuwen', "Manik'", "Ak'bal", 'Kawak'],    bottom: ['Imix', 'Kaban', 'Ben', 'Muluk', 'Chikchan'] },
  { coef: 6, grp: 'even', top: ['Imix', 'Muluk', 'Kaban', 'Chikchan', 'Ben'],     bottom: ["Manik'", 'Men', "Ak'bal", 'Chuwen', 'Kawak'] },
  { coef: 6, grp: 'even', top: ["Manik'", "Ak'bal", 'Kawak', 'Men', 'Chuwen'],    bottom: ['Ben', 'Muluk', 'Chikchan', 'Imix', 'Kaban'] },
  { coef: 7, grp: 'odd',  top: ['Ix', 'Ok', 'Kimi', "Ik'", "Etz'nab"],           bottom: ['Ajaw', 'Kib', 'Eb', 'Lamat', "K'an"] },
];
const P21_ROW_LABELS = ['R1', 'R2', 'R3', 'R4', 'R5', '', 'R7', 'R8', 'R9', 'R10', 'R11'];

const P21 = { pick: [] };   // vybrané bunky: { ci, ri }

// Bunka na riadku ri (0–10; riadok 5 = koeficienty)
function p21Cell(ci, ri) {
  const col = P21_COLUMNS[ci];
  if (ri === 5) return { type: 'coef', coef: col.coef };
  const day = ri < 5 ? col.top[ri] : col.bottom[ri - 6];
  return {
    type: 'day', ci, ri, day, coef: col.coef, grp: col.grp,
    seq: tzolkinPos(col.coef, day) + 1,           // poradie v 260 dňoch, 1 Imix = 1
    dayIdx: DAYS.indexOf(day),
  };
}

function renderP21() {
  let head = '<tr><th></th>' + P21_COLUMNS.map((_, i) => `<th>C${i + 1}</th>`).join('') + '</tr>';
  let body = '';
  for (let ri = 0; ri < 11; ri++) {
    body += `<tr><td class="p21-rowlab">${P21_ROW_LABELS[ri]}</td>`;
    for (let ci = 0; ci < P21_COLUMNS.length; ci++) {
      const c = p21Cell(ci, ri);
      if (c.type === 'coef') { body += `<td><div class="p21-cell coef">${c.coef}</div></td>`; continue; }
      const sel = P21.pick.findIndex(p => p.ci === ci && p.ri === ri);
      const glyph = W.glyphs
        ? `<img class="p21-gly" src="${glyphSrc(c.day)}" alt="" onerror="this.remove()">` : '';
      body += `<td><div class="p21-cell ${c.grp}${sel === 0 ? ' sel1' : sel === 1 ? ' sel2' : ''}" onclick="p21Click(${ci}, ${ri})">
        ${glyph}${c.coef} ${esc(c.day)}<small>pos ${c.seq}</small></div></td>`;
    }
    body += '</tr>';
  }

  $('p21-view').innerHTML = `
    <div class="p21-inner">
      <div class="wz-kicker">Paris Codex · page 21</div>
      <h2 class="wz-title">Tzolk'in calendar table P.21</h2>
      <div class="wz-text">
        <p>Column 7 = coefficient 6 (duplicate), Column 8 = coefficient 7 (hypothesis, starting day Ix).</p>
        <p>Click two dates to see the interval between them.</p>
      </div>

      <div class="p21-bar">
        <div class="p21-legend">
          <span><span class="swatch even"></span> First day-name group</span>
          <span><span class="swatch odd"></span> Second day-name group</span>
          <span><span class="swatch coef"></span> Coefficient</span>
        </div>
        <label class="chk"><input type="checkbox" ${W.glyphs ? 'checked' : ''} onchange="W.glyphs=this.checked; renderP21()"> Day glyphs</label>
      </div>

      <div class="p21-grid-wrap"><table class="p21-table">${head}${body}</table></div>

      <div class="p21-panel">
        <div class="p21-result">${p21ResultHTML()}</div>
        <div class="btn-row p21-controls">
          <button class="btn" onclick="P21.pick=[]; renderP21()">Clear selection</button>
          <button class="btn" onclick="P21.pick.reverse(); renderP21()" ${P21.pick.length === 2 ? '' : 'disabled'}>Swap A ↔ B</button>
        </div>
        <p class="p21-note">${p21NoteText()}</p>
      </div>
    </div>
    ${FUNDING}`;
}

function p21Click(ci, ri) {
  const i = P21.pick.findIndex(p => p.ci === ci && p.ri === ri);
  if (i >= 0) P21.pick.splice(i, 1);          // opätovný klik výber zruší
  else {
    if (P21.pick.length === 2) P21.pick.shift();
    P21.pick.push({ ci, ri });
  }
  renderP21();
}

const p21Fmt = c => `${c.coef} ${esc(c.day)}`;

function p21ResultHTML() {
  const [a, b] = P21.pick.map(p => p21Cell(p.ci, p.ri));
  if (!a) return `<p class="p21-hint">Click the first date…</p>`;
  if (!b) return `
    <div class="p21-chip a"><span class="lab">First date</span><span class="big">${p21Fmt(a)}</span><span class="sub">position ${a.seq}/260</span></div>
    <p class="p21-hint">…now click the second date</p>`;

  const fwd = mod(b.seq - a.seq, TZOLKIN), bwd = mod(a.seq - b.seq, TZOLKIN);
  const dnFwd = mod(b.dayIdx - a.dayIdx, 20), dnBwd = mod(a.dayIdx - b.dayIdx, 20);
  return `
    <div class="p21-chip a"><span class="lab">From (A)</span><span class="big">${p21Fmt(a)}</span><span class="sub">pos ${a.seq}</span></div>
    <span class="p21-arrow">→</span>
    <div class="p21-chip b"><span class="lab">To (B)</span><span class="big">${p21Fmt(b)}</span><span class="sub">pos ${b.seq}</span></div>
    <span class="p21-arrow">=</span>
    <div class="p21-chip int"><span class="lab">Interval A→B</span><span class="big">${fwd}</span><span class="sub">days (260-day cycle, with coefficient)</span></div>
    <div class="p21-chip"><span class="lab">Reverse B→A</span><span class="big mid">${bwd}</span><span class="sub">days</span></div>
    <div class="p21-chip dn"><span class="lab">Name order A→B</span><span class="big small">${dnFwd}</span><span class="sub">day name only, mod 20</span></div>
    <div class="p21-chip dn"><span class="lab">Name order B→A</span><span class="big small">${dnBwd}</span><span class="sub">day name only, mod 20</span></div>`;
}

function p21NoteText() {
  if (P21.pick.length < 2) return '';
  const [a, b] = P21.pick.map(p => p21Cell(p.ci, p.ri));
  const fwd = mod(b.seq - a.seq, TZOLKIN);
  if (fwd === 0) return `Both cells show the same date (${p21Fmt(a)}) — columns 6 and 7 share coefficient 6.`;
  return a.coef === b.coef
    ? `Both dates share coefficient ${a.coef} — the interval is a multiple of 13 (${fwd} = ${fwd / 13} × 13).`
    : `Different coefficients (${a.coef} vs ${b.coef}) — the interval reflects the coefficient change as well.`;
}
