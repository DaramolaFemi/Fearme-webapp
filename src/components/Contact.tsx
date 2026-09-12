import Arrow from "./Arrow";
import { useEffect, useRef, useState, type FormEvent } from "react";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "invalid"
  >("idle");
  const successRegion = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status !== "success") return;
    const region = successRegion.current;
    region?.focus({ preventScroll: true });
    if (region && window.matchMedia("(max-width: 600px)").matches) {
      const bounds = region.getBoundingClientRect();
      if (bounds.bottom > window.innerHeight || bounds.top < 0) {
        region.scrollIntoView({ block: "nearest", behavior: "instant" });
      }
    }
  }, [status]);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (controller.current || status === "success") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") || "")) return;
    if (
      ["name", "email", "message"].some(
        (key) => !String(data.get(key) || "").trim(),
      )
    ) {
      setStatus("invalid");
      return;
    }
    const abort = new AbortController();
    controller.current = abort;
    const timeout = window.setTimeout(() => abort.abort(), 15000);
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mjgqlpvo", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: abort.signal,
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      controller.current = null;
    }
  }
  return (
    <section id="contact" className="contact section-pad">
      <div className="section-kicker">
        <span>05 / A conversation</span>
        <span>Good work starts here</span>
      </div>
      <div className="contact-grid">
        <div>
          <h2>
            Have something
            <br />
            on your <em>mind?</em>
          </h2>
          <p>
            A product taking shape. Documentation that needs a clearer voice. An
            idea you keep coming back to. I’d like to hear it.
          </p>
          <a className="email-link" href="mailto:daramola772@gmail.com">
            daramola772@gmail.com
          </a>
        </div>
        <form
          onSubmit={submit}
          onInput={() => {
            if (status === "success" || status === "invalid") setStatus("idle");
          }}
          aria-label="Contact Femi"
        >
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="What should I call you?"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                maxLength={254}
              />
            </label>
          </div>
          <label>
            A little about your project
            <textarea
              name="message"
              placeholder="The idea, the challenge, the ambition…"
              required
              minLength={10}
              maxLength={5000}
              rows={4}
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave this empty
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="form-bottom">
            <span>
              Delivered via Formspree.
              <br />
              Your details are used to reply.
            </span>
            <button
              className="button"
              disabled={status === "sending" || status === "success"}
            >
              {status === "sending"
                ? "Sending…"
                : status === "success"
                  ? "Message sent"
                  : "Send a note"}{" "}
              <Arrow />
            </button>
          </div>
          <div
            ref={successRegion}
            className={`form-status ${status === "success" ? "success" : ""}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            tabIndex={-1}
          >
            {status === "success" && (
              <>
                <strong>Message sent to Daramola Femi.</strong>
                <p>
                  Thank you. I’ve received your note and will get back to you
                  soon.
                </p>
              </>
            )}
          </div>
          {(status === "error" || status === "invalid") && (
            <p className="form-status error" role="alert">
              {status === "invalid"
                ? "Please complete your name, email address, and message."
                : "Your message could not be sent. Please try again or email me directly."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
