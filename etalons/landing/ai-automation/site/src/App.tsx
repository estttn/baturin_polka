import { BG_VIDEO } from "./constants";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { RepostButton } from "./components/RepostButton";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { Services } from "./components/Services";
import { Statement } from "./components/Statement";

export default function App() {
  return (
    <div style={{ position: "relative" }}>
      <video
        src={BG_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      <Navbar />
      <Hero />
      <Statement />
      <Services />
      <ScrollIndicator />
      <RepostButton />
    </div>
  );
}
