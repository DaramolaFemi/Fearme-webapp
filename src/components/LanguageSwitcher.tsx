import { useEffect, useRef, useState } from "react";
import { languageOptions, useLanguage, type Locale } from "../i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, suggestedLocale, translate } = useLanguage();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const current = languageOptions.find((language) => language.code === locale)!;

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (root.current && !root.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function choose(nextLocale: Locale) {
    setLocale(nextLocale);
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div className="language-switcher" ref={root}>
      <button
        ref={trigger}
        type="button"
        className="language-switcher-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="portfolio-language-list"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{translate("Language")}</span>
        <span className="language-switcher-code">{current.short}</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="language-switcher-backdrop"
            aria-label={translate("Close")}
            onClick={() => setOpen(false)}
          />
          <div
            className="language-switcher-panel"
            role="dialog"
            aria-modal="false"
            aria-label={translate("Choose language")}
          >
            <div className="language-switcher-heading">
              <span>{translate("Language")}</span>
              <small>{translate("Choose the language for the interface.")}</small>
            </div>

            <div
              id="portfolio-language-list"
              className="language-switcher-list"
              role="listbox"
              aria-label={translate("Available languages")}
            >
              {languageOptions.map((language) => {
                const selected = language.code === locale;
                const suggested =
                  language.code === suggestedLocale && language.code !== locale;

                return (
                  <button
                    key={language.code}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={selected ? "is-selected" : undefined}
                    onClick={() => choose(language.code)}
                  >
                    <span className="language-switcher-native">
                      {language.label}
                    </span>
                    <span className="language-switcher-row-meta">
                      {suggested && (
                        <small>{translate("Suggested")}</small>
                      )}
                      <span>{language.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="language-switcher-note">
              {translate(
                "Portfolio interface translated. Poems remain in their original English.",
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
