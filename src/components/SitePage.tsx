import { lazy, Suspense, useEffect } from "react";
import PageBoundary from "./PageBoundary";
import ScrollPositionRestoration from "./ScrollPositionRestoration";
import { poems } from "../data/poetry";

const App = lazy(() => import("../App"));
const PoemPage = lazy(() => import("./PoemPage"));
const ImmortalCraftCaseStudy = lazy(() => import("./ImmortalCraftCaseStudy"));

const SITE_ORIGIN = "https://fearme.xyz";

function setMetaContent(selector: string, value: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
}

export default function SitePage() {
  const pathname = window.location.pathname.replace(/[/]+$/, "") || "/";
  const isPoetry = pathname === "/poetry" || pathname.startsWith("/poetry/");
  const isImmortalCaseStudy = pathname === "/work/immortal-craft";
  const poem = poems.find((entry) => pathname === `/poetry/${entry.slug}`);

  useEffect(() => {
    // Canonical URLs always point at the public domain, even when a visitor
    // arrives via Vercel's default deployment address.
    const isKnownPage = pathname === "/" || isImmortalCaseStudy || Boolean(poem);
    const canonicalPath = isKnownPage ? pathname : "/";
    const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    setMetaContent('meta[property="og:url"]', canonicalUrl);

    if (!isKnownPage) {
      setMetaContent('meta[name="robots"]', "noindex, follow");
      return;
    }

    setMetaContent('meta[name="robots"]', "index, follow, max-image-preview:large");
    const title = poem
      ? `${poem.title} — Daramola Femi`
      : isImmortalCaseStudy
        ? "Immortal Craft Case Study — Daramola Femi"
        : "Daramola Femi: Code with intent. Words with weight.";
    const description = poem
      ? `${poem.title}, a poem by Daramola Femi.`
      : isImmortalCaseStudy
        ? "Immortal Craft: a barbershop website redesign case study by Daramola Femi."
        : "Selected work in software engineering, interfaces, and technical documentation.";

    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [pathname, poem, isImmortalCaseStudy]);

  return (
    <PageBoundary>
      <ScrollPositionRestoration />
      <Suspense
        fallback={
          <main className="poem-page" role="status">
            Loading…
          </main>
        }
      >
        {isImmortalCaseStudy ? (
          <ImmortalCraftCaseStudy />
        ) : isPoetry ? (
          <PoemPage poem={poem} />
        ) : (
          <App />
        )}
      </Suspense>
    </PageBoundary>
  );
}
