#!/usr/bin/env node
/**
 * Dev-only: probes layout.css after the server starts. Logs a clear fix when
 * CSS chunks 404/500 (corrupted .next cache on macOS).
 */
import { setTimeout as sleep } from "node:timers/promises";

export async function probeDevStyles(port) {
  const base = `http://127.0.0.1:${port}`;
  await sleep(2500);

  try {
    const pageRes = await fetch(base, { redirect: "follow" });
    if (!pageRes.ok) {
      warn(port, `home page returned ${pageRes.status}`);
      return false;
    }

    const html = await pageRes.text();
    const match = html.match(/href="(\/_next\/static\/css\/[^"?]+\.css[^"]*)"/);
    if (!match) {
      warn(port, "no layout.css link found in HTML");
      return false;
    }

    const cssRes = await fetch(`${base}${match[1]}`);
    if (!cssRes.ok) {
      warn(port, `layout.css returned ${cssRes.status}`);
      return false;
    }

    const css = await cssRes.text();
    if (!css.includes("--neon-pink") || !css.includes("--bg")) {
      warn(port, "CSS loaded but design tokens missing");
      return false;
    }

    console.log("  Dev health: CSS OK\n");
    return true;
  } catch (error) {
    warn(port, error instanceof Error ? error.message : String(error));
    return false;
  }
}

function warn(port, detail) {
  console.warn("\n  ⚠ Dev health: styles may be broken (" + detail + ")");
  console.warn("  Fix: npm run dev:clean");
  console.warn(`  Then open http://localhost:${port}/\n`);
}
