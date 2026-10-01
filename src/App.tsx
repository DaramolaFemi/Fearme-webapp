import Arrow from "./components/Arrow";
import ScrollReveal, { ReadingProgress } from "./components/ScrollReveal";
import { useDesktopMotion } from "./hooks/useDesktopMotion";
import GameplayPreview from "./components/GameplayPreview";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import {
  featuredProjects,
  filters,
  projectLabProjects,
  type Project,
} from "./data/projects";
import Contact from "./components/Contact";
import DocumentationSection from "./components/DocumentationSection";
import PoetrySection from "./components/PoetrySection";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { shouldRestoreReloadScroll } from "./utils/navigation";

type ProjectCardProps = {
  project: Project;
  reduced: boolean | null;
  desktopMotion: boolean;
};

function ProjectCard({ project, reduced, desktopMotion }: ProjectCardProps) {
  const destination = project.caseStudyPath || project.href || "#contact";
  const external = !project.caseStudyPath && Boolean(project.href);
  const actionLabel = project.ctaLabel || (project.href ? "View" : "Request");

  return (
    <motion.article
      className={`project ${project.theme}${project.preview ? " has-preview" : ""}`}
      id={`project-${project.theme}`}
      initial={reduced ? false : { opacity: 0, y: desktopMotion ? 48 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: desktopMotion ? 0.8 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.08 }}
    >
      <div className="project-visual">
        <picture>
          {project.mobileImage && (
            <source media="(max-width: 600px)" srcSet={project.mobileImage} />
          )}
          <source
            srcSet={project.imageSrcSet}
            sizes={
              project.id === "01" ? "90vw" : "(max-width: 900px) 90vw, 45vw"
            }
          />
          <img
            src={project.image}
            alt={`${project.name} interface`}
            loading="lazy"
            decoding="async"
            width={1200}
            height={800}
          />
        </picture>
        {project.theme === "immortal" && (
          <div className="immortal-card-overlay" aria-hidden="true">
            <span>Las Vegas, Nevada</span>
            <strong>
              Immortal
              <br />
              Craft
            </strong>
            <small>A cut that outlives the moment.</small>
          </div>
        )}
        {project.preview && (
          <GameplayPreview
            src={project.preview}
            poster={project.image}
            autoplayInView={project.previewAutoplay}
          />
        )}
      </div>
      <div className="project-card-body">
        <div className="project-heading">
          <h3>
            <span className="project-number">{project.id}</span>
            <span className="project-name-desktop">{project.name}</span>
            <span className="project-name-mobile">
              {project.mobileName || project.name}
            </span>
          </h3>
          <span>{project.type}</span>
        </div>
        <p className="project-status">
          {project.href ? "Live project" : "In development, not yet hosted"}
        </p>
        <h4>{project.subtitle}</h4>
        <p>{project.description}</p>
        <div className="project-card-footer">
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a
            className="project-open"
            href={destination}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={
              project.caseStudyPath
                ? `Read ${project.name} case study`
                : project.href
                  ? `Visit ${project.name} (opens in a new tab)`
                  : `Request a walkthrough of ${project.name}`
            }
          >
            <span className="project-open-icon" aria-hidden="true">
              <Arrow />
              <span className="project-cta-label-mobile">{actionLabel}</span>
              <span className="project-cta-label-circle-desktop">
                {actionLabel}
              </span>
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [projectLabOpen, setProjectLabOpen] = useState(false);
  const reduced = useReducedMotion();
  const desktopMotion = useDesktopMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    let cancelled = false;
    const preserveReloadPosition = shouldRestoreReloadScroll();

    function landOnSection() {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ block: "start", behavior: "instant" });
    }

    // A real hash navigation should still land on its section. On reload,
    // however, the exact saved scroll position takes precedence so the page
    // does not snap to the top or to the start of the hashed section.
    if (!preserveReloadPosition) {
      landOnSection();
      // Font metrics can change section positions after the first render.
      void document.fonts.ready.then(() => {
        if (!cancelled) landOnSection();
      });
    }

    window.addEventListener("hashchange", landOnSection);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", landOnSection);
    };
  }, []);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <MotionConfig reducedMotion="user">
      <ReadingProgress />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a href="#top" className="wordmark" aria-label="Femi: home">
          <Logo />
        </a>
        <nav
          aria-label="Main navigation"
          id="navigation"
          className={menuOpen ? "nav open" : "nav"}
        >
          {[
            ["Work", "#work"],
            ["Documentation", "#documentation"],
            ["Poetry", "#poetry"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="resume"
            href="/Images/CV.pdf"
            download="Daramola-Femi-CV.pdf"
          >
            Download résumé (PDF) <Arrow direction="down" />
          </a>
        </nav>
        <div className="header-controls">
          <ThemeToggle />
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-controls="navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <main id="main">
        <section id="top" className="hero section-pad">
          <div className="hero-celestial" aria-hidden="true">
            <div className="hero-celestial-glow" />
            <div className="hero-planet" />
            <svg
              className="hero-celestial-rings"
              viewBox="0 0 1200 900"
              preserveAspectRatio="xMidYMid meet"
            >
              <ellipse
                className="celestial-ring celestial-ring-cyan celestial-ring-outer"
                cx="650"
                cy="380"
                rx="505"
                ry="185"
                transform="rotate(-8 650 380)"
              />
              <ellipse
                className="celestial-ring celestial-ring-raspberry"
                cx="650"
                cy="380"
                rx="540"
                ry="220"
                transform="rotate(10 650 380)"
              />
              <ellipse
                className="celestial-ring celestial-ring-cyan celestial-ring-inner"
                cx="650"
                cy="380"
                rx="455"
                ry="152"
                transform="rotate(-17 650 380)"
              />
            </svg>
            <div className="hero-celestial-grid" />
          </div>
          <div className="hero-meta">
            <span>
              <i /> Software engineer & technical writer
            </span>
          </div>
          <motion.div
            initial={
              reduced ? false : { opacity: 0, y: desktopMotion ? 24 : 10 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <h1>
              <span className="hero-line">
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Code with{" "}
                  <em className="hero-emphasis hero-emphasis-intent">
                    intent.
                  </em>
                </motion.span>
              </span>
              <span className="hero-line">
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Words with{" "}
                  <em className="hero-emphasis hero-emphasis-weight">
                    weight.
                  </em>
                </motion.span>
              </span>
            </h1>
          </motion.div>
          <div className="hero-bottom">
            <div className="hero-intro">
              <span className="small-label">Hello, I’m Daramola Femi.</span>
              <p>
                I build software that earns its place
                <br className="desktop-break" /> and write the words that make
                it understood.
              </p>
              <a href="#work" className="text-link">
                Explore my work
                <span className="hero-action-line" aria-hidden="true" />
              </a>
            </div>
            <div className="orbit" aria-hidden="true">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-ring ring-three" />
              <span className="orbit-core">
                <Logo markOnly />
              </span>
              <span className="orbit-caption">Logic meets language</span>
            </div>
            <a
              className="hero-index featured-shortcut"
              href="#project-flux-form"
            >
              Latest work / Flux & Form
              <br />
              <span className="arrow-label">
                Watch the studio move
                <span className="hero-action-line" aria-hidden="true" />
              </span>
            </a>
          </div>
          <div className="hero-rule">
            <span>Engineering / Documentation / Poetry</span>
            <span className="hero-signature">
              An engineer’s archive, with a poet inside.
            </span>
          </div>
        </section>
        <section id="work" className="work section-pad">
          <div className="section-kicker">
            <span>01 / Selected work</span>
            <span>Ideas, made tangible</span>
          </div>
          <ScrollReveal className="section-heading">
            <h2>
              A few things
              <br />
              I’ve put into <em>the world.</em>
            </h2>
            <p>
              Different problems. Different expressions.
              <br />
              The same care in the details.
            </p>
          </ScrollReveal>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
                <span>
                  {String(
                    featuredProjects.filter(
                      (project) =>
                        item === "All work" || project.category === item,
                    ).length,
                  ).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
          <div className="project-grid">
            {featuredProjects
              .filter((p) => filter === "All work" || p.category === filter)
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  reduced={reduced}
                  desktopMotion={desktopMotion}
                />
              ))}
          </div>
          <div className="project-lab">
            <button
              type="button"
              className="project-lab-toggle"
              aria-expanded={projectLabOpen}
              aria-controls="project-lab-collection"
              onClick={() => setProjectLabOpen((open) => !open)}
            >
              <span className="project-lab-heading">
                <span>
                  {projectLabOpen
                    ? "Close the Project Lab"
                    : "Open the Project Lab"}
                </span>
                <small>
                  Other projects in motion.
                </small>
              </span>
              <span className="project-lab-count" aria-hidden="true">
                {String(projectLabProjects.length).padStart(2, "0")} project
                {projectLabProjects.length === 1 ? "" : "s"}
              </span>
            </button>
            <div
              id="project-lab-collection"
              className="project-lab-collection"
              aria-hidden={!projectLabOpen}
            >
              {projectLabOpen && (
                <motion.div
                  className="project-lab-grid"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {projectLabProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      reduced={reduced}
                      desktopMotion={desktopMotion}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>
        <DocumentationSection />
        <section id="about" className="about section-pad">
          <div className="section-kicker">
            <span>03 / The person behind the work</span>
            <span>Craft, with a point of view</span>
          </div>
          <div className="about-grid">
            <div>
              <h2>
                An engineer’s mind.
                <br />A writer’s <em>instinct.</em>
              </h2>
              <div className="about-signature">
                Daramola Femi<span>Software engineer. Technical writer.</span>
              </div>
            </div>
            <ScrollReveal className="about-copy" delay={0.12}>
              <p className="lead">
                I care about what happens on both sides of an interface: the
                system that makes it work, and the person trying to use it.
              </p>
              <p>
                My work moves between frontend engineering, API design, and
                technical documentation. I enjoy giving complex ideas a clear
                structure in a codebase, on a screen, or across a page.
              </p>
              <p>
                I want the things I build to be useful long after the first
                impression. Thoughtful decisions. Clear language. Details that
                hold up in everyday use.
              </p>
              <a
                className="text-link"
                href="/Images/CV.pdf"
                download="Daramola-Femi-CV.pdf"
              >
                <span>A closer look at my experience</span>
                <span className="experience-download-cue" aria-hidden="true">
                  <i />
                  <small>PDF / download</small>
                </span>
              </a>
            </ScrollReveal>
          </div>
          <div className="capabilities">
            {[
              {
                n: "01",
                title: "Interfaces that",
                emphasis: "make sense.",
                text: "Responsive websites and applications, built around how people actually use them.",
                tools: "React / Next.js / TypeScript / Tailwind CSS",
              },
              {
                n: "02",
                title: "Clarity for",
                emphasis: "developers.",
                text: "API references, technical guides, and documentation that help the next person find their way.",
                tools: "API design / Technical writing / Developer experience",
              },
              {
                n: "03",
                title: "Room to",
                emphasis: "experiment.",
                text: "Browser games, Web3, and the ideas that teach you something by asking you to build them.",
                tools: "JavaScript / Solidity / Interaction design",
              },
            ].map((item) => (
              <ScrollReveal key={item.n} delay={Number(item.n) * 0.08}>
                <span className="small-label">{item.n}</span>
                <h3>
                  {item.title} <em>{item.emphasis}</em>
                </h3>
                <p>{item.text}</p>
                <span className="tool-list">{item.tools}</span>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <PoetrySection />
        <div className="interlude" aria-hidden="true">
          <span>Make it work.</span>
          <em>Make it matter.</em>
        </div>
        <Contact />
      </main>
      <footer className="footer">
        <a className="wordmark" href="#top" aria-label="Femi: back to top">
          <Logo />
        </a>
        <span className="footer-copyright">
          © {new Date().getFullYear()} Daramola Femi
        </span>
        <div className="footer-socials">
          <a
            href="https://github.com/DaramolaFemi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/femi-daramola-1218591a3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/darams410"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          <a
            href="https://medium.com/@daramola772"
            target="_blank"
            rel="noopener noreferrer"
          >
            Medium
          </a>
        </div>
        <a href="#top">Back to top</a>
      </footer>
    </MotionConfig>
  );
}
