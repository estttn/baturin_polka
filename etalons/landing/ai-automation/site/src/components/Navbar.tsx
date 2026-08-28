import { FadeUp } from "./FadeUp";
import { NAV_CENTER, NAV_RIGHT } from "../constants";

const linkStyle = {
  fontSize: 11,
  letterSpacing: "0.06em",
  color: "#1a1a1a",
  fontWeight: 400,
  textDecoration: "none",
} as const;

export function Navbar() {
  return (
    <nav
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        background: "transparent",
        borderBottom: "1px solid rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
      }}
    >
      <FadeUp
        as="span"
        className="nav-brand"
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#1a1a1a",
        }}
      >
        COGNITRA
      </FadeUp>

      <div className="nav-links" style={{ display: "flex", gap: 48 }}>
        {NAV_CENTER.map((label, i) => (
          <FadeUp key={label} as="span" delay={0.05 + i * 0.05}>
            <a className="nav-link" href="#" style={linkStyle}>
              {label}
            </a>
          </FadeUp>
        ))}
      </div>

      <div
        className="nav-links nav-links-secondary"
        style={{ display: "flex", gap: 48 }}
      >
        {NAV_RIGHT.map((label, i) => (
          <FadeUp key={label} as="span" delay={0.3 + i * 0.05}>
            <a className="nav-link" href="#" style={linkStyle}>
              {label}
            </a>
          </FadeUp>
        ))}
      </div>
    </nav>
  );
}
