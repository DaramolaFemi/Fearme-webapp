import { useEffect, useState } from "react";
type Theme = "light" | "dark";
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#201c27" : "#f3f0e8");
  }, [theme]);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    function sync() {
      let saved;
      try {
        saved = localStorage.getItem("femi-theme");
      } catch {
        /* Use system preference when storage is unavailable. */
      }
      setTheme(
        saved === "light" || saved === "dark"
          ? saved
          : media.matches
            ? "dark"
            : "light",
      );
    }
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("femi-theme", next);
    } catch {
      /* Toggle still works without persistence. */
    }
    setTheme(next);
  }
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      onClick={toggle}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-track" aria-hidden="true">
        <span className="theme-thumb" />
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
        <svg viewBox="0 0 24 24">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        </svg>
      </span>
    </button>
  );
}
