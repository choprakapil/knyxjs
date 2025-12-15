"use client";

import { useEffect } from "react";
import { stripBasePath, withBasePath } from "@/lib/asset";

const REMOTE_ASSET_BASE = process.env.NEXT_PUBLIC_REMOTE_ASSET_BASE || "https://html.aqlova.com/aleric-prevs/aleric/assets";

const getRemoteFallback = (path) => {
  const unprefixed = stripBasePath(path);
  if (!unprefixed.startsWith("/assets/")) return path;
  return `${REMOTE_ASSET_BASE}${unprefixed.replace("/assets/", "/")}`;
};

const ClientRuntime = () => {
  useEffect(() => {
    const applyDataAttributes = () => {
      document.querySelectorAll("[data-background]").forEach((el) => {
        const bg = el.getAttribute("data-background");
        if (!bg) return;
        const normalized = withBasePath(bg);
        const fallback = getRemoteFallback(normalized);

        const img = new Image();
        el.style.backgroundImage = `url(${normalized})`;
        img.onload = () => {
          el.style.backgroundImage = `url(${normalized})`;
        };
        img.onerror = () => {
          el.style.backgroundImage = `url(${fallback})`;
        };
        img.src = normalized;
      });

      document.querySelectorAll("[data-bg-color]").forEach((el) => {
        const color = el.getAttribute("data-bg-color");
        if (color) {
          el.style.backgroundColor = color;
        }
      });
      document.querySelectorAll("[data-img]").forEach((el) => {
        const img = el.getAttribute("data-img");
        if (!img) return;
        el.setAttribute("data-img", withBasePath(img));
      });
      document.querySelectorAll("[data-displacement]").forEach((el) => {
        const d = el.getAttribute("data-displacement");
        if (!d) return;
        el.setAttribute("data-displacement", withBasePath(d));
      });
      document.querySelectorAll("[data-width]").forEach((el) => {
        const width = el.getAttribute("data-width");
        if (width) {
          el.style.width = width;
        }
      });
    };

    const attachImageFallbacks = () => {
      document.querySelectorAll("img").forEach((img) => {
        const rawSrc = img.getAttribute("src");
        if (!rawSrc || rawSrc.startsWith("http")) return;
        const normalized = withBasePath(rawSrc);
        const fallback = getRemoteFallback(normalized);
        if (normalized !== rawSrc) {
          img.src = normalized;
        }
        if (!stripBasePath(normalized).startsWith("/assets/")) return;
        img.addEventListener(
          "error",
          () => {
            if (img.getAttribute("src") !== fallback) {
              img.setAttribute("src", fallback);
            }
          },
          { once: true }
        );
      });
      document
        .querySelectorAll("link[rel='preload'][as='image']")
        .forEach((lnk) => {
          const raw = lnk.getAttribute("href");
          if (!raw || raw.startsWith("http")) return;
          lnk.setAttribute("href", withBasePath(raw));
        });
    };

    applyDataAttributes();
    attachImageFallbacks();

    const observer = new MutationObserver(() => {
      applyDataAttributes();
      attachImageFallbacks();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default ClientRuntime;
