// ─────────────────────────────────────────────────────────────────────────────
// Kalendárne jadro — tzolk'in, haab, kalendárny okruh, mayské číslice.
// Čisté funkcie bez vedľajších účinkov; nezávislé od UI.
// ─────────────────────────────────────────────────────────────────────────────

const DAYS = [
  'Imix', "Ik'", "Ak'bal", "K'an", 'Chikchan', 'Kimi', "Manik'", 'Lamat',
  'Muluk', 'Ok', 'Chuwen', 'Eb', 'Ben', 'Ix', 'Men', 'Kib', 'Kaban',
  "Etz'nab", 'Kawak', 'Ajaw',
];

// 18 mesiacov po 20 dní + Wayeb (5 dní) = 365
const HAAB = [
  'Pop', 'Wo', 'Sip', "Sotz'", 'Sek', 'Xul', "Yaxk'in", 'Mol', "Ch'en",
  'Yax', 'Sak', 'Keh', 'Mak', "K'ank'in", 'Muwan', 'Pax', "K'ayab",
  "Kumk'u", 'Wayeb',
];

const TZOLKIN = 260;
const HAAB_LEN = 365;
const CALENDAR_ROUND = 18980;   // lcm(260, 365)

const DAY_ALIASES = {
  "B'en": 'Ben', "Eb'": 'Eb', "Kab'an": 'Kaban', "Kib'": 'Kib', 'Ahaw': 'Ajaw',
  'Ik': "Ik'", 'Manik': "Manik'", "Muluk'": 'Muluk', "Etz'nab'": "Etz'nab",
  "Ak'b'al": "Ak'bal", "Akb'al": "Ak'bal", 'Chikkchan': 'Chikchan', 'Oc': 'Ok',
};

function normalizeDay(raw) {
  if (!raw) return null;
  if (DAYS.includes(raw)) return raw;
  return DAY_ALIASES[raw] || null;
}

const mod = (n, m) => ((n % m) + m) % m;

// ── Tzolk'in ─────────────────────────────────────────────────────────────────

// Pozícia 0..259 → { coeff 1-13, day }
function tzolkinAt(pos) {
  const p = mod(pos, TZOLKIN);
  return { coeff: mod(p, 13) + 1, day: DAYS[mod(p, 20)], pos: p };
}

// (koeficient, deň) → pozícia 0..259.
// CRT: pos ≡ (c-1) mod 13, pos ≡ di mod 20  →  pos = (di·221 + (c-1)·40) mod 260
function tzolkinPos(coeff, dayName) {
  const day = normalizeDay(dayName);
  const di = DAYS.indexOf(day);
  if (di === -1 || !Number.isInteger(coeff) || coeff < 1 || coeff > 13) return null;
  return mod(di * 221 + (coeff - 1) * 40, TZOLKIN);
}

const fmtTzolkin = t => `${t.coeff} ${t.day}`;

// ── Haab ─────────────────────────────────────────────────────────────────────

// Pozícia 0..364 → { day 0-19, month }
function haabAt(pos) {
  const p = mod(pos, HAAB_LEN);
  return { day: p % 20, month: HAAB[Math.floor(p / 20)], pos: p };
}

function haabPos(day, monthName) {
  const mi = HAAB.indexOf(monthName);
  if (mi === -1 || day < 0 || day > 19) return null;
  if (mi === 18 && day > 4) return null;          // Wayeb má len 5 dní
  return mi * 20 + day;
}

const fmtHaab = h => `${h.day} ${h.month}`;

// ── Kalendárny okruh ─────────────────────────────────────────────────────────

function crAt(tzStart, haabStart, offset) {
  return {
    tzolkin: tzolkinAt(tzStart + offset),
    haab: haabAt(haabStart + offset),
  };
}

const fmtCR = cr => `${fmtTzolkin(cr.tzolkin)} ${fmtHaab(cr.haab)}`;

// ── Súmerateľnosť ────────────────────────────────────────────────────────────

const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

// Koľkokrát treba obdobie P zopakovať, aby sa uzavrelo s cyklom C
const closesAfter = (P, C) => lcm(P, C) / P;

// Delitele 260 → možné dvojice (riadky × interval)
function divisorPairs(total) {
  const out = [];
  for (let r = 1; r <= total; r++) if (total % r === 0) out.push([r, total / r]);
  return out;
}

// ── Mayské číslice (bodky a čiarky) ──────────────────────────────────────────

// Jedna pozícia 0..19 ako SVG. Bodka = 1, čiarka = 5, mušľa = 0.
function barDotSVG(value, { color = 'currentColor', scale = 1 } = {}) {
  const v = Math.max(0, Math.min(19, Math.round(value)));
  const W = 26 * scale, dotR = 2.6 * scale, barH = 3.2 * scale, gap = 2.2 * scale;
  const bars = Math.floor(v / 5), dots = v % 5;

  if (v === 0) {
    return `<svg class="numeral" width="${W}" height="${9 * scale}" viewBox="0 0 ${W} ${9 * scale}">
      <ellipse cx="${W / 2}" cy="${4.5 * scale}" rx="${8 * scale}" ry="${4 * scale}"
               fill="none" stroke="${color}" stroke-width="${1.3 * scale}"/>
      <path d="M${W / 2 - 4 * scale} ${4.5 * scale} q${4 * scale} ${3 * scale} ${8 * scale} 0"
            fill="none" stroke="${color}" stroke-width="${1.1 * scale}"/></svg>`;
  }

  const rows = [];
  let y = 0;
  if (dots) {
    const spacing = dotR * 3;
    const startX = W / 2 - ((dots - 1) * spacing) / 2;
    for (let i = 0; i < dots; i++)
      rows.push(`<circle cx="${startX + i * spacing}" cy="${y + dotR}" r="${dotR}" fill="${color}"/>`);
    y += dotR * 2 + gap;
  }
  for (let i = 0; i < bars; i++) {
    rows.push(`<rect x="${2 * scale}" y="${y}" width="${W - 4 * scale}" height="${barH}" rx="${barH / 2}" fill="${color}"/>`);
    y += barH + gap;
  }
  const H = Math.max(y - gap, barH);
  return `<svg class="numeral" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${rows.join('')}</svg>`;
}

// Celé číslo v pozičnom zápise so základom 20, najvyšší rád hore.
function mayaNumberSVG(value, opts = {}) {
  const v = Math.max(0, Math.round(value));
  const digits = [];
  let n = v;
  do { digits.unshift(n % 20); n = Math.floor(n / 20); } while (n > 0);
  return `<span class="numstack">${digits.map(d => barDotSVG(d, opts)).join('')}</span>`;
}
