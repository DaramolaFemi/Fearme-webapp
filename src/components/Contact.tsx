import Arrow from "./Arrow";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLanguage } from "../i18n";

export default function Contact() {
  const { translate } = useLanguage();
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
        <span>05 / {translate("A conversation")}</span>
        <span>{translate("Good work starts here")}</span>
      </div>
      <div className="contact-grid">
        <div>
          <h2>
            {translate("Have something")}
            <br />
            {translate("on your")} <em>{translate("mind?")}</em>
          </h2>
          <p>
            {translate("A product taking shape. Documentation that needs a clearer voice. An idea you keep coming back to. I’d like to hear it.")}
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
          aria-label={translate("Contact Femi")}
        >
          <div className="form-row">
            <label>
              {translate("Your name")}
              <input
                name="name"
                autoComplete="name"
                placeholder={translate("What should I call you?")}
                required
                maxLength={100}
              />
            </label>
            <label>
              {translate("Email address")}
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
            {translate("A little about your project")}
            <textarea
              name="message"
              placeholder={translate("The idea, the challenge, the ambition…")}
              required
              minLength={10}
              maxLength={5000}
              rows={4}
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              {translate("Leave this empty")}
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="form-bottom">
            <span>
              {translate("Delivered via Formspree.")}
              <br />
              {translate("Your details are used to reply.")}
            </span>
            <button
              className="button"
              disabled={status === "sending" || status === "success"}
            >
              {translate(
                status === "sending"
                  ? "Sending…"
                  : status === "success"
                    ? "Message sent"
                    : "Send a note",
              )}{" "}
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
                <strong>{translate("Message sent to Daramola Femi.")}</strong>
                <p>
                  {translate("Thank you. I’ve received your note and will get back to you soon.")}
                </p>
              </>
            )}
          </div>
          {(status === "error" || status === "invalid") && (
            <p className="form-status error" role="alert">
              {translate(
                status === "invalid"
                  ? "Please complete your name, email address, and message."
                  : "Your message could not be sent. Please try again or email me directly.",
              )}
            </p>
          )}
        </form>
      </div>
      <div className="contact-footer-curve" aria-hidden="true">
        <svg
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            d="M0 18 C155 18 205 108 370 108 H1165 C1305 108 1365 92 1440 18"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
