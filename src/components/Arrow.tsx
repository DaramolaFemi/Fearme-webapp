export default function Arrow({
  direction = "out",
}: {
  direction?: "out" | "down" | "up";
}) {
  return (
    <svg
      className={`direction-arrow arrow-${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={
          direction === "down"
            ? "M8 4c0 5 4 5 4 10v6m-5-5 5 5 5-5"
            : direction === "up"
              ? "M8 20c0-5 4-5 4-10V4m-5 5 5-5 5 5"
              : "M5 19c7 0 5-8 14-14M10 5h9v9"
        }
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
