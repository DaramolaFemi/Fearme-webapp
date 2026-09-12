import Arrow from "./Arrow";
import { useEffect } from "react";
import { poems, type Poem } from "../data/poetry";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function PoemPage({ poem }: { poem?: Poem }) {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content") ?? "";
    document.title = `${poem?.title ?? "Poem not found"} — Daramola Femi`;
    description?.setAttribute(
      "content",
      poem ? `${poem.title}, a poem by Daramola Femi.` : "Poem not found.",
    );
    return () => {
      document.title = previousTitle;
      description?.setAttribute("content", previousDescription);
    };
  }, [poem]);
  const index = poems.findIndex((entry) => entry.slug === poem?.slug);
  const previous = poems[index - 1];
  const next = poems[index + 1];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to poem
      </a>
      <header className="header poem-header">
        <a className="wordmark" href="/" aria-label="Femi: home">
          <Logo />
        </a>
        <a className="poem-back" href="/#poetry">
          <Arrow direction="left" /> Selected poetry
        </a>
        <ThemeToggle />
      </header>
      <main id="main" className="poem-page">
        {poem ? (
          <>
            <div className="poem-meta">
              <span>{poem.id} / 07</span>
              <span>
                {poem.form && `${poem.form} · `}
                {poem.year}
              </span>
            </div>
            <h1>{poem.title}</h1>
            <div className="poem-body">
              {poem.stanzas.map((stanza, stanzaIndex) => (
                <p key={stanzaIndex}>{stanza}</p>
              ))}
            </div>
            <footer className="poem-signature">
              <p>Daramola Femi, {poem.year}</p>
              {poem.publication && (
                <p className="poem-publication">
                  {poem.publication.href ? (
                    <a href={poem.publication.href}>{poem.publication.label}</a>
                  ) : (
                    poem.publication.label
                  )}
                </p>
              )}
            </footer>
            <nav className="poem-navigation" aria-label="Poem navigation">
              {previous ? (
                <a href={`/poetry/${previous.slug}`} rel="prev">
                  <Arrow direction="left" /> Previous poem
                </a>
              ) : (
                <span aria-disabled="true">Previous poem</span>
              )}
              <a href="/#poetry">Back to selected poetry</a>
              {next ? (
                <a href={`/poetry/${next.slug}`} rel="next">
                  Next poem <Arrow direction="right" />
                </a>
              ) : (
                <span aria-disabled="true">Next poem</span>
              )}
            </nav>
          </>
        ) : (
          <>
            <h1>Poem not found</h1>
            <a className="text-link" href="/#poetry">
              Back to selected poetry
            </a>
          </>
        )}
      </main>
    </>
  );
}
