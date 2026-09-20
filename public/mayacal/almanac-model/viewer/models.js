// ─────────────────────────────────────────────────────────────────────────────
// Model — konštrukcia almanachov.
// Závisí len od calendar.js.
// ─────────────────────────────────────────────────────────────────────────────

// Typy, ktoré nástroj vytvára. Aritmetika je u všetkých rovnaká — overené na
// korpuse mayacodices.org (crossover 24/24, circular 38/45, standard 181/188).
const ALMANAC_TYPES = ['Standard', 'Circular', 'Crossover'];

// ── Almanach ─────────────────────────────────────────────────────────────────
//
//   Almanach := { R riadkov, interval I, počiatok (koeficient, deň), rámce [DN] }
//
//   R × I = 260·k      almanach sa uzavrie do tzolk'inu
//   Σ DNᵢ = I          rámce vyplnia jeden riadok
//   DNᵢ ≥ 1
//
// Riadok r začína na  start + r·I;  rámec f v riadku na  start + r·I + ΣDN₁..f

function buildAlmanac({ rows, interval, startCoeff, startDay, dns, type = 'Standard', name = '' }) {
  const errors = [], warnings = [];

  const R = Number(rows), I = Number(interval);
  const list = (dns || []).map(Number);

  if (!Number.isInteger(R) || R < 1) errors.push('Number of rows must be a whole number ≥ 1.');
  if (!Number.isInteger(I) || I < 1) errors.push('Interval must be a whole number ≥ 1.');

  const startPos = tzolkinPos(startCoeff, startDay);
  if (startPos === null) errors.push('Starting date is not a valid tzolk\'in date.');

  if (list.length === 0) errors.push('Add at least one distance number.');
  if (list.some(d => !Number.isInteger(d) || d < 1)) errors.push('Every distance number must be a whole number ≥ 1.');

  const dnSum = list.reduce((a, b) => a + b, 0);
  const total = R * I;

  if (errors.length === 0) {
    if (dnSum !== I)
      errors.push(`Distance numbers sum to ${dnSum}, but the interval is ${I}. They must match.`);
    if (total % TZOLKIN !== 0)
      errors.push(`${R} × ${I} = ${total} days, which is not a whole number of tzolk'in rounds (260). ` +
                  `Nearest valid intervals for ${R} rows: ${suggestIntervals(R).join(', ') || '—'}.`);
  }

  if (errors.length) return { valid: false, errors, warnings };

  const cycles = total / TZOLKIN;
  if (cycles > 1) warnings.push(`This almanac runs ${cycles} tzolk'in rounds (${total} days) before it closes.`);

  // Matica: riadky × rámce
  const matrix = [];
  for (let r = 0; r < R; r++) {
    const rowBase = startPos + r * I;
    const cells = [];
    let acc = 0;
    for (let f = 0; f < list.length; f++) {
      acc += list[f];
      // rámec f je stanica dosiahnutá po DN₁..f; prvá stanica je samotný počiatok riadku
      cells.push({
        frame: f + 1,
        dn: list[f],
        offset: rowBase + acc,
        tz: tzolkinAt(rowBase + acc),
      });
    }
    matrix.push({
      row: r + 1,
      start: tzolkinAt(rowBase),
      startOffset: mod(rowBase, TZOLKIN),
      cells,
    });
  }

  // Kontrola uzavretia: posledná stanica posledného riadku + posledné DN = počiatok
  const closing = tzolkinAt(startPos + total);
  const closes = closing.pos === mod(startPos, TZOLKIN);

  return {
    valid: true, errors, warnings,
    name, type,
    rows: R, interval: I, frames: list.length,
    dns: list, dnSum,
    start: tzolkinAt(startPos),
    totalDays: total, cycles,
    closes, closing,
    matrix,
  };
}

// Pre daný počet riadkov: aké intervaly dávajú celý násobok 260?
function suggestIntervals(rows, maxCycles = 3) {
  const out = [];
  for (let k = 1; k <= maxCycles; k++) {
    const t = TZOLKIN * k;
    if (t % rows === 0) out.push(t / rows);
  }
  return out;
}

// Dvojice (riadky × interval), ktoré dávajú presne 260
const ALMANAC_SHAPES = divisorPairs(TZOLKIN);

// Rovnomerné rozdelenie intervalu na n rámcov (zvyšok sa rozloží po jednom)
function splitInterval(interval, frames) {
  const n = Math.max(1, Math.round(frames));
  const base = Math.floor(interval / n);
  let rest = interval - base * n;
  return Array.from({ length: n }, () => base + (rest-- > 0 ? 1 : 0));
}
