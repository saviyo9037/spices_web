// Organic torn-paper edge. Deterministic, so server and client markup match.
// `fill` is the colour of the section that is "tearing" into the next one.
// position="bottom": sits on the bottom of a section (the torn edge faces down).
// position="top": sits on the top of a section (the previous section's colour bleeds down).
function buildPath(seed) {
  const W = 1440;
  const pts = [];
  for (let x = 0; x <= W; x += 18) {
    const n =
      Math.sin(x * 0.011 + seed) * 9 +
      Math.sin(x * 0.047 + 1.3 + seed * 2) * 7 +
      Math.sin(x * 0.19 + 0.4 + seed) * 4 +
      Math.sin(x * 0.53 + seed) * 2.5;
    pts.push(`${x},${(46 + n).toFixed(1)}`);
  }
  return pts;
}

export default function TornEdge({ fill = "#FFFFFF", position = "bottom", seed = 0, className = "" }) {
  const pts = buildPath(seed);
  const firstY = pts[0].split(",")[1];
  const lastY = pts[pts.length - 1].split(",")[1];

  // Extend 20 units beyond viewBox boundaries (top -20 or bottom 120, and sides -10 to 1450)
  // to prevent any sub-pixel antialiasing edge / grey seam artifacts when rasterized.
  const d =
    position === "bottom"
      ? `M-10,120 L-10,${firstY} L${pts.join(" L")} L1450,${lastY} L1450,120 Z`
      : `M-10,-20 L-10,${firstY} L${pts.join(" L")} L1450,${lastY} L1450,-20 Z`;

  // -bottom-[2px] / -top-[2px] ensures a 2px overlap across section boundaries to eliminate hairline gaps
  const pos = position === "bottom" ? "-bottom-[2px]" : "-top-[2px]";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      shapeRendering="geometricPrecision"
      className={`pointer-events-none absolute left-0 z-[5] h-[40px] w-full sm:h-[60px] ${pos} ${className}`}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}
