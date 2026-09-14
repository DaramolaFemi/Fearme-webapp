import { useEffect, useRef } from "react";
import "./gameplay-preview.css";

type Connection = EventTarget & { saveData?: boolean };

export default function GameplayPreview({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current!;
    const visual = video.parentElement!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const touch = matchMedia(
      "(max-width: 600px), (hover: none), (pointer: coarse)",
    );
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    let inView = false;
    let hovered = false;
    let active = false;
    let failed = false;
    let disposed = false;
    let attempt = 0;

    function stop() {
      attempt += 1;
      active = false;
      video.classList.remove("is-playing");
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
    }

    function update() {
      const blocked = reduced.matches || connection?.saveData;
      const focused = visual.contains(document.activeElement);
      const wanted =
        !blocked &&
        !failed &&
        !document.hidden &&
        inView &&
        (touch.matches || hovered || focused);

      if (!wanted) {
        stop();
        if (blocked && video.hasAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
        return;
      }
      if (active) return;
      active = true;
      const currentAttempt = ++attempt;
      // Reuse the already displayed responsive poster; no extra initial fetch.
      video.poster = visual.querySelector("img")?.currentSrc || poster;
      if (!video.hasAttribute("src")) video.src = src;
      video.muted = true;
      void video.play().catch(() => {
        if (disposed || !active || currentAttempt !== attempt) return;
        failed = true;
        stop();
      });
    }

    function playing() {
      if (active && !disposed) video.classList.add("is-playing");
      else stop();
    }
    function error() {
      failed = true;
      stop();
    }
    function enter() {
      hovered = true;
      failed = false;
      update();
    }
    function leave() {
      hovered = false;
      update();
    }
    function focus() {
      failed = false;
      update();
    }
    function blur() {
      queueMicrotask(() => {
        if (!disposed) update();
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.6;
        update();
      },
      { threshold: [0, 0.6] },
    );
    observer.observe(visual);
    visual.addEventListener("pointerenter", enter);
    visual.addEventListener("pointerleave", leave);
    visual.addEventListener("focusin", focus);
    visual.addEventListener("focusout", blur);
    video.addEventListener("playing", playing);
    video.addEventListener("error", error);
    reduced.addEventListener("change", update);
    touch.addEventListener("change", update);
    connection?.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    return () => {
      disposed = true;
      observer.disconnect();
      visual.removeEventListener("pointerenter", enter);
      visual.removeEventListener("pointerleave", leave);
      visual.removeEventListener("focusin", focus);
      visual.removeEventListener("focusout", blur);
      video.removeEventListener("playing", playing);
      video.removeEventListener("error", error);
      reduced.removeEventListener("change", update);
      touch.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      stop();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, poster]);

  return (
    <video
      ref={ref}
      className="gameplay-preview"
      preload="none"
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
