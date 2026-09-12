const paths = {
  left: "M19 12H5M9.5 7.5L5 12L9.5 16.5",
  out: "M5.5 18.5H18.5M18.5 18.5V5.5M18.5 5.5L12 12",
  down: "M12 5V19M7.5 14.5L12 19L16.5 14.5",
  right: "M5 12H19M14.5 7.5L19 12L14.5 16.5",
  up: "M12 19V5M7.5 9.5L12 5L16.5 9.5",
};

export default function Arrow({
  direction = "out",
}: {
  direction?: keyof typeof paths;
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
        d={paths[direction]}
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
