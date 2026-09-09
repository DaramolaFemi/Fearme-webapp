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
            Somewhere between
            <br />
            code and the graveyard,
            <br />I <em>still write.</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal className="poetry-copy" delay={0.1}>
          <p>
            Poetry on grief, memory, fear, inheritance, love, and the things
            that refuse to stay buried.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.12}>
        <ol className="poetry-index">
          {poems.map((poem) => (
            <li key={poem.id}>
              <span>{poem.id}</span>
              <h3>{poem.title}</h3>
              <span className="poetry-status">Coming soon</span>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </section>
  );
}
