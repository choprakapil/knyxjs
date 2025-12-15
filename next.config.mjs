const normalizeBasePath = (value) => {
  const cleaned = value?.trim().replace(/^\/|\/$/g, "");
  if (!cleaned) return "";
  return `/${cleaned}`;
};

const normalizeAssetPrefix = (value) => {
  const cleaned = value?.trim().replace(/\/+$/g, "");
  if (!cleaned) return "";
  if (/^(https?:)?\/\//.test(cleaned)) return cleaned;
  return `/${cleaned.replace(/^\/+/, "")}`;
};

const basePath =
  normalizeBasePath(
    process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH
  ) || "";

const assetPrefix =
  normalizeAssetPrefix(
    process.env.NEXT_PUBLIC_ASSET_PREFIX || process.env.ASSET_PREFIX
  ) || basePath || undefined;

import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix
};

export default nextConfig;


// const normalizeBasePath = (value) => {
//   const cleaned = value?.trim().replace(/^\/|\/$/g, "");
//   if (!cleaned) return "";
//   return `/${cleaned}`;
// };

// const normalizeAssetPrefix = (value) => {
//   const cleaned = value?.trim().replace(/\/+$/g, "");
//   if (!cleaned) return "";
//   if (/^(https?:)?\/\//.test(cleaned)) return cleaned;
//   return `/${cleaned.replace(/^\/+/g, "")}`;
// };

// const basePath =
//   normalizeBasePath(
//     process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH
//   ) || "";

// const assetPrefix =
//   normalizeAssetPrefix(
//     process.env.NEXT_PUBLIC_ASSET_PREFIX || process.env.ASSET_PREFIX
//   ) || basePath || undefined;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true
//   },
//   basePath: basePath || undefined,
//   assetPrefix
// };

// export default nextConfig;
