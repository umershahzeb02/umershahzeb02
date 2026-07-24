/* Generates the animated node-graph hero for the GitHub profile README.
   Deterministic (seeded) so regenerating never reshuffles the layout.

   Everything is declarative: GitHub renders README SVGs as <img>, which runs
   CSS/SMIL animation but never scripts, so the motion has to live in the file. */

const W = 1200, H = 300;

// mulberry32 — small, fast, deterministic
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(20260724);

/* Poisson-ish scatter: jitter points on a loose grid, then reject any that land
   too close to an existing one. Gives an organic constellation instead of the
   visible rows a plain grid produces or the clumping pure random gives. */
const nodes = [];
const MIN_D = 54;
for (let gx = 0; gx < 18; gx++) {
  for (let gy = 0; gy < 6; gy++) {
    const x = 34 + gx * 68 + (rand() - 0.5) * 50;
    const y = 32 + gy * 50 + (rand() - 0.5) * 40;
    if (x < 28 || x > W - 26 || y < 26 || y > H - 26) continue;
    // Density ramps left to right, so the field thins out behind the name
    // instead of being uniformly scattered and fighting the type for attention.
    const keep = 0.06 + 0.94 * Math.pow(Math.max(0, (x - 150) / (W - 150)), 1.25);
    if (rand() > keep) continue;
    if (nodes.some(n => Math.hypot(n.x - x, n.y - y) < MIN_D)) continue;
    nodes.push({ x: +x.toFixed(1), y: +y.toFixed(1) });
  }
}

// Connect each node to its nearest few neighbours, deduped — a relationship
// graph reads as considered; every-pair reads as noise.
const edges = [];
const seen = new Set();
nodes.forEach((n, i) => {
  const near = nodes
    .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
    .filter(o => o.j !== i)
    .sort((a, b) => a.d - b.d)
    .slice(0, rand() < 0.42 ? 3 : 2);
  near.forEach(o => {
    if (o.d > 128) return;
    const key = i < o.j ? i + ':' + o.j : o.j + ':' + i;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ a: i, b: o.j, d: o.d });
  });
});

// A handful of nodes carry emphasis: larger, accent-filled, with a ping ring.
const hubs = nodes
  .map((n, i) => ({ i, x: n.x }))
  .filter(o => o.x > 430)
  .sort((a, b) => a.x - b.x)
  .filter((_, k) => k % 4 === 1)
  .slice(0, 5)
  .map(o => o.i);

const f = n => +n.toFixed(1);

/* Two lines per edge. The static hairline gives the graph its structure — a
   purely dashed edge nearly vanishes between dashes and the whole thing reads
   as loose dots. The dashed line rides on top as the moving signal. */
const edgeSvg = edges.map((e, k) => {
  const a = nodes[e.a], b = nodes[e.b];
  const dur = f(3.4 + (k % 7) * 0.55);
  const delay = f((k % 11) * 0.42);
  return `<line class="es" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`
       + `<line class="e" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" `
       + `style="animation-duration:${dur}s;animation-delay:-${delay}s"/>`;
}).join('\n    ');

// Packets travelling the longer edges — the graph reads as live, not decorative.
const flowSvg = edges
  .filter(e => e.d > 96)
  .filter((_, k) => k % 3 === 0)
  .slice(0, 9)
  .map((e, k) => {
    const a = nodes[e.a], b = nodes[e.b];
    const dur = f(4.6 + (k % 5) * 1.15);
    const delay = f(k * 0.83);
    return `<circle class="pk" r="3.6">`
         + `<animateMotion dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" `
         + `path="M${a.x},${a.y} L${b.x},${b.y}"/></circle>`;
  }).join('\n    ');

const nodeSvg = nodes.map((n, i) => {
  const hub = hubs.includes(i);
  const r = hub ? 7.6 : (i % 3 === 0 ? 5.2 : 4);
  const dur = f(4.2 + (i % 6) * 0.7);
  const delay = f((i % 9) * 0.5);
  return `<circle class="n${hub ? ' hub' : ''}" cx="${n.x}" cy="${n.y}" r="${r}" `
       + `style="animation-duration:${dur}s;animation-delay:-${delay}s"/>`;
}).join('\n    ');

