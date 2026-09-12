import Arrow from "./Arrow";
import ScrollReveal from "./ScrollReveal";
import { poems } from "../data/poetry";

export default function PoetrySection() {
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
        <ol className="poetry-index">
          {poems.map((poem) => (
            <li key={poem.id}>
              <span>{poem.id}</span>
              <h3>{poem.title}</h3>
              <a
                className="poetry-status"
                href={`/poetry/${poem.slug}`}
                aria-label={`Read ${poem.title}`}
              >
                <span className="poetry-year">{poem.year}</span>
                <span className="reading-action">
                  Read poem <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </section>
  );
}
