/**
 * Deep-merge CMS content objects so partial saves (home, technology, etc.)
 * do not wipe sibling sections.
 */
export function deepMerge(target, source) {
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return source !== undefined ? source : target;
  }
  const output = { ...(target && typeof target === "object" && !Array.isArray(target) ? target : {}) };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = output[key];
    if (
      sourceVal &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      output[key] = deepMerge(targetVal, sourceVal);
    } else {
      output[key] = sourceVal;
    }
  }
  return output;
}

export function parseContentJson(raw) {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
