import { useEffect } from "react";
import ScrollReveal, { ReadingProgress } from "./ScrollReveal";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import "./immortal-case-study.css";

const liveUrl = "https://immortal-craft.vercel.app/";
const originalUrl = "https://www.immortalcraftbarbers.com/";

const decisions = [
  {
    number: "01",
    title: "Make the barber the product.",
    text: "The person behind the chair moved into the center of the journey. Discovery, work, and booking now belong to the same decision.",
  },
  {
    number: "02",
    title: "Make proof do work.",
    text: "Reviews, photography, services, and the lounge now reinforce one another before the visitor is asked to commit.",
  },
  {
    number: "03",
    title: "Make every section earn the next.",
    text: "Identity leads to people. People lead to proof. Proof leads to place. Place leads to booking. Nothing exists only to fill a screen.",
  },
];

const route = ["Arrive", "Meet", "Compare", "Trust", "Book"];

export default function ImmortalCraftCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content") || "";

    document.title = "Immortal Craft Case Study — Daramola Femi";
    description?.setAttribute(
      "content",
      "Immortal Craft: a barbershop website redesign case study by Daramola Femi.",
    );

    return () => {
      document.title = previousTitle;
      description?.setAttribute("content", previousDescription);
    };
  }, []);

  return (
    <>
      <ReadingProgress />
      <a className="skip-link" href="#case-study-main">
        Skip to case study
      </a>

      <header className="case-header">
        <a href="/#work" className="wordmark" aria-label="Femi: back to selected work">
          <Logo />
        </a>
        <span className="case-header-title">Immortal Craft / Case study</span>
        <div className="case-header-actions">
          <ThemeToggle />
          <a href="/#work" className="case-back-link">
            Back to work
          </a>
        </div>
      </header>

      <main id="case-study-main" className="case-study">
        <section className="case-hero" aria-labelledby="case-title">
          <div className="case-kicker">
            <span>Case study / Immortal Craft</span>
            <span>Las Vegas / 2026</span>
          </div>

          <div className="case-hero-grid">
            <div className="case-hero-title">
              <span className="case-eyebrow">Website redesign / Design + development</span>
              <h1 id="case-title">
                The craft was already there.
                <em>The website had to catch up.</em>
              </h1>
            </div>

            <div className="case-hero-note">
              <p>
                Immortal Craft already had the barbers, the reputation, and a way to book.
                The redesign had one job: make the path to the right chair obvious.
              </p>
              <div className="case-proof-line">
                <span>Not a reskin.</span>
                <span>A rebuilt decision path.</span>
              </div>
            </div>
          </div>

          <div className="case-meta" aria-label="Project details">
            <span>
              <small>Role</small>
              Design and development
            </span>
            <span>
              <small>Scope</small>
              Information architecture, responsive UI, motion, booking path
            </span>
            <span>
              <small>Stack</small>
              Next.js, TypeScript, responsive interaction
            </span>
          </div>

          <div className="case-cinema">
            <img
              src="/Images/case-studies/immortal-after-hero.webp"
              alt="Immortal Craft barber lounge used in the redesigned website hero"
              width={2500}
              height={1667}
            />
            <div className="case-cinema-copy" aria-hidden="true">
              <span>After</span>
              <strong>
                Immortal
                <br />
                Craft
              </strong>
              <small>A cut that outlives the moment.</small>
            </div>
            <span className="case-media-label">After / redesigned hero system</span>
          </div>
        </section>

        <section className="case-dark case-diagnosis" aria-labelledby="diagnosis-title">
          <div className="case-chapter">
            <span>01 / Diagnose</span>
            <span>Before touching the surface</span>
          </div>

          <ScrollReveal className="case-diagnosis-heading">
            <h2 id="diagnosis-title">
              The information existed.
              <br />
              <em>The journey did not.</em>
            </h2>
            <p>
              The old website could tell you about the shop. It did not help a visitor
              move confidently from first impression to the right barber.
            </p>
          </ScrollReveal>

          <div className="case-diagnosis-grid">
            <figure className="case-before-stage">
              <img
                src="/Images/case-studies/immortal-before-hero.webp"
                alt="Original Immortal Craft website hero before the redesign"
                width={1280}
                height={654}
                loading="lazy"
              />
              <figcaption>Before / original homepage</figcaption>
            </figure>

            <div className="case-diagnosis-list">
              <article>
                <span>01</span>
                <div>
                  <h3>Barber discovery sat too far from the decision.</h3>
                  <p>The visitor had to hunt for the person behind the service.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Proof was present, but scattered.</h3>
                  <p>Work, reviews, services, place, and booking did not strengthen one another.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Booking existed without a designed route to it.</h3>
                  <p>The site had actions. What it lacked was sequence.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="case-route" aria-labelledby="route-title">
          <div className="case-route-intro">
            <span>02 / Reframe</span>
            <h2 id="route-title">
              From pages
              <br />
              to a path.
            </h2>
            <p>
              The new architecture follows the decision a real client is trying to make.
            </p>
          </div>

          <ol className="case-route-line" aria-label="Redesigned client journey">
            {route.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-decisions-section" aria-labelledby="decisions-title">
          <div className="case-chapter case-chapter-light">
            <span>03 / Design moves</span>
            <span>Three decisions shaped the system</span>
          </div>

          <ScrollReveal className="case-decision-head">
            <h2 id="decisions-title">Three moves. One clearer decision.</h2>
          </ScrollReveal>

          <div className="case-decisions">
            {decisions.map((decision, index) => (
              <ScrollReveal
                key={decision.number}
                className="case-decision"
                delay={index * 0.05}
              >
                <span className="case-decision-number">{decision.number}</span>
                <h3>{decision.title}</h3>
                <p>{decision.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="case-dark case-transformation" aria-labelledby="transformation-title">
          <div className="case-chapter">
            <span>04 / Transformation</span>
            <span>Same business / different order of attention</span>
          </div>

          <ScrollReveal className="case-transform-heading">
            <h2 id="transformation-title">
              Rebuild the path,
              <br />
              <em>not just the surface.</em>
            </h2>
          </ScrollReveal>

          <div className="case-compare">
            <figure className="case-compare-before">
              <div className="case-compare-mark">Before</div>
              <img
                src="/Images/case-studies/immortal-before-contact.webp"
                alt="Original Immortal Craft contact and team presentation before the redesign"
                width={1280}
                height={654}
                loading="lazy"
              />
              <figcaption>
                Contact-heavy presentation. Discovery, proof, and action were separated.
              </figcaption>
            </figure>

            <figure className="case-compare-after">
              <div className="case-compare-mark">After</div>
              <img
                src="/Images/case-studies/immortal-after-detail.webp"
                alt="Barber shaping a haircut in the redesigned Immortal Craft visual system"
                width={1800}
                height={1200}
                loading="lazy"
              />
              <figcaption>
                Image-led craft. Barber, proof, place, and action now work as one system.
              </figcaption>
            </figure>
          </div>

          <blockquote>
            The redesign did not need more decoration.
            <em>It needed a clearer order of decisions.</em>
          </blockquote>
        </section>

        <section className="case-result" aria-labelledby="result-title">
          <div className="case-chapter case-chapter-light">
            <span>05 / Result</span>
            <span>No invented metrics / the work is visible</span>
          </div>

          <div className="case-result-grid">
            <ScrollReveal className="case-result-copy">
              <span className="case-result-index">05</span>
              <h2 id="result-title">The shop now reads like the experience it sells.</h2>
              <p>
                The interface is darker, calmer, and more photographic, but the real
                change is structural: understand the lounge, meet the barbers, see the
                proof, choose with confidence, and book.
              </p>
            </ScrollReveal>

            <div className="case-result-proof">
              <span>What changed</span>
              <ul>
                <li>Barber-led discovery</li>
                <li>Proof embedded into the journey</li>
                <li>Clear service and booking hierarchy</li>
                <li>Responsive motion with restraint</li>
              </ul>
            </div>
          </div>

          <div className="case-final-action">
            <p>See the transformation yourself.</p>
            <div className="case-result-actions">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <span>Open the redesign</span>
                <small>Live build</small>
              </a>
              <a href={originalUrl} target="_blank" rel="noopener noreferrer">
                <span>View the original website</span>
                <small>Before</small>
              </a>
              <a href="/#work">
                <span>Return to selected work</span>
                <small>Portfolio</small>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="case-footer">
        <Logo />
        <span>Immortal Craft case study / Daramola Femi</span>
      </footer>
    </>
  );
}
