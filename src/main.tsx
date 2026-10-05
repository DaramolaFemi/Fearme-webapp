import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/literata/latin-400.css";
import "@fontsource/literata/latin-400-italic.css";
import "./style.css";
import "./mobile-cta.css";
import "./poetry-index.css";
import "./desktop-project-cta.css";
import "./desktop-arrows.css";
import "./back-to-top.css";
import "./mobile-identity.css";
import "./desktop-identity.css";
import "./project-cards-editorial.css";
import "./hero-editorial.css";
import "./hero-celestial.css";
import "./poem-reader-editorial.css";
import SitePage from "./components/SitePage";
import { LanguageProvider } from "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <SitePage />
    </LanguageProvider>
  </React.StrictMode>,
);
