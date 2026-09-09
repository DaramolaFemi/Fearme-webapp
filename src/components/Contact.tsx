import Arrow from "./Arrow";
import { useEffect, useRef, useState, type FormEvent } from "react";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (controller.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_gotcha") || "")) return;
    if (
      ["name", "email", "message"].some(
        (key) => !String(data.get(key) || "").trim(),
      )
    ) {
      setStatus("error");
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
            daramola772@gmail.com <Arrow />
          </a>
        </div>
        <form onSubmit={submit} aria-label="Contact Femi">
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
            <button className="button" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send a note"} <Arrow />
            </button>
          </div>
          <p className={`form-status ${status}`} role="status">
            {status === "success"
              ? "Your note is on its way. Thank you. I’ll be in touch."
              : status === "error"
                ? "Your note could not be sent. Please try again or email me directly."
                : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
