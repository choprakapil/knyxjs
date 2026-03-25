/**
 * Converts a string value into a URL-friendly slug.
 * @param {string} value - The value to slugify.
 * @returns {string} The slugified string.
 */
export const slugify = (value) =>
    String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
