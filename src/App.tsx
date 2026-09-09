import Arrow from "./components/Arrow";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import { projects, filters } from "./data/projects";
import Contact from "./components/Contact";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Lenis from "lenis";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All work");
  const reduced = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -90 },
      duration: 0.9,
    });
    return () => lenis.destroy();
  }, [reduced]);
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
    <>
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
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
              <Arrow />
            </a>
          ))}
          <a
            className="resume"
            href="/Images/CV.pdf"
            download="Daramola-Femi-CV.pdf"
          >
            Download résumé (PDF) <span aria-hidden="true">↓</span>
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
          <div className="hero-meta">
            <span>
              <i /> Software engineer & technical writer
            </span>
            <span>Based in Nigeria · Working everywhere</span>
          </div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
          >
            <h1>
              Code with <em>intent.</em>
              <br />
              Words with <em>weight.</em>
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
                Explore my work <span aria-hidden="true">↓</span>
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
              href="#project-bouldwood"
            >
              Latest work / Bouldwood
              <br />
              Step inside the showroom <Arrow />
            </a>
          </div>
          <div className="hero-rule">
            <span>Engineering / Interfaces / Documentation</span>
            <span>
              Scroll to discover <span aria-hidden="true">↓</span>
            </span>
          </div>
        </section>
        <section id="work" className="work section-pad">
          <div className="section-kicker">
            <span>01 / Selected work</span>
            <span>Ideas, made tangible</span>
          </div>
          <div className="section-heading">
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
          </div>
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
                    projects.filter(
                      (project) =>
                        item === "All work" || project.category === item,
                    ).length,
                  ).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
          <div className="project-grid">
            {projects
              .filter((p) => filter === "All work" || p.category === filter)
              .map((project) => (
                <motion.article
                  className={`project ${project.theme}`}
                  id={`project-${project.theme}`}
                  key={project.id}
                  initial={false}
                  whileInView={{ y: 0 }}
                  whileHover={reduced ? undefined : { y: -3 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  viewport={{ once: true }}
                >
                  <a
                    className="project-visual"
                    href={project.href || "#contact"}
                    target={project.href ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={
                      project.href
                        ? `Visit ${project.name} (opens in a new tab)`
                        : `Request a walkthrough of ${project.name}`
                    }
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.name} interface`}
                        loading={project.id === "01" ? "eager" : "lazy"}
                        width={1200}
                        height={800}
                      />
                    ) : (
                      <div className="weather-art">
                        <span className="weather-location">LAGOS, NIGERIA</span>
                        <div className="sun" />
                        <span className="weather-degree">
                          29<span>°</span>
                        </span>
                        <div className="weather-caption">
                          <span>
                            A little sun.
                            <br />A slower afternoon.
                          </span>
                          <span>
                            Harmattan
                            <br />
                            The 9ja Skies
                          </span>
                        </div>
                        <span className="art-note">Project illustration</span>
                      </div>
                    )}
                    <span className="project-open">
                      <Arrow />
                    </span>
                  </a>
                  <div className="project-heading">
                    <h3>
                      <span>{project.id}</span>
                      {project.name}
                    </h3>
                    <span>{project.type}</span>
                  </div>
                  <a
                    className="project-status"
                    href={project.href || "#contact"}
                    target={project.href ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {project.href
                      ? "View live project"
                      : "Request a walkthrough (not yet hosted)"}{" "}
                    <Arrow />
                  </a>
                  <h4>{project.subtitle}</h4>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
          </div>
        </section>
        <section id="about" className="about section-pad">
          <div className="section-kicker">
            <span>02 / The person behind the work</span>
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
            <div className="about-copy">
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
                A closer look at my experience <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="capabilities">
            {[
              {
                n: "01",
                title: "Interfaces that make sense",
                text: "Responsive websites and applications, built around how people actually use them.",
                tools: "React / Next.js / TypeScript / Tailwind CSS",
              },
              {
                n: "02",
                title: "Clarity for developers",
                text: "API references, technical guides, and documentation that help the next person find their way.",
                tools: "API design / Technical writing / Developer experience",
              },
              {
                n: "03",
                title: "Room to experiment",
                text: "Browser games, Web3, and the ideas that teach you something by asking you to build them.",
                tools: "JavaScript / Solidity / Interaction design",
              },
            ].map((item) => (
              <div key={item.n}>
                <span className="small-label">{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="tool-list">{item.tools}</span>
              </div>
            ))}
          </div>
        </section>
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
        <span>© {new Date().getFullYear()} Daramola Femi</span>
        <div>
          <a
            href="https://github.com/DaramolaFemi"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <Arrow />
          </a>
          <a
            href="https://www.linkedin.com/in/femi-daramola-1218591a3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <Arrow />
          </a>
          <a
            href="https://x.com/darams410"
            target="_blank"
            rel="noopener noreferrer"
          >
            X <Arrow />
          </a>
        </div>
        <a href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}
