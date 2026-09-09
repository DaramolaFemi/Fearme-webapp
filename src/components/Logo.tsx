/** Bespoke vector lettering: the open e, shared m stems, and offset i echo the cut F mark. */
export default function Logo({ markOnly = false }: { markOnly?: boolean }) {
  return (
    <svg
      className={markOnly ? "logo-mark" : "logo"}
      viewBox={markOnly ? "0 0 48 48" : "0 0 170 48"}
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 44V4h36L30 14H15v8h18L23 32h-8v12H4Z" fill="currentColor" />
      <path d="m27 34 13-13v13L27 47V34Z" fill="var(--accent)" />
      {!markOnly && (
        <g
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        >
          <path d="M61 36V15q0-8 9-8h3M56 20h17M99 31q-3 6-10 6-10 0-10-10 0-10 10-10t10 10H80M109 36V18m0 7q0-8 7-8t7 8v11m0-11q0-8 7-8t7 8v11M149 19v17" />
          <path d="m147 8 4-4" stroke="var(--accent)" />
        </g>
      )}
    </svg>
  );
}
