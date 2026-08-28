export function RepostButton() {
  return (
    <button
      type="button"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "rgba(0,0,0,0.8)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
        background: "transparent",
        border: "none",
        padding: 0,
        fontFamily: "inherit",
      }}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      REPOST
    </button>
  );
}
