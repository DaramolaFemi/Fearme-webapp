import ScrollReveal from "./ScrollReveal";
import { documentation } from "../data/documentation";
import { useLanguage } from "../i18n";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function DocumentationSection() {
  const { translate } = useLanguage();
  return (
    <section id="documentation" className="documentation section-pad">
      <div className="section-kicker">
        <span>II / {translate("Documentation")}</span>
        <span>{translate("Systems, made understandable")}</span>
      </div>

      <ScrollReveal className="section-heading documentation-heading">
        <h2>
          <span className="documentation-heading-line documentation-heading-line-primary">
            {translate("I write the map")}
          </span>
          <br className="documentation-heading-break" />
          <span className="documentation-heading-line documentation-heading-line-secondary">
            {translate("behind")} <em>{translate("the machine.")}</em>
          </span>
        </h2>
        <p className="documentation-heading-copy">
          <span className="documentation-heading-copy-desktop">
            {translate("Developer documentation, API references, and technical guides.")}
          </span>
          <span className="documentation-heading-copy-mobile">
            {translate("Developer documentation, API references, and technical guides built to make complex systems easier to use.")}
          </span>
        </p>
      </ScrollReveal>

      <ol className="documentation-index">
        {documentation.map((entry, index) => (
          <li key={entry.id}>
            <ScrollReveal className="documentation-entry" delay={index * 0.06}>
              <div className="documentation-number">{romanNumerals[index] ?? entry.id}</div>
              <div className="documentation-title">
                <p>{translate(entry.category)}</p>
                <h3>{entry.title}</h3>
              </div>
              <p className="documentation-description">{translate(entry.description)}</p>
              <div className="documentation-meta">
                <span
                  className={`documentation-status status-${entry.status.toLowerCase().replace(" ", "-")}`}
                >
                  {translate(entry.status)}
                </span>
                {entry.href ? (
                  <a
                    className="documentation-cta"
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {translate("Read documentation")}
                  </a>
                ) : (
                  <span className="documentation-cta">{translate("Coming soon")}</span>
                )}
              </div>
              <div className="documentation-tags tags">
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <span className="documentation-orbit" aria-hidden="true" />
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
