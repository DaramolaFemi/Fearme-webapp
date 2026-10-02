import { useEffect } from "react";
import { boySceneDesktop, boySceneMobile } from "../assets/poetry/boyScene";
import { wedSceneDesktop, wedSceneMobile } from "../assets/poetry/wedScene";
import { poems, type Poem } from "../data/poetry";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import PoemAtmosphere from "./PoemAtmosphere";

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
  const isMoonlit = poem?.slug === "the-boy-who-writes";
  const isDreams = poem?.slug === "dreams";
  const isGoodMourning = poem?.slug === "good-mourning";
  const isGraveyard = poem?.slug === "a-graveyard-for-lovers";
  const isWedMoonlit = poem?.slug === "he-took-the-one-i-wed";
  const hasEditorialScene =
    isMoonlit || isDreams || isGoodMourning || isGraveyard || isWedMoonlit;
  const editorialSceneDesktop = isGraveyard
    ? "/Images/poetry/graveyard-lovers-desktop.webp"
    : isGoodMourning
      ? "/Images/poetry/good-mourning-desktop.webp"
      : isDreams
      ? "/Images/poetry/dreams-desktop.webp"
      : isWedMoonlit
        ? wedSceneDesktop
        : boySceneDesktop;
  const editorialSceneMobile = isGraveyard
    ? "/Images/poetry/graveyard-lovers-mobile.webp"
    : isGoodMourning
      ? "/Images/poetry/good-mourning-mobile.webp"
      : isDreams
      ? "/Images/poetry/dreams-mobile.webp"
      : isWedMoonlit
        ? wedSceneMobile
        : boySceneMobile;

  return (
    <div
      className={`poem-reader-shell${hasEditorialScene ? " poem-reader-shell--moonlit" : ""}`}
    >
      <a className="skip-link" href="#main">
        Skip to poem
      </a>
      <header className="header poem-header poem-reader-header">
        <a className="wordmark" href="/" aria-label="Femi: home">
          <Logo />
        </a>
        <a className="poem-back" href="/#poetry">
          Selected poetry
        </a>
        <ThemeToggle />
      </header>
      <main
        id="main"
        className={`poem-page poem-page-editorial${hasEditorialScene ? " poem-page-moonlit" : ""}${isDreams ? " poem-page-dreams" : ""}${isGoodMourning ? " poem-page-good-mourning" : ""}${isGraveyard ? " poem-page-graveyard" : ""}${isWedMoonlit ? " poem-page-wed" : ""}`}
      >
        {hasEditorialScene && (
          <picture
            className={`poem-moonlit-scene${isDreams ? " poem-moonlit-scene--dreams" : ""}${isGoodMourning ? " poem-moonlit-scene--good-mourning" : ""}${isGraveyard ? " poem-moonlit-scene--graveyard" : ""}${isWedMoonlit ? " poem-moonlit-scene--wed" : ""}`}
            aria-hidden="true"
          >
            <source media="(max-width: 900px)" srcSet={editorialSceneMobile} />
            <img
              src={editorialSceneDesktop}
              alt=""
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />
          </picture>
        )}

        <PoemAtmosphere config={poem?.atmosphere} />

        {poem ? (
          <article className="poem-reading-layout">
            <header className="poem-reading-intro">
              <div className="poem-meta">
                <span>
                  {poem.id} / {String(poems.length).padStart(2, "0")}
                </span>
                <span>
                  {poem.form && `${poem.form} · `}
                  {poem.year}
                </span>
              </div>
              <h1
                className={
                  isMoonlit
                    ? "poem-title-moonlit"
                    : isGraveyard
                      ? "poem-title-graveyard"
                      : isWedMoonlit
                        ? "poem-title-wed"
                        : undefined
                }
              >
                {isMoonlit ? (
                  <>
                    <span className="poem-title-line">The Boy</span>{" "}
                    <span className="poem-title-line">Who Writes</span>
                  </>
                ) : isGraveyard ? (
                  <>
                    <span className="poem-title-line">A Graveyard</span>
                    <span className="poem-title-line">for Lovers</span>
                  </>
                ) : isWedMoonlit ? (
                  <>
                    <span className="poem-title-line">He Took</span>
                    <span className="poem-title-line">the One</span>
                    <span className="poem-title-line">I Wed</span>
                  </>
                ) : (
                  poem.title
                )}
              </h1>
            </header>

            <div className="poem-body">
              {poem.stanzas.map((stanza, stanzaIndex) => (
                <p key={stanzaIndex}>{stanza}</p>
              ))}
            </div>

            <aside className="poem-reading-aside">
              <footer className="poem-signature">
                <span className="poem-side-label">Written by</span>
                <p className="poem-byline">Daramola Femi, {poem.year}</p>
                {poem.publication && (
                  <p className="poem-publication">
                    {poem.publication.href ? (
                      <a href={poem.publication.href}>
                        {poem.publication.label}
                      </a>
                    ) : (
                      poem.publication.label
                    )}
                  </p>
                )}
              </footer>

              <nav className="poem-navigation" aria-label="Poem navigation">
                <span className="poem-side-label">Poetry navigation</span>
                {previous ? (
                  <a href={`/poetry/${previous.slug}`} rel="prev">
                    Previous poem
                  </a>
                ) : (
                  <span aria-disabled="true">Previous poem</span>
                )}
                <a href="/#poetry">Back to selected poetry</a>
                {next ? (
                  <a href={`/poetry/${next.slug}`} rel="next">
                    Next poem
                  </a>
                ) : (
                  <span aria-disabled="true">Next poem</span>
                )}
              </nav>
            </aside>
          </article>
        ) : (
          <div className="poem-reading-not-found">
            <h1>Poem not found</h1>
            <a className="text-link" href="/#poetry">
              Back to selected poetry
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
