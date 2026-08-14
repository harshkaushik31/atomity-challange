/**
 * Generates an SVG path `d` string for a regular N-sided polygon,
 * optionally with rounded corners. A plain <polygon points="..."> can't
 * round corners — that requires replacing each sharp vertex with a
 * curve between two points pulled back along the adjacent edges.
 *
 * Pass cornerRadius=0 for sharp corners (a plain straight-edge polygon,
 * e.g. the outer heptagon boundary); pass a positive value for the
 * rounded-corner look (e.g. the small cluster hexagons).
 */

type Point = [number, number];

function sub(a: Point, b: Point): Point {
  return [a[0] - b[0], a[1] - b[1]];
}

function add(a: Point, b: Point): Point {
  return [a[0] + b[0], a[1] + b[1]];
}

function scale(v: Point, s: number): Point {
  return [v[0] * s, v[1] * s];
}

function normalize(v: Point): Point {
  const len = Math.hypot(v[0], v[1]);
  return len === 0 ? [0, 0] : [v[0] / len, v[1] / len];
}

function polygonVertices(
  cx: number,
  cy: number,
  r: number,
  sides: number,
  rotationDeg: number
): Point[] {
  const rotation = (rotationDeg * Math.PI) / 180;
  return Array.from({ length: sides }, (_, i) => {
    const angle = rotation + ((Math.PI * 2) / sides) * i;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as Point;
  });
}

/**
 * @param sides number of sides — 6 for a hexagon, 7 for a heptagon, etc.
 * @param cornerRadius how far each corner is pulled back before
 * curving; 0 gives sharp corners. Keep well under half the edge length
 * or adjacent corners will overlap and distort the shape.
 * @param rotationDeg rotates the whole polygon; -90 puts a vertex at
 * the top (point-up), 0 for the default flat-right-vertex orientation.
 */
export function roundedPolygonPath(
  cx: number,
  cy: number,
  r: number,
  sides: number,
  cornerRadius: number,
  rotationDeg = -90
): string {
  const points = polygonVertices(cx, cy, r, sides, rotationDeg);
  const n = points.length;

  if (cornerRadius <= 0) {
    // Sharp corners — just connect the vertices directly.
    const [first, ...rest] = points;
    const commands = [
      `M ${first[0].toFixed(2)} ${first[1].toFixed(2)}`,
      ...rest.map((p) => `L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`),
      "Z",
    ];
    return commands.join(" ");
  }

  const segments: string[] = [];

  for (let i = 0; i < n; i++) {
    const curr = points[i];
    const prev = points[(i - 1 + n) % n];
    const next = points[(i + 1) % n];

    const towardPrev = normalize(sub(prev, curr));
    const towardNext = normalize(sub(next, curr));

    const cornerStart = add(curr, scale(towardPrev, cornerRadius));
    const cornerEnd = add(curr, scale(towardNext, cornerRadius));

    segments.push(
      i === 0
        ? `M ${cornerStart[0].toFixed(2)} ${cornerStart[1].toFixed(2)}`
        : `L ${cornerStart[0].toFixed(2)} ${cornerStart[1].toFixed(2)}`
    );
    // Quadratic curve using the original sharp vertex as the control
    // point — this is what produces the rounded corner.
    segments.push(
      `Q ${curr[0].toFixed(2)} ${curr[1].toFixed(2)} ${cornerEnd[0].toFixed(2)} ${cornerEnd[1].toFixed(2)}`
    );
  }

  segments.push("Z");
  return segments.join(" ");
}