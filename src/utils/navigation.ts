const SCROLL_PREFIX = "femi:scroll:";

export function isReloadNavigation() {
  if (typeof window === "undefined") return false;

  const [entry] = performance.getEntriesByType(
    "navigation",
  ) as PerformanceNavigationTiming[];

  if (entry) return entry.type === "reload";

  const legacyPerformance = performance as Performance & {
    navigation?: { type?: number };
  };

  return legacyPerformance.navigation?.type === 1;
}

export function getScrollStorageKey() {
  return `${SCROLL_PREFIX}${window.location.pathname}${window.location.search}`;
}

export function readSavedScrollPosition() {
  try {
    const value = sessionStorage.getItem(getScrollStorageKey());
    if (value === null) return null;

    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function writeSavedScrollPosition(y = window.scrollY) {
  try {
    sessionStorage.setItem(getScrollStorageKey(), String(Math.max(0, y)));
  } catch {
    // Scroll restoration is an enhancement. Browsers that block storage
    // should fall back to their native behavior without breaking the page.
  }
}

export function shouldRestoreReloadScroll() {
  return isReloadNavigation() && readSavedScrollPosition() !== null;
}
