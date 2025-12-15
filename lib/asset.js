const normalizeBasePath = (value) => {
  const cleaned = value?.trim().replace(/^\/|\/$/g, "") ?? "";
  if (!cleaned) return "";
  return `/${cleaned}`;
};

const basePath =
  normalizeBasePath(
    process.env.NEXT_PUBLIC_BASE_PATH || process.env.NEXT_BASE_PATH
  ) || "";

const normalizeAssetPrefix = (value) => {
  const cleaned = value?.trim().replace(/\/+$/g, "") ?? "";
  if (!cleaned) return "";
  if (/^(https?:)?\/\//.test(cleaned)) return cleaned;
  return `/${cleaned.replace(/^\/+/, "")}`;
};

const assetPrefix =
  normalizeAssetPrefix(
    process.env.NEXT_PUBLIC_ASSET_PREFIX || process.env.ASSET_PREFIX
  ) || basePath;

export const withBasePath = (path) => {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (assetPrefix && normalized.startsWith(assetPrefix + "/")) {
    return normalized;
  }

  return `${assetPrefix}${normalized}` || normalized;
};

export const stripBasePath = (path) => {
  if (!path || !assetPrefix) return path;
  return path.startsWith(assetPrefix) ? path.slice(assetPrefix.length) || "/" : path;
};

export const PUBLIC_BASE_PATH = assetPrefix;
