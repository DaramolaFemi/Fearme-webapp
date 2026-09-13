import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./style.css";
import "./mobile-cta-fixes.css";
import "./poetry-index-refine.css";
import SitePage from "./components/SitePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SitePage />
  </React.StrictMode>,
);
