#!/usr/bin/env node
/**
 * Starts `next dev` with macOS-safe file watching and periodic CSS health probes.
 */
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { probeDevStyles } from "./dev-health-probe.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const rawPort = process.env.PORT ?? "3000";
const port = /^\d+$/.test(String(rawPort)) ? String(rawPort) : "3000";

const url = `http://localhost:${port}/`;
console.log(`\n  Portfolio dev (open this URL): ${url}`);
console.log("  If styles look broken: npm run dev:clean\n");

const env = {
  ...process.env,
  NODE_ENV: "development",
};

const pollingOff = process.env.PORTFOLIO_DEV_POLLING === "false";
if (!pollingOff && process.env.WATCHPACK_POLLING === undefined) {
  env.WATCHPACK_POLLING = "true";
}

if (process.platform === "darwin" && !pollingOff) {
  console.log(
    "  Dev: WATCHPACK_POLLING=true (avoids macOS EMFILE / missing CSS). Set PORTFOLIO_DEV_POLLING=false to disable.\n",
  );
}

function spawnDev() {
  if (process.platform === "darwin") {
    const cmd = `ulimit -n 10240 2>/dev/null; exec npx next dev -H 0.0.0.0 -p "${port}"`;
    return spawn("sh", ["-c", cmd], {
      cwd: root,
      stdio: "inherit",
      env,
    });
  }

  return spawn("npx", ["next", "dev", "-H", "0.0.0.0", "-p", port], {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env,
  });
}

const child = spawnDev();
let probeTimer;
let probeInterval;

child.on("spawn", () => {
  void probeDevStyles(port);

  probeTimer = setTimeout(() => {
    probeInterval = setInterval(() => {
      void probeDevStyles(port);
    }, 45_000);
  }, 30_000);
});

child.on("exit", (code, signal) => {
  clearTimeout(probeTimer);
  clearInterval(probeInterval);
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
