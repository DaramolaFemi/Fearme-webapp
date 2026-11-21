import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useDesktopMotion } from "../hooks/useDesktopMotion";
import { ReadingProgress } from "./ScrollReveal";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import "./immortal-case-study.css";

const liveUrl = "https://www.immortalcraftbarbers.com/";
const chapters = [
  ["I", "The starting point", "starting-point"],
  ["II", "The experience", "experience"],
  ["III", "Behind the website", "management"],
  ["IV", "Delivered", "delivered"],
];

// Local to this case study: the portfolio's other motion systems stay untouched.
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Chapter({ numeral, title }: { numeral: string; title: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="case-chapter">
      <span>{numeral}</span>
      <span>{title}</span>
      <motion.i
        aria-hidden="true"
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function LoungeImage() {
  const frame = useRef<HTMLDivElement>(null);
  const desktop = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  return (
    <Reveal className="case-cover-reveal">
      <div className="case-cinema" ref={frame}>
        <motion.img
          src="/Images/case-studies/immortal-after-hero.webp"
          alt="Inside Immortal Craft Barber Lounge in Southwest Las Vegas"
          width={2500}
          height={1667}
          style={desktop ? { y, scale: 1.08 } : undefined}
          fetchPriority="high"
        />
        <span className="case-cover-label">
          Immortal Craft Barber Lounge / Las Vegas
        </span>
      </div>
      <div className="case-cover-caption">
        <span>The place behind the project.</span>
        <span>Website + custom CMS</span>
      </div>
    </Reveal>
  );
}

export default function ImmortalCraftCaseStudy() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content") || "";
    document.title = "Immortal Craft Case Study — Daramola Femi";
    description?.setAttribute(
      "content",
      "A live client website for Immortal Craft in Las Vegas: design, Next.js development, UX writing, and SQUIRE booking by Daramola Femi.",
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
        <a
          href="/#work"
          className="wordmark"
          aria-label="Femi: back to selected work"
        >
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
            <span>Client work / Full-stack development</span>
            <span>Southwest Las Vegas / 2026</span>
          </div>
          <div className="case-hero-grid">
            <Reveal className="case-hero-title">
              <h1 id="case-title">
                The craft was already there.
                <em>
                  The website had
                  <br />
                  to catch up.
                </em>
              </h1>
            </Reveal>
            <Reveal className="case-hero-note" delay={0.1}>
              <p>
                Immortal Craft already had the barbers, the reputation, and a
                way to book. I worked with the owners to turn the redesign into
                their live website, making the path to the right chair obvious.
              </p>
              <p className="case-hero-addendum">
                A considered frontend. A custom CMS behind it. One project,
                built for the people on both sides of the screen.
              </p>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-text-link"
              >
                Visit the live website
              </a>
            </Reveal>
          </div>
          <Reveal>
            <dl className="case-meta">
              <div>
                <dt>My role</dt>
                <dd>Design, frontend, backend & UX writing</dd>
              </div>
              <div>
                <dt>The build</dt>
                <dd>Client website + custom CMS</dd>
              </div>
              <div>
                <dt>Tools & integration</dt>
                <dd>Next.js, TypeScript, SQUIRE, Vercel</dd>
              </div>
            </dl>
          </Reveal>
          <LoungeImage />
        </section>

        <div className="case-body">
          <nav className="case-index" aria-label="Case study chapters">
            <span className="case-index-label">Inside the project</span>
            {chapters.map(([, title, id]) => (
              <a key={id} href={`#${id}`}>
                {title}
              </a>
            ))}
          </nav>
          <div className="case-story">
            <section
              id="starting-point"
              className="case-section"
              aria-labelledby="diagnosis-title"
            >
              <Chapter numeral="I" title="The starting point" />
              <Reveal className="case-section-heading">
                <h2 id="diagnosis-title">
                  The information existed.<em>The journey did not.</em>
                </h2>
                <p>
                  The old website could tell you about the shop. It did not help
                  a visitor move confidently from first impression to the right
                  barber.
                </p>
              </Reveal>
              <Reveal>
                <figure className="case-before-stage">
                  <img
                    src="/Images/case-studies/immortal-before-hero.webp"
                    alt="Original Immortal Craft homepage before the redesign"
                    width={1280}
                    height={654}
                    loading="lazy"
                  />
                  <figcaption>
                    <span>Before / original homepage</span>
                    <span>The starting point for the redesign.</span>
                  </figcaption>
                </figure>
              </Reveal>
              <div className="case-diagnosis-list">
                {[
                  [
                    "Discovery",
                    "The visitor had to hunt for the person behind the service.",
                  ],
                  [
                    "Trust",
                    "Work, reviews, services, place, and booking did not strengthen one another.",
                  ],
                  [
                    "Direction",
                    "The site had actions. What it lacked was sequence.",
                  ],
                ].map(([title, text], i) => (
                  <Reveal key={title} delay={i * 0.07}>
                    <article>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>

            <section
              id="experience"
              className="case-section"
              aria-labelledby="experience-title"
            >
              <Chapter numeral="II" title="The experience" />
              <Reveal className="case-section-heading">
                <h2 id="experience-title">
                  Put the barber<em>at the center.</em>
                </h2>
                <p>
                  The people behind the chairs became part of the first
                  decision. Visitors can meet the barbers, see the work, and
                  move toward booking without hunting through the site.
                </p>
              </Reveal>
              <Reveal>
                <figure className="case-detail-image">
                  <img
                    src="/Images/case-studies/immortal-after-detail.webp"
                    alt="An Immortal Craft barber working with a client, photography used in the redesigned website"
                    width={2200}
                    height={1468}
                    loading="lazy"
                  />
                  <figcaption>
                    The people and their work carry the experience.
                  </figcaption>
                </figure>
              </Reveal>
              <div className="case-design-notes">
                <Reveal>
                  <h3>Let the work prove the promise.</h3>
                  <p>
                    Reviews, photography, services, and the lounge now sit where
                    they can build confidence before a visitor chooses a barber.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h3>Make every section lead somewhere.</h3>
                  <p>
                    The page now moves with purpose: identity, barbers, proof,
                    place, then booking. Each section prepares the next choice.
                  </p>
                </Reveal>
              </div>
              <Reveal className="case-route">
                <span className="case-small-label">The client journey</span>
                <ol aria-label="Redesigned client journey">
                  {["Arrive", "Meet", "Compare", "Trust", "Book"].map(
                    (step) => (
                      <li key={step}>{step}</li>
                    ),
                  )}
                </ol>
              </Reveal>
            </section>

            <section
              id="management"
              className="case-section case-management"
              aria-labelledby="management-title"
            >
              <Chapter numeral="III" title="Behind the website" />
              <Reveal className="case-section-heading">
                <h2 id="management-title">
                  A website to visit.<em>A system to run it.</em>
                </h2>
                <p>
                  I built the frontend and backend, pairing the public website
                  with a custom content management system. The owners can update
                  their website without editing code.
                </p>
              </Reveal>
              <div className="case-system">
                <Reveal>
                  <article>
                    <span className="case-small-label">For the client</span>
                    <h3>
                      Choose a barber.
                      <br />
                      Book a chair.
                    </h3>
                    <p>
                      Profiles, services, pricing, reviews, and galleries guide
                      the decision. SQUIRE handles booking.
                    </p>
                    <a
                      href={`${liveUrl}#barbers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-text-link"
                    >
                      Explore the barber profiles
                    </a>
                  </article>
                </Reveal>
                <Reveal delay={0.1}>
                  <article>
                    <span className="case-small-label">For the owners</span>
                    <h3>
                      Manage the content.
                      <br />
                      Keep the site current.
                    </h3>
                    <p>
                      A dedicated CMS brings website updates into a management
                      interface, keeping everyday content work out of the
                      codebase.
                    </p>
                    <span className="case-private-note">
                      Private management interface
                    </span>
                  </article>
                </Reveal>
              </div>
            </section>

            <section
              id="delivered"
              className="case-section case-result"
              aria-labelledby="result-title"
            >
              <Chapter numeral="IV" title="Delivered" />
              <Reveal className="case-section-heading">
                <h2 id="result-title">
                  The shop now reads like<em>the experience it sells.</em>
                </h2>
                <p>
                  The finished website is live on Immortal Craft’s own domain. I
                  delivered the design, Next.js implementation, UX writing, and
                  custom CMS.
                </p>
              </Reveal>
              <Reveal>
                <ul className="case-deliverables">
                  <li>Eight barber profiles with individual booking links</li>
                  <li>
                    Service prices, durations, reviews, and work in one journey
                  </li>
                  <li>Responsive layouts for mobile, tablet, and desktop</li>
                  <li>A custom CMS for website content updates</li>
                  <li>
                    Production deployment, custom domain, and search metadata
                  </li>
                </ul>
              </Reveal>
              <Reveal className="case-final-action">
                <span className="case-small-label">See it in use</span>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit Immortal Craft
                </a>
                <span>immortalcraftbarbers.com</span>
              </Reveal>
            </section>
          </div>
        </div>
      </main>
      <footer className="case-footer">
        <Logo />
        <span>Immortal Craft / Daramola Femi</span>
        <a href="/#work">Back to selected work</a>
      </footer>
    </>
  );
}
