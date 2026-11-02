import { MOUNTAIN_RIDGE_BOTTOM, MOUNTAIN_RIDGE_TOP } from "./MountainRidgePath";

export default function MountainDivider({
  position = "top",
  fill = "#FFFFFF",
  className = "",
}) {
  const isTop = position === "top";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 z-20 w-full h-10 sm:h-14 lg:h-18 ${
        isTop ? "-top-px" : "-bottom-px"
      } ${className}`}
    >
      <path d={isTop ? MOUNTAIN_RIDGE_BOTTOM : MOUNTAIN_RIDGE_TOP} fill={fill} />
    </svg>
  );
}

