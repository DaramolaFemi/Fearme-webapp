import { useEffect } from "react";
import publications from "../data/publications.json";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import "../publications.css";

export default function PublicationsPage() {
  useEffect(() => {
    document.title = "Publications | Daramola Femi";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Poetry publication credits for Daramola Femi, also published as Femi Daramola and Daramola O. Femi, in The Dark Sire, Writers Space Africa, and Delicacies.",
      );
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to publications
      </a>
      <header className="header">
        <a className="wordmark" href="/" aria-label="Femi: home">
          <Logo />
        </a>
        <div className="publications-header-actions">
          <a className="text-link" href="/#poetry">
            Back to poetry
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main id="main" className="publications-page" lang="en">
        <div className="section-kicker">
          <span>Poetry / Publication record</span>
        </div>
        <h1>Publications</h1>
        <p className="publications-intro">
          I’m Daramola Femi, a software engineer, technical writer, and poet
          based in Nigeria. My poetry has also been published under the names
          Femi Daramola and Daramola O. Femi. These credits bring that work
          together in one place.
        </p>
        <ol className="publications-list">
          {publications.map((entry) => (
            <li key={entry.id} id={entry.id}>
              <article aria-labelledby={`${entry.id}-title`}>
                <p className="publications-kind">{entry.kind}</p>
                <h2 id={`${entry.id}-title`}>{entry.title}</h2>
                <p>
                  {entry.publication} · {entry.edition}
                </p>
                <p className="publications-byline">
                  Published as {entry.byline}
                </p>
                <div className="publications-links">
                  <a href={entry.url}>{entry.sourceLabel}</a>
                  {entry.editionUrl ? (
                    <a href={entry.editionUrl}>View issue listing</a>
                  ) : null}
                  {entry.poemPath ? (
                    <a href={entry.poemPath}>Read the poem in my archive</a>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ol>
        <a className="text-link" href="/">
          Explore my software and writing
        </a>
      </main>
    </>
  );
}
