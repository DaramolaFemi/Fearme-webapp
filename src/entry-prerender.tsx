import { renderToString } from "react-dom/server";
import App from "./App";
import PoemPage from "./components/PoemPage";
import PublicationsPage from "./components/PublicationsPage";
import ImmortalCraftCaseStudy from "./components/ImmortalCraftCaseStudy";
import { LanguageProvider } from "./i18n";
import { poems } from "./data/poetry";

export function renderPage(pathname: string) {
  const poem = poems.find((entry) => pathname === `/poetry/${entry.slug}`);
  const page = pathname === "/" ? <App />
    : pathname === "/publications" ? <PublicationsPage />
    : pathname === "/work/immortal-craft" ? <ImmortalCraftCaseStudy />
    : poem ? <PoemPage poem={poem} /> : null;
  if (!page) throw new Error(`Unknown prerender route: ${pathname}`);
  // Animation starting positions must not hide text when JavaScript is unavailable.
  // The unchanged client entry mounts the interactive application normally.
  return renderToString(<LanguageProvider>{page}</LanguageProvider>)
    .replace(/opacity:0(?=[;" ])/g, "opacity:1")
    .replace(/transform:[^";]+/g, "transform:none")
    // The existing email link works without JS. Keep the JS-only form inert
    // until React mounts so personal messages cannot become URL parameters.
    .replace(/<form\b/g, '<form inert=""');
}
