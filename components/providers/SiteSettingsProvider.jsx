"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { siteData as staticSiteData } from "@/lib/data/site";

const SiteSettingsContext = createContext({
  site: staticSiteData,
  loading: true,
  refresh: () => {},
});

function buildSiteFromSettings(settings) {
  if (!settings) return staticSiteData;

  const socials = [];
  if (settings.instagramUrl) socials.push({ network: "instagram", url: settings.instagramUrl });
  if (settings.facebookUrl) socials.push({ network: "facebook", url: settings.facebookUrl });
  if (settings.twitterUrl) socials.push({ network: "twitter", url: settings.twitterUrl });
  if (settings.linkedinUrl) socials.push({ network: "linkedin", url: settings.linkedinUrl });
  if (settings.youtubeUrl) socials.push({ network: "youtube", url: settings.youtubeUrl });

  return {
    ...staticSiteData,
    logo: {
      ...staticSiteData.logo,
      light: settings.logoPath || staticSiteData.logo.light,
    },
    contact: {
      ...staticSiteData.contact,
      phone: settings.sitePhone ?? staticSiteData.contact.phone,
      email: settings.siteEmail || staticSiteData.contact.email,
    },
    socials: socials.length > 0 ? socials : staticSiteData.socials,
    features: settings.content?.features || null,
    featurePopupGlobal: settings.content?.featurePopupGlobal !== false,
    showDocsMenu: settings.content?.showDocsMenu === true,
  };
}

export function SiteSettingsProvider({ children }) {
  const [site, setSite] = useState(staticSiteData);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSite(buildSiteFromSettings(data.settings));
      }
    } catch {
      setSite(staticSiteData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ site, loading, refresh: load }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
