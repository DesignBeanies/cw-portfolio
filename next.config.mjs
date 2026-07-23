import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** Production path prefix for static export (`next build`). Empty = site at domain root (designbeanies.com). */
const prodBasePath = "";

/**
 * Use Next’s `phase` instead of `process.argv`: config is evaluated in contexts
 * where argv does not include `"dev"`, which breaks `basePath` / hydration and
 * leaves dev unstyled.
 *
 * Enable static export only during `next build` — not from NODE_ENV alone.
 */
export default function defineConfig(phase) {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProductionBuild = phase === PHASE_PRODUCTION_BUILD;
  const basePath = isDev ? "" : prodBasePath;

  return {
    ...(isProductionBuild ? { output: "export" } : {}),
    basePath,
    trailingSlash: true,
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
    images: {
      unoptimized: true,
    },
    ...(basePath && !isProductionBuild
      ? {
          async redirects() {
            return [
              {
                source: "/",
                destination: `${prodBasePath}/`,
                basePath: false,
                permanent: false,
              },
            ];
          },
        }
      : {}),
    experimental: {
      optimizePackageImports: ["framer-motion"],
    },
    poweredByHeader: false,
  };
}