const pingSvg = hubs.map((i, k) => {
  const n = nodes[i];
  return `<circle class="ping" cx="${n.x}" cy="${n.y}" r="7.6" `
       + `style="animation-duration:${f(5.5 + k * 0.9)}s;animation-delay:-${f(k * 1.7)}s"/>`;
}).join('\n    ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
  <title id="t">Shahzeb Umer</title>
  <desc id="d">The stack follows the problem. An animated network of nodes and connections.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070910"/>
      <stop offset="0.55" stop-color="#0b1020"/>
      <stop offset="1" stop-color="#0a1a2a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.74" cy="0.42" r="0.62">
      <stop offset="0" stop-color="#3b82f6" stop-opacity="0.20"/>
      <stop offset="0.55" stop-color="#22d3ee" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#070910" stop-opacity="0.97"/>
      <stop offset="0.34" stop-color="#070910" stop-opacity="0.88"/>
      <stop offset="0.62" stop-color="#070910" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#070910" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#60a5fa"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0.15"/>
    </linearGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.1" cy="1.1" r="1.1" fill="#8fa3c8" fill-opacity="0.07"/>
    </pattern>
    <clipPath id="card"><rect x="0" y="0" width="${W}" height="${H}" rx="16"/></clipPath>
  </defs>

  <style>
    .es{stroke:#7ba4e0;stroke-opacity:0.24;stroke-width:1.9;stroke-linecap:round}
    .e{stroke:#9fd0ff;stroke-opacity:0.62;stroke-width:2.6;stroke-linecap:round;
       stroke-dasharray:3 15;animation-name:flow;animation-timing-function:linear;
       animation-iteration-count:infinite}
    @keyframes flow{to{stroke-dashoffset:-72}}

    .n{fill:#cfdcf4;fill-opacity:0.6;animation-name:breathe;
       animation-timing-function:ease-in-out;animation-iteration-count:infinite}
    @keyframes breathe{0%,100%{fill-opacity:0.34}50%{fill-opacity:0.9}}

    .hub{fill:#7cc4ff;fill-opacity:0.95}
    .pk{fill:#8ad8ff;fill-opacity:0.92}

    /* stroke-opacity:0 is the resting state on purpose: where animating the CSS
       r property is unsupported, the ring stays invisible instead of freezing
       as a hard halo around every hub. */
    .ping{fill:none;stroke:#7cc4ff;stroke-width:2;stroke-opacity:0;
          animation-name:ping;animation-timing-function:cubic-bezier(0,0.5,0.5,1);
          animation-iteration-count:infinite}
    @keyframes ping{0%{r:7.6;stroke-opacity:0.6}70%,100%{r:42;stroke-opacity:0}}

    .name{font:600 44px ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Helvetica,Arial,sans-serif;
          fill:#f0f4fb;letter-spacing:-0.6px}
    .role{font:400 15.5px ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Helvetica,Arial,sans-serif;
          fill:#93a3bd;letter-spacing:0.1px}

    @media (prefers-reduced-motion:reduce){
      .e,.n,.ping{animation:none}
      .n{fill-opacity:0.55}
    }
  </style>

  <g clip-path="url(#card)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>

    <g>
    ${edgeSvg}
    </g>
    <g>
    ${pingSvg}
    </g>
    <g>
    ${nodeSvg}
    </g>
    <g>
    ${flowSvg}
    </g>

    <rect width="${W}" height="${H}" fill="url(#scrim)"/>

    <text class="name" x="62" y="140">Shahzeb Umer</text>
    <rect x="64" y="160" width="132" height="2" rx="1" fill="url(#rule)"/>
    <text class="role" x="64" y="192">The stack follows the problem.</text>
  </g>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="16"
        fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
</svg>
`;

require('fs').writeFileSync(process.argv[2], svg);
console.log('nodes', nodes.length, '| edges', edges.length, '| hubs', hubs.length,
            '| packets', flowSvg ? flowSvg.split('<circle').length - 1 : 0,
            '| bytes', Buffer.byteLength(svg));
