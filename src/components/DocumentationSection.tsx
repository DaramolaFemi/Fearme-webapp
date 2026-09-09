import ScrollReveal from "./ScrollReveal";
import { documentation } from "../data/documentation";

export default function DocumentationSection() {
  return (
    <section id="documentation" className="documentation section-pad">
      <div className="section-kicker">
        <span>02 / Documentation</span>
        <span>Systems, made understandable</span>
      </div>

      <ScrollReveal className="section-heading documentation-heading">
        <h2>
          I write the map
          <br />
          behind <em>the machine.</em>
        </h2>
        <p>
          Developer documentation, API references, and technical guides built to
          make complex systems easier to use.
        </p>
      </ScrollReveal>

      <ol className="documentation-index">
        {documentation.map((entry, index) => (
          <li key={entry.id}>
            <ScrollReveal className="documentation-entry" delay={index * 0.06}>
              <div className="documentation-number">{entry.id}</div>
              <div className="documentation-title">
                <p>{entry.category}</p>
                <h3>{entry.title}</h3>
              </div>
              <p className="documentation-description">{entry.description}</p>
              <div className="documentation-meta">
                <span
                  className={`documentation-status status-${entry.status.toLowerCase().replace(" ", "-")}`}
                >
                  {entry.status}
                </span>
                <span className="documentation-cta">Coming soon</span>
              </div>
              <div className="documentation-tags tags">
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
