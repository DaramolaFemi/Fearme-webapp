import { useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import "./immortal-case-study.css";

const liveUrl = "https://immortal-craft.vercel.app/";
const originalUrl = "https://www.immortalcraftbarbers.com/";

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
      <a className="skip-link" href="#case-study-main">
        Skip to case study
      </a>
      <header className="case-header">
        <a href="/#work" className="wordmark" aria-label="Femi: back to selected work">
          <Logo />
        </a>
        <div className="case-header-actions">
          <ThemeToggle />
          <a href="/#work" className="case-back-link">
            Back to work
          </a>
        </div>
      </header>

      <main id="case-study-main" className="case-study">
        <section className="case-hero">
          <div className="case-kicker">
            <span>Case study / Immortal Craft</span>
            <span>Las Vegas / 2026</span>
          </div>
          <div className="case-hero-copy">
            <h1>
              From a dated brochure site to a <em>booking-led experience.</em>
            </h1>
            <p>
              Immortal Craft already had the barbers, the reputation, and the work.
              The website needed to make those strengths easier to see and easier to act on.
            </p>
          </div>
          <div className="case-meta">
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

          <div className="case-after-hero" aria-label="Redesigned Immortal Craft hero">
            <img
              src="/Images/case-studies/immortal-after-hero.webp"
              alt="Immortal Craft barber lounge used in the redesigned website hero"
              width={2500}
              height={1667}
            />
            <div className="case-after-shade" />
            <div className="case-after-copy">
              <span>Las Vegas, Nevada</span>
              <h2>
                Immortal
                <br />
                Craft
              </h2>
              <p>A cut that outlives the moment.</p>
              <span className="case-after-action">Choose your barber</span>
            </div>
            <span className="case-media-label">After / redesigned hero system</span>
          </div>
        </section>

        <section className="case-section case-problem">
          <div className="case-section-heading">
            <span>01 / The starting point</span>
            <h2>The information existed. The journey did not.</h2>
          </div>
          <div className="case-problem-grid">
            <div className="case-before-frame">
              <img
                src="/Images/case-studies/immortal-before-hero.webp"
                alt="Original Immortal Craft website hero before the redesign"
                width={1280}
                height={654}
                loading="lazy"
              />
              <span>Before / original homepage</span>
            </div>
            <div className="case-copy">
              <p className="case-lead">
                The old site introduced the shop, but it behaved more like a set of
                pages than a guided client journey.
              </p>
              <p>
                The hero pushed a generic booking action. Barber discovery lived
                elsewhere. Contact information, app links, gallery content, and the
                team were separated instead of working together to answer one
                question: who should I book with?
              </p>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-heading">
            <span>02 / The decisions</span>
            <h2>Rebuild the path, not just the surface.</h2>
          </div>
          <div className="case-decisions">
            <article>
              <span>01</span>
              <h3>Make the barber the product.</h3>
              <p>
                The redesign moves barber discovery into the core experience so
                clients can see the people, the work, and the booking path together.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Turn proof into part of the interface.</h3>
              <p>
                Reviews, photography, services, and the lounge itself now build
                confidence before the visitor reaches a booking decision.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Give every section a job.</h3>
              <p>
                The page moves from identity to barbers, services, proof, place, and
                action. Nothing is there only to fill a screen.
              </p>
            </article>
          </div>
        </section>

        <section className="case-section case-transformation">
          <div className="case-section-heading">
            <span>03 / The transformation</span>
            <h2>A clearer hierarchy from first look to final action.</h2>
          </div>
          <div className="case-transform-grid">
            <figure className="case-before-frame case-before-contact">
              <img
                src="/Images/case-studies/immortal-before-contact.webp"
                alt="Original Immortal Craft contact and team presentation before the redesign"
                width={1280}
                height={654}
                loading="lazy"
              />
              <figcaption>Before / contact-heavy, fragmented presentation</figcaption>
            </figure>
            <figure className="case-after-detail">
              <img
                src="/Images/case-studies/immortal-after-detail.webp"
                alt="Barber shaping a haircut in the redesigned Immortal Craft visual system"
                width={1800}
                height={1200}
                loading="lazy"
              />
              <figcaption>After / image-led craft, stronger hierarchy, direct action</figcaption>
            </figure>
          </div>
          <blockquote>
            The redesign did not need more decoration. It needed a clearer order of decisions.
          </blockquote>
        </section>

        <section className="case-section case-result">
          <div className="case-section-heading">
            <span>04 / The result</span>
            <h2>The shop now reads like the experience it sells.</h2>
          </div>
          <div className="case-result-grid">
            <p>
              The final system is darker, calmer, and more photographic, but the
              visual change is only the visible layer. Underneath it is a simpler
              route through the business: understand the lounge, choose a barber,
              trust the work, and book.
            </p>
            <div className="case-result-actions">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                Open the redesign
              </a>
              <a href={originalUrl} target="_blank" rel="noopener noreferrer">
                View the original website
              </a>
              <a href="/#work">Return to selected work</a>
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
