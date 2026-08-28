import { FadeUp } from "./FadeUp";

const btnBase = {
  borderRadius: 9999,
  padding: "12px 36px",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  border: "1px solid #1a1a1a",
};

export function Hero() {
  return (
    <section style={{ position: "relative", zIndex: 1, height: "100vh" }}>
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "48%",
          background: "#C5C5C5",
          display: "flex",
          flexDirection: "column",
          paddingTop: 70,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            padding: "0 32px 24px 32px",
          }}
        >
          <div
            className="hero-row"
            style={{
              display: "flex",
              alignItems: "stretch",
              width: "100%",
              gap: 48,
            }}
          >
            <div
              className="hero-col-left"
              style={{
                width: "32%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 80,
              }}
            >
              <FadeUp
                as="h1"
                delay={0.1}
                style={{
                  margin: 0,
                  fontSize: "clamp(26px, 3vw, 42px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  color: "#1a1a1a",
                  whiteSpace: "pre-line",
                }}
              >
                {"SCALING\nFASTER USING AI"}
              </FadeUp>

              <FadeUp
                delay={0.5}
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#666",
                }}
              >
                001 / 005
              </FadeUp>
            </div>

            <div
              className="hero-col-right"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 80,
              }}
            >
              <FadeUp
                as="p"
                delay={0.25}
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#5a5a5a",
                  maxWidth: 340,
                }}
              >
                We engineer custom automation flows and personalized AI products
                for ambitious modern businesses.
              </FadeUp>

              <FadeUp delay={0.4}>
                <div
                  className="hero-buttons"
                  style={{ display: "flex", gap: 10 }}
                >
                  <button
                    type="button"
                    className="btn-primary"
                    style={{
                      ...btnBase,
                      background: "#1a1a1a",
                      color: "#fff",
                    }}
                  >
                    BOOK A CALL!
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{
                      ...btnBase,
                      background: "transparent",
                      color: "#1a1a1a",
                    }}
                  >
                    OUR PRODUCTS
                  </button>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>

      <FadeUp
        className="hero-bottom-text"
        delay={0.6}
        style={{
          position: "absolute",
          top: "74%",
          transform: "translateY(-50%)",
          left: 32,
          maxWidth: 260,
          fontSize: 14,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.9)",
        }}
      >
        Guiding future-minded companies forward with bespoke AI products and
        streamlined workflows.
      </FadeUp>
    </section>
  );
}
