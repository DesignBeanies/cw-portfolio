"use client";

import { useEffect, useState } from "react";

const RELOAD_KEY = "portfolio-style-reload-attempts";
const MAX_AUTO_RELOADS = 2;

function isStylesHealthy(): boolean {
  if (typeof window === "undefined") return true;

  const root = document.documentElement;
  const body = document.body;
  const neonPink = getComputedStyle(root).getPropertyValue("--neon-pink").trim();
  const bodyBg = getComputedStyle(body).backgroundColor;

  const hasTokens = neonPink.toLowerCase() === "#ff13f0";
  const hasDarkBg =
    bodyBg === "rgb(0, 0, 0)" || bodyBg === "rgba(0, 0, 0, 0)";

  const stylesheet = document.querySelector<HTMLLinkElement>(
    'link[rel="stylesheet"][href*="/_next/static/css/"]',
  );

  return hasTokens && hasDarkBg && Boolean(stylesheet);
}

/**
 * Dev-only guard: detects when Tailwind/CSS failed to load (common after a
 * corrupted .next cache) and auto-reloads once or twice before showing a banner.
 */
export function StyleGuard() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const check = () => {
      if (isStylesHealthy()) {
        sessionStorage.removeItem(RELOAD_KEY);
        setShowBanner(false);
        return;
      }

      const attempts = Number(sessionStorage.getItem(RELOAD_KEY) ?? "0");

      if (attempts < MAX_AUTO_RELOADS) {
        sessionStorage.setItem(RELOAD_KEY, String(attempts + 1));
        window.location.reload();
        return;
      }

      setShowBanner(true);
    };

    const id = window.setTimeout(check, 400);
    return () => window.clearTimeout(id);
  }, []);

  if (!showBanner) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-4 right-4 z-[200] border border-neon-pink bg-surface p-4 shadow-[0_0_24px_rgba(255,19,240,0.25)] md:left-auto md:right-6 md:max-w-md"
    >
      <p className="text-sm font-medium text-text-primary">
        Styles failed to load. Dev server cache is likely stale.
      </p>
      <p className="mt-1 text-xs text-text-muted">
        In your terminal run{" "}
        <code className="text-neon-pink">npm run dev:clean</code>, then hard
        refresh this page.
      </p>
      <button
        type="button"
        onClick={() => {
          sessionStorage.removeItem(RELOAD_KEY);
          window.location.reload();
        }}
        className="focus-neon neon-action neon-cta relative mt-3 inline-flex min-h-[36px] items-center px-4 py-2 text-xs font-medium uppercase tracking-widest"
      >
        <span className="relative z-[1]">Retry</span>
      </button>
    </div>
  );
}
