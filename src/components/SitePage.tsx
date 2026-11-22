import { lazy, Suspense, useEffect } from "react";
import PageBoundary from "./PageBoundary";
import ScrollPositionRestoration from "./ScrollPositionRestoration";
import { poems } from "../data/poetry";

const App = lazy(() => import("../App"));
const PublicationsPage = lazy(() => import("./PublicationsPage"));
const PoemPage = lazy(() => import("./PoemPage"));
const ImmortalCraftCaseStudy = lazy(() => import("./ImmortalCraftCaseStudy"));

const UnionCaseStudy = lazy(() => import("./UnionCaseStudy"));

const SITE_ORIGIN = "https://fearme.xyz";

function setMetaContent(selector: string, value: string) {
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", value);
}

export default function SitePage() {
  const pathname = window.location.pathname.replace(/[/]+$/, "") || "/";
  const isPublications = pathname === "/publications";
  const isPoetry = pathname === "/poetry" || pathname.startsWith("/poetry/");
  const isImmortalCaseStudy = pathname === "/work/immortal-craft";
  const isUnionCaseStudy = pathname === "/work/union-barbershop";
  const poem = poems.find((entry) => pathname === `/poetry/${entry.slug}`);

  useEffect(() => {
    // Canonical URLs always point at the public domain, even when a visitor
    // arrives via Vercel's default deployment address.
    const isKnownPage =
      pathname === "/" ||
      isPublications ||
      isImmortalCaseStudy ||
      isUnionCaseStudy ||
      Boolean(poem);
    const canonicalPath = isKnownPage ? pathname : "/";
    const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", canonicalUrl);
    setMetaContent('meta[property="og:url"]', canonicalUrl);

    if (!isKnownPage) {
      setMetaContent('meta[name="robots"]', "noindex, follow");
      return;
    }

    setMetaContent(
      'meta[name="robots"]',
      "index, follow, max-image-preview:large",
    );
    const title = isPublications
      ? "Publications | Daramola Femi"
      : poem
        ? `${poem.title} — Daramola Femi`
        : isUnionCaseStudy
          ? "Union Barbershop Case Study — Daramola Femi"
          : isImmortalCaseStudy
            ? "Immortal Craft Case Study — Daramola Femi"
            : "Daramola Femi | Software Engineer, Technical Writer & Poet";
    const description = isPublications
      ? "Poetry publication credits for Daramola Femi, also published as Femi Daramola and Daramola O. Femi, in The Dark Sire, Writers Space Africa, and Delicacies."
      : poem
        ? poem.seoDescription
        : isUnionCaseStudy
          ? "Union Barbershop: an editorial Next.js redesign by Daramola Femi, with expressive typography, photographic layouts, scroll animation, review stickers, and SQUIRE booking."
          : isImmortalCaseStudy
            ? "Immortal Craft: a barbershop website redesign case study by Daramola Femi."
            : "Daramola Femi is a software engineer, technical writer, and poet based in Nigeria. Explore selected software projects, documentation, and poetry.";

    if (isUnionCaseStudy) {
      document.title = title;
      setMetaContent('meta[name="description"]', description);
    }
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [pathname, poem, isImmortalCaseStudy, isPublications, isUnionCaseStudy]);

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
        {isPublications ? (
          <PublicationsPage />
        ) : isUnionCaseStudy ? (
          <UnionCaseStudy />
        ) : isImmortalCaseStudy ? (
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
