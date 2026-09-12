import { lazy, Suspense } from "react";
import PageBoundary from "./PageBoundary";
import { poems } from "../data/poetry";

const App = lazy(() => import("../App"));
const PoemPage = lazy(() => import("./PoemPage"));

export default function SitePage() {
  const pathname = window.location.pathname.replace(/\/+$/, "");
  const isPoetry = pathname === "/poetry" || pathname.startsWith("/poetry/");
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
        {isPoetry ? <PoemPage poem={poem} /> : <App />}
      </Suspense>
    </PageBoundary>
  );
}
