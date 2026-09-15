import { useState } from "react";
import Arrow from "./Arrow";
import ScrollReveal from "./ScrollReveal";
import { poems } from "../data/poetry";

const PREVIEW_COUNT = 4;

export default function PoetrySection() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const hiddenCount = Math.max(poems.length - PREVIEW_COUNT, 0);

  return (
    <section id="poetry" className="poetry section-pad">
      <div className="section-kicker">
        <span>04 / Selected poetry</span>
        <span>Words from somewhere darker</span>
      </div>

      <div className="poetry-intro">
        <ScrollReveal>
          <h2>
            Against the logic of code
            <br />
            and the silence of the grave,
            <br />
            <em>I bleed ink.</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal className="poetry-copy" delay={0.1}>
          <p>
            Seven poems, written between 2019 and 2026. A boy who writes, a
            husband in mourning, and lovers who ask more of death than silence.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.12}>
        <ol className="poetry-index" id="poetry-index">
          {poems.map((poem, index) => {
            const isArchived = index >= PREVIEW_COUNT;
            const isVisible = archiveOpen || !isArchived;

            return (
              <li
                key={poem.id}
                className={
                  isArchived
                    ? `poetry-collapsible${
                        archiveOpen ? " poetry-collapsible--open" : ""
                      }`
                    : undefined
                }
                aria-hidden={isArchived ? !archiveOpen : undefined}
              >
                <a
                  className="poetry-row"
                  href={`/poetry/${poem.slug}`}
                  aria-label={`Read ${poem.title}`}
                  tabIndex={isVisible ? undefined : -1}
                >
                  <span className="poetry-number">{poem.id}</span>
                  <h3>{poem.title}</h3>
                  <span className="poetry-row-arrow">
                    <Arrow direction="right" />
                  </span>
                </a>
              </li>
            );
          })}
        </ol>

        {hiddenCount > 0 && (
          <button
            type="button"
            className="poetry-archive-toggle"
            aria-expanded={archiveOpen}
            aria-controls="poetry-index"
            onClick={() => setArchiveOpen((open) => !open)}
          >
            <span>
              {archiveOpen
                ? "Close the poetry archive"
                : "Open the poetry archive"}
            </span>
            <span className="poetry-archive-count" aria-hidden="true">
              {archiveOpen
                ? `${String(poems.length).padStart(2, "0")} poems`
                : `${String(hiddenCount).padStart(2, "0")} more`}
            </span>
          </button>
        )}
      </ScrollReveal>
    </section>
  );
}
