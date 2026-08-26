import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// StrictMode is intentionally omitted: its dev-only double-mount duplicates
// the GSAP ScrollTrigger pins and timelines created in mount effects,
// leaving orphaned pin spacers that break the page layout.
createRoot(document.getElementById("root")!).render(<App />);
