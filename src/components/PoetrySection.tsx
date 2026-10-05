import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { poems } from "../data/poetry";
import { useLanguage } from "../i18n";

const PREVIEW_COUNT = 4;

export default function PoetrySection() {
  const { translate } = useLanguage();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const hiddenCount = Math.max(poems.length - PREVIEW_COUNT, 0);

  return (
    <section id="poetry" className="poetry section-pad">
      <div className="section-kicker">
        <span>{translate("Selected poetry")}</span>
        <span>{translate("Words from somewhere darker")}</span>
      </div>

      <div className="poetry-intro">
        <ScrollReveal>
          <h2>
            {translate("Where logic ends")}
            <br />
            {translate("and silence begins,")}
            <br />
            <em>{translate("I write.")}</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal className="poetry-copy" delay={0.1}>
          <p>
            {translate("Seven poems, written between 2019 and 2026. A boy who writes, a husband in mourning, and lovers who ask more of death than silence.")}
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
                  aria-label={`${translate("Read")} ${poem.title}`}
                  tabIndex={isVisible ? undefined : -1}
                >
                  <h3>{poem.title}</h3>
                  <span className="poetry-thread" aria-hidden="true" />
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
              {translate(
                archiveOpen
                  ? "Close the poetry archive"
                  : "Open the poetry archive",
              )}
            </span>
            <span className="poetry-archive-count" aria-hidden="true">
              {translate(archiveOpen ? "All poems" : "Archive")}
            </span>
          </button>
        )}
      </ScrollReveal>
    </section>
  );
}
