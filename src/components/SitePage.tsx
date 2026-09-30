import { lazy, Suspense } from "react";
import PageBoundary from "./PageBoundary";
import BackToTop from "./BackToTop";
import { poems } from "../data/poetry";

const App = lazy(() => import("../App"));
const PoemPage = lazy(() => import("./PoemPage"));
const ImmortalCraftCaseStudy = lazy(() => import("./ImmortalCraftCaseStudy"));

export default function SitePage() {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  const isPoetry = pathname === "/poetry" || pathname.startsWith("/poetry/");
  const isImmortalCaseStudy = pathname === "/work/immortal-craft";
  const poem = poems.find((entry) => pathname === `/poetry/${entry.slug}`);
  return (
    <PageBoundary>
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
      <BackToTop />
    </PageBoundary>
  );
}
