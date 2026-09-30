import { useLayoutEffect } from "react";
import {
  isReloadNavigation,
  readSavedScrollPosition,
  writeSavedScrollPosition,
} from "../utils/navigation";

export default function ScrollPositionRestoration() {
  useLayoutEffect(() => {
    const isReload = isReloadNavigation();
    const savedY = isReload ? readSavedScrollPosition() : null;
    const shouldRestore = isReload && savedY !== null;

    let cancelled = false;
    let restoring = shouldRestore;
    let restoreFrame = 0;
    let saveFrame = 0;
    const previousScrollRestoration = history.scrollRestoration;
    const restoreDeadline = performance.now() + 5000;

    if (shouldRestore && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const restoreNativeBehavior = () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = previousScrollRestoration;
      }
    };

    const finishRestore = () => {
      if (!restoring) return;
      restoring = false;
      restoreNativeBehavior();
    };

    const restore = () => {
      if (cancelled || !restoring || savedY === null) return;

      const maxY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const targetY = Math.min(savedY, maxY);

      window.scrollTo({
        top: targetY,
        left: 0,
        behavior: "auto",
      });

      if (Math.abs(window.scrollY - savedY) <= 2 || maxY >= savedY) {
        finishRestore();
        return;
      }

      // A reload can briefly render the Suspense fallback before the real page
      // has enough height to reach the saved position. Keep trying through that
      // window, but never lock the browser in a restoration loop indefinitely.
      if (performance.now() >= restoreDeadline) {
        finishRestore();
        writeSavedScrollPosition();
        return;
      }

      restoreFrame = window.requestAnimationFrame(restore);
    };

    const interruptRestore = () => {
      if (!restoring) return;
      window.cancelAnimationFrame(restoreFrame);
      finishRestore();
    };

    const queueSave = () => {
      if (restoring || saveFrame) return;

      saveFrame = window.requestAnimationFrame(() => {
        saveFrame = 0;
        writeSavedScrollPosition();
      });
    };

    const saveImmediately = () => {
      writeSavedScrollPosition();
    };

    window.addEventListener("scroll", queueSave, { passive: true });
    window.addEventListener("pagehide", saveImmediately);
    window.addEventListener("beforeunload", saveImmediately);
    window.addEventListener("wheel", interruptRestore, { passive: true });
    window.addEventListener("touchstart", interruptRestore, { passive: true });
    window.addEventListener("pointerdown", interruptRestore, { passive: true });
    window.addEventListener("keydown", interruptRestore);

    if (shouldRestore) {
      restoreFrame = window.requestAnimationFrame(restore);

      void document.fonts.ready.then(() => {
        if (!cancelled && restoring) restore();
      });

      window.addEventListener("load", restore, { once: true });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(restoreFrame);
      window.cancelAnimationFrame(saveFrame);
      restoreNativeBehavior();
      window.removeEventListener("scroll", queueSave);
      window.removeEventListener("pagehide", saveImmediately);
      window.removeEventListener("beforeunload", saveImmediately);
      window.removeEventListener("wheel", interruptRestore);
      window.removeEventListener("touchstart", interruptRestore);
      window.removeEventListener("pointerdown", interruptRestore);
      window.removeEventListener("keydown", interruptRestore);
      window.removeEventListener("load", restore);
    };
  }, []);

  return null;
}
