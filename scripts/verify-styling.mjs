#!/usr/bin/env node
/**
 * Post-build guard: ensures Next emitted CSS under .next/static/css.
 * Run after `npm run build`.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function fail(message) {
  console.error(`verify-styling: ${message}`);
  process.exit(1);
}

const cssDir = join(root, ".next", "static", "css");
if (!existsSync(cssDir)) {
  fail(
    "Missing .next/static/css. Run `npm run build` first; CSS may not have compiled.",
  );
}

const cssFiles = readdirSync(cssDir).filter((file) => file.endsWith(".css"));
if (cssFiles.length === 0) {
  fail("No .css files under .next/static/css.");
}

const tailwindConfigPath = join(root, "tailwind.config.ts");
if (!existsSync(tailwindConfigPath)) {
  fail("Missing tailwind.config.ts.");
}

const tailwindConfig = readFileSync(tailwindConfigPath, "utf8");
if (!tailwindConfig.includes("./src/lib/")) {
  fail(
    'tailwind.config.ts content must include "./src/lib/**/*" so typography tokens are scanned.',
  );
}

console.log(`verify-styling: OK (${cssFiles.length} CSS file(s))`);
