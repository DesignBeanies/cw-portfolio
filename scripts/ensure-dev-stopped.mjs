#!/usr/bin/env node
/**
 * Blocks production build while dev server is running on the default port.
 * running both corrupts .next and breaks CSS in dev.
 */
import { execSync } from "node:child_process";

const port = process.env.PORT ?? "3000";

try {
  const out = execSync(`lsof -ti:${port} 2>/dev/null || true`, {
    encoding: "utf8",
  }).trim();

  if (out) {
    console.error(
      `\nbuild: port ${port} is in use (dev server likely running).`,
    );
    console.error(
      "Stop dev first, then build. Or use `npm run preview` for a stable styled preview.\n",
    );
    process.exit(1);
  }
} catch {
  // lsof unavailable; allow build
}
