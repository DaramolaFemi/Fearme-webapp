import { useState } from "react";
import ScrollReveal, { ReadingProgress } from "./ScrollReveal";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import "./immortal-case-study.css";
import "./union-case-study.css";

const previewUrl = "https://union-barbershop-iota.vercel.app/";

export default function UnionCaseStudy() {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <ReadingProgress />
      <a className="skip-link" href="#case-study-main">
        Skip to case study
      </a>
      <header className="case-header">
        <a
          href="/#work"
          className="wordmark"
          aria-label="Femi: back to selected work"
        >
          <Logo />
        </a>
        <span className="case-header-title">Union Barbershop / Case study</span>
        <div className="case-header-actions">
          <ThemeToggle />
          <a href="/#work" className="case-back-link">
            Back to work
          </a>
        </div>
      </header>
      <main id="case-study-main" className="case-study union-case-study">
        <section className="case-hero" aria-labelledby="union-title">
          <div className="case-kicker">
            <span>Website redesign / Design + development</span>
            <span>Soulard, St. Louis / 2026</span>
          </div>
          <div className="case-hero-grid">
            <ScrollReveal>
              <h1 id="union-title">
                The shop had character.
                <em>
                  I gave it
                  <br />
                  room online.
                </em>
              </h1>
            </ScrollReveal>
            <ScrollReveal className="case-hero-note" delay={0.1}>
              <p>
                Three floors, vintage chairs, walls full of history. I
                redesigned Union Barbershop’s website to carry the personality
                of the place, from the first photograph to booking a chair.
              </p>
              <p className="case-hero-addendum">
                A working redesign preview. The original business website
                remains separate.
              </p>
              <a
                className="case-text-link"
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the redesign
              </a>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <dl className="case-meta">
              <div>
                <dt>My role</dt>
                <dd>Visual direction, frontend & interaction design</dd>
              </div>
              <div>
                <dt>The build</dt>
                <dd>Responsive website redesign</dd>
              </div>
              <div>
                <dt>Tools & integration</dt>
                <dd>Next.js, React, TypeScript, SQUIRE</dd>
              </div>
            </dl>
          </ScrollReveal>
          <ScrollReveal>
            <figure className="union-reel">
              <video
                controls
                muted
                loop
                playsInline
                preload="none"
                poster="/Images/case-studies/union-after-hero.webp"
                aria-label="Union Barbershop redesign highlights"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/Video/union-feature-loop.mp4" type="video/mp4" />
                Your browser does not support video.{" "}
                <a href="/Video/union-feature-loop.mp4">
                  Download the redesign preview
                </a>
                .
              </video>
              <figcaption>
                <span>
                  {playing
                    ? "Playing / redesign highlights"
                    : "Play / redesign highlights"}
                </span>
                <span>
                  Hero, services, review stickers & booking / silent loop
                </span>
              </figcaption>
            </figure>
          </ScrollReveal>
        </section>
        <div className="case-body">
          <nav className="case-index" aria-label="Case study chapters">
            <span className="case-index-label">Inside the project</span>
            <a href="#union-before-after">Before & after</a>
            <a href="#union-design">The visual system</a>
            <a href="#union-motion">Built to move</a>
            <a href="#union-scope">The work delivered</a>
          </nav>
          <div className="case-story">
            <section
              id="union-before-after"
              className="case-section"
              aria-labelledby="union-comparison-title"
            >
              <div className="case-chapter">
                <span>I</span>
                <span>Before & after</span>
                <i aria-hidden="true" />
              </div>
              <ScrollReveal className="case-section-heading">
                <h2 id="union-comparison-title">
                  From a photo gallery<em>to a sense of place.</em>
                </h2>
                <p>
                  The original homepage led with a slideshow and a small set of
                  navigation links. The redesign gives the shop’s identity,
                  services, reviews, and booking their own place in the story.
                </p>
              </ScrollReveal>
              <div className="union-comparison">
                <ScrollReveal>
                  <figure>
                    <img
                      src="/Images/case-studies/union-before.jpg"
                      alt="Original Union Barbershop homepage with a white navigation bar and photographic slideshow"
                      width={1363}
                      height={936}
                      loading="lazy"
                    />
                    <figcaption>
                      <strong>Before</strong>
                      <span>Original homepage / captured November 2026</span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <figure>
                    <img
                      src="/Images/case-studies/union-after-hero.webp"
                      alt="Union redesign with oversized cream UNION lettering, forest green background, pink booking ticket and barber photographs"
                      width={1440}
                      height={740}
                      loading="lazy"
                    />
                    <figcaption>
                      <strong>After</strong>
                      <span>Redesigned homepage / working preview</span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              </div>
              <a
                className="case-text-link"
                href="https://unionbarbershopstl.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                See the original website
              </a>
            </section>
            <section
              id="union-design"
              className="case-section"
              aria-labelledby="union-design-title"
            >
              <div className="case-chapter">
                <span>II</span>
                <span>The visual system</span>
                <i aria-hidden="true" />
              </div>
              <ScrollReveal className="case-section-heading">
                <h2 id="union-design-title">
                  Collected,<em>not assembled.</em>
                </h2>
                <p>
                  Oversized type, deep green, warm paper, and pink accents sit
                  alongside real shop photography. The layouts take their cues
                  from pinned photographs, tickets, and the objects that make
                  Union feel like Union.
                </p>
              </ScrollReveal>
              <div className="case-design-notes">
                <ScrollReveal>
                  <h3>Give each photograph a purpose.</h3>
                  <p>
                    The barber at work introduces the people. The interior
                    introduces the place. Taped edges and layered photographs
                    tie the sections together without repeating the same
                    composition.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.08}>
                  <h3>Keep the route to a chair clear.</h3>
                  <p>
                    Services and pricing live within the experience. Booking
                    links lead to SQUIRE, while the about, visit, and careers
                    pages carry the same visual language.
                  </p>
                </ScrollReveal>
              </div>
            </section>
            <section
              id="union-motion"
              className="case-section"
              aria-labelledby="union-motion-title"
            >
              <div className="case-chapter">
                <span>III</span>
                <span>Built to move</span>
                <i aria-hidden="true" />
              </div>
              <ScrollReveal className="case-section-heading">
                <h2 id="union-motion-title">
                  Let the details<em>have a little life.</em>
                </h2>
                <p>
                  The review cards fall into place like stickers. Section
                  reveals, photographic layers, and the booking ticket make
                  movement part of the visual language. The highlight reel above
                  preserves those moments rather than flattening them into
                  screenshots.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <figure className="union-review-still">
                  <img
                    src="/Images/case-studies/union-review-motion.webp"
                    alt="Union’s Word Gets Around review section with layered review cards, SQUIRE and Google ratings"
                    width={1440}
                    height={740}
                    loading="lazy"
                  />
                  <figcaption>
                    Review cards / a still from the animated section
                  </figcaption>
                </figure>
              </ScrollReveal>
            </section>
            <section
              id="union-scope"
              className="case-section"
              aria-labelledby="union-scope-title"
            >
              <div className="case-chapter">
                <span>IV</span>
                <span>The work delivered</span>
                <i aria-hidden="true" />
              </div>
              <ScrollReveal className="case-section-heading">
                <h2 id="union-scope-title">
                  A distinct identity.<em>A working experience.</em>
                </h2>
                <p>
                  I designed and developed the responsive frontend, including
                  the homepage, about, services, visit, and careers experiences.
                  The preview connects to the shop’s existing booking platform.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <ul className="case-deliverables">
                  <li>
                    Custom typography, photographic layouts, and a consistent
                    colour system
                  </li>
                  <li>Scroll reveals and falling review-card animation</li>
                  <li>Service information and SQUIRE booking links</li>
                  <li>Responsive navigation and layouts</li>
                  <li>Reduced-motion support and static page output</li>
                </ul>
                <p className="union-scope-note">
                  The barber-profile page is a placeholder in the current
                  preview. This case study documents the redesign work, without
                  claiming a production launch or measured business results.
                </p>
              </ScrollReveal>
              <ScrollReveal className="case-final-action">
                <span className="case-small-label">Explore the work</span>
                <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                  Visit the redesign
                </a>
                <span>Union Barbershop / working preview</span>
              </ScrollReveal>
            </section>
          </div>
        </div>
      </main>
      <footer className="case-footer">
        <Logo />
        <span>Union Barbershop / Daramola Femi</span>
        <a href="/#work">Back to selected work</a>
      </footer>
    </>
  );
}
