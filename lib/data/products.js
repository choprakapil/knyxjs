// ──────────────────────────────────────────────
// Feature Dictionary — each entry has a unique `id`
// ──────────────────────────────────────────────
const featureMap = {
    carbon_composite: {
        id: "carbon_composite",
        iconImg: "logo-4.png",
        title: "CARBON COMPOSITE",
        desc: "Carbon Composite Reinforced Shell with matte painted finish",
        detail: {
            headline: "Carbon Composite Reinforced Shell",
            intro: "Engineered for elite cricketers who demand ultra-lightweight construction and uncompromising protection.",
            highlights: ["Carbon Composite Reinforced Shell", "Matte painted finish"],
            specs: { Material: "Carbon Composite" },
        },
    },
    impact_polymer: {
        id: "impact_polymer",
        iconImg: "logo-4.png",
        title: "IMPACT POLYMER",
        desc: "Impact Modified Polymer Shell with matte painted finish",
        detail: {
            headline: "Impact Modified Polymer Shell",
            intro: "Lightweight and designed for maximum protection across every class of cricket.",
            highlights: ["Impact Modified Polymer Shell", "Matte painted finish"],
            specs: { Material: "Impact Modified Polymer" },
        },
    },
    epp: {
        id: "epp",
        iconImg: "logo-7.png",
        title: "EPP LINER",
        desc: "High Density EPP shock absorbing liner",
        detail: {
            headline: "High Density EPP Liner",
            intro: "Shock absorbing liner designed to mitigate extreme impacts.",
            highlights: ["High Density EPP", "Multi-impact absorbing"],
            specs: { Material: "Expanded Polypropylene" },
        },
    },
    rim: {
        id: "rim",
        iconImg: "logo-1.png",
        title: "RIM",
        desc: "RIM (Radial Impact Mitigation) System for elastic shock absorption",
        detail: {
            headline: "Radial Impact Mitigation",
            intro: "Handles impacts from every direction using elastic shock absorption.",
            highlights: ["Elastic shock absorption", "Multi-directional protection"],
            specs: { Technology: "RIM Elastic System" },
        },
    },
    evs: {
        id: "evs",
        iconImg: "logo-5.png",
        title: "EVS",
        desc: "EVS (Engineered Ventilation System) for enhanced air flow",
        detail: {
            headline: "Engineered Ventilation System",
            intro: "Continuous cooling airflow across the head ensuring maximum comfort.",
            highlights: ["Enhanced air flow", "Strategic intake/exhaust routing"],
            specs: { System: "EVS Channels" },
        },
    },
    isofit: {
        id: "isofit",
        iconImg: "logo-8.png",
        title: "ISOFIT",
        desc: "ISOFIT size adjustment system",
        detail: {
            headline: "ISOFIT Adjustment System",
            intro: "Micro-adjustable system that accommodates different head sizes in a single shell.",
            highlights: ["Maximum size range cover", "Personalized comfort"],
            specs: { Adjustment: "Dial-in Ratchet" },
        },
    },
    koolform: {
        id: "koolform",
        iconImg: "logo-6.png",
        title: "KOOLFORM",
        desc: "KoolForm comfort liner padding",
        detail: {
            headline: "KoolForm Comfort Padding",
            intro: "Included in varied thicknesses for your very own personalization and maximum comfort.",
            highlights: ["Varied thickness options", "Moisture-wicking comfort"],
            specs: { Material: "KoolForm Foam" },
        },
    },
    titanium_grille: {
        id: "titanium_grille",
        iconImg: "logo.png",
        title: "TITANIUM",
        desc: "Titanium Tactical Faceguard",
        detail: {
            headline: "Titanium Tactical Faceguard",
            intro: "Unparalleled facial protection without compromising on weight or visibility.",
            highlights: ["Aerospace-grade Titanium", "Ultra-lightweight"],
            specs: { Material: "Titanium" },
        },
    },
    steel_grille: {
        id: "steel_grille",
        iconImg: "logo.png",
        title: "CARBON STEEL",
        desc: "Carbon Steel Tactical Faceguard",
        detail: {
            headline: "Carbon Steel Tactical Faceguard",
            intro: "High-grade carbon steel provides uncompromising strength and defense.",
            highlights: ["High tensile strength", "Maximum impact resistance"],
            specs: { Material: "Carbon Steel" },
        },
    },
    maglock: {
        id: "maglock",
        iconImg: "logo-3.png",
        title: "MAGLOCK",
        desc: "Maglock quick fastening and release magnetic buckle system",
        detail: {
            headline: "Maglock Buckle System",
            intro: "Self-aligning magnetic buckle system you can fasten and release instantly.",
            highlights: ["Magnetic quick-release", "Glove-compatible operation"],
            specs: { Mechanism: "Magnetic" },
        },
    },
    quick_release: {
        id: "quick_release",
        iconImg: "logo-3.png",
        title: "QUICK RELEASE",
        desc: "Quick release buckle system",
        detail: {
            headline: "Quick Release Buckle",
            intro: "Fast and secure buckle system for immediate release.",
            highlights: ["Rapid deployment", "High-tension secure hold"],
            specs: { Mechanism: "Standard Clip" },
        },
    },
};

/**
 * Safely resolve a feature by its ID.
 * Returns the feature object or null if the ID is invalid.
 */
export const getFeature = (id) => {
    if (!id || typeof id !== "string") return null;
    return featureMap[id] || null;
};

// ──────────────────────────────────────────────
// Product Categories
// ──────────────────────────────────────────────
export const productCategories = [
    { id: "cat-1", name: "Helmet", slug: "helmet" },
];

// ──────────────────────────────────────────────
// Products — exact structured data
// ──────────────────────────────────────────────
export const professionalProducts = [
    {
        id: "product-1",
        name: "C7 Iso Pro",
        slug: "c7-iso-pro",
        image: "1.png",
        category: "Professional",
        categorySlug: "helmet",
        level: "Pro",
        grilleType: "Titanium",
        certification: "BS 7928:2013 + A1:2019",
        sizes: ["Regular (54-61cm)"],
        colors: [
            { name: "Navy", color: "#000080" },
            { name: "Black", color: "#000000" },
            { name: "Maroon", color: "#800000" },
            { name: "Green", color: "#008000" },
        ],
        description: "The Engineered Solution for Pro Level Players. Every component of this helmet is designed for elite cricketers who demand ultra-lightweight construction, uncompromising protection, superior ventilation and an advanced fit system.",
        gallery: ["1.png", "5.png", "12.png", "9.png"],
        techText: [
            "Carbon Composite Reinforced Shell with matte painted finish",
            "High Density EPP shock absorbing liner",
            "RIM (Radial Impact Mitigation) System for elastic shock absorption",
            "EVS (Engineered Ventilation System) for enhanced air flow",
            "ISOFIT size adjustment system",
            "KoolForm comfort liner padding",
            "Titanium Tactical Faceguard",
            "Maglock quick fastening and release magnetic buckle system",
        ],
        featureIds: [
            "carbon_composite",
            "epp",
            "rim",
            "evs",
            "isofit",
            "koolform",
            "titanium_grille",
            "maglock",
        ],
        sizingTitle: "Helmet Sizing",
        sizingText: "Our \"Iso\" range of helmets come fitted with Isofit adjustment system which is able to accommodate different head sizes in a single shell allowing maximum size range cover.\n\nTry the helmet out of the box and turn the ratchet to best suit your comfort.\n\nEvery helmet includes KoolForm Comfort Liner in varied thickness for your very own personalization.",
        accessories: ["Neck Shield Pro (Included in every helmet box)"],
    },
    {
        id: "product-1b",
        name: "C7 Iso",
        slug: "c7-iso",
        image: "2.png",
        category: "Professional",
        categorySlug: "helmet",
        level: "Pro",
        grilleType: "Carbon Steel",
        certification: "BS 7928:2013 + A1:2019",
        sizes: ["Regular (54-61cm)"],
        colors: [
            { name: "Navy", color: "#000080" },
            { name: "Black", color: "#000000" },
            { name: "Maroon", color: "#800000" },
            { name: "Green", color: "#008000" },
        ],
        description: "The Engineered Solution for Pro Level Players. Every component of this helmet is designed for elite cricketers who demand uncompromising protection, superior ventilation and an advanced fit system.",
        gallery: ["2.png", "5.png", "12.png", "9.png"],
        techText: [
            "Carbon Composite Reinforced Shell with matte painted finish",
            "High Density EPP shock absorbing liner",
            "RIM (Radial Impact Mitigation) System for elastic shock absorption",
            "EVS (Engineered Ventilation System) for enhanced air flow",
            "ISOFIT size adjustment system",
            "KoolForm comfort liner padding",
            "Carbon Steel Tactical Faceguard",
            "Quick release buckle system",
        ],
        featureIds: [
            "carbon_composite",
            "epp",
            "rim",
            "evs",
            "isofit",
            "koolform",
            "steel_grille",
            "quick_release",
        ],
        sizingTitle: "Helmet Sizing",
        sizingText: "Our \"Iso\" range of helmets come fitted with Isofit adjustment system which is able to accommodate different head sizes in a single shell allowing maximum size range cover.\n\nTry the helmet out of the box and turn the ratchet to best suit your comfort.\n\nEvery helmet includes KoolForm Comfort Liner in varied thickness for your very own personalization.",
        accessories: ["Neck Shield Pro (Included in every helmet box)"],
    },
    {
        id: "product-1c",
        name: "C5 Iso Pro",
        slug: "c5-iso-pro",
        image: "3.png",
        category: "Professional",
        categorySlug: "helmet",
        level: "All Class",
        grilleType: "Titanium",
        certification: "BS 7928:2013 + A1:2019",
        sizes: ["Regular (54-61cm)"],
        colors: [
            { name: "Navy", color: "#000080" },
            { name: "Black", color: "#000000" },
            { name: "Maroon", color: "#800000" },
            { name: "Green", color: "#008000" },
        ],
        description: "The Engineered Product for every class of cricket. This lightweight product is designed for maximum protection, superior ventilation and an advanced fit system.",
        gallery: ["3.png", "5.png", "12.png", "9.png"],
        techText: [
            "Impact Modified Polymer Shell with matte painted finish",
            "High Density EPP shock absorbing liner",
            "RIM (Radial Impact Mitigation) System for elastic shock absorption",
            "EVS (Engineered Ventilation System) for enhanced air flow",
            "ISOFIT size adjustment system",
            "KoolForm comfort liner padding",
            "Titanium Tactical Faceguard",
            "Maglock quick fastening and release magnetic buckle system",
        ],
        featureIds: [
            "impact_polymer",
            "epp",
            "rim",
            "evs",
            "isofit",
            "koolform",
            "titanium_grille",
            "maglock",
        ],
        sizingTitle: "Helmet Sizing",
        sizingText: "Our \"Iso\" range of helmets come fitted with Isofit adjustment system which is able to accommodate different head sizes in a single shell allowing maximum size range cover.\n\nTry the helmet out of the box and turn the ratchet to best suit your comfort.\n\nEvery helmet includes KoolForm Comfort Liner in varied thickness for your very own personalization.",
        accessories: ["Neck Shield Pro (Included in every helmet box)"],
    },
    {
        id: "product-1d",
        name: "C5 Iso",
        slug: "c5-iso",
        image: "4.png",
        category: "Professional",
        categorySlug: "helmet",
        level: "All Class",
        grilleType: "Carbon Steel",
        certification: "BS 7928:2013 + A1:2019",
        sizes: ["Regular (54-61cm)"],
        colors: [
            { name: "Navy", color: "#000080" },
            { name: "Black", color: "#000000" },
            { name: "Maroon", color: "#800000" },
            { name: "Green", color: "#008000" },
        ],
        description: "The Engineered Product for every class of cricket. This product is designed for maximum protection, superior ventilation and an advanced fit system.",
        gallery: ["4.png", "5.png", "12.png", "9.png"],
        techText: [
            "Impact Modified Polymer Shell with matte painted finish",
            "High Density EPP shock absorbing liner",
            "RIM (Radial Impact Mitigation) System for elastic shock absorption",
            "EVS (Engineered Ventilation System) for enhanced air flow",
            "ISOFIT size adjustment system",
            "KoolForm comfort liner padding",
            "Carbon Steel Tactical Faceguard",
            "Quick release buckle system",
        ],
        featureIds: [
            "impact_polymer",
            "epp",
            "rim",
            "evs",
            "isofit",
            "koolform",
            "steel_grille",
            "quick_release",
        ],
        sizingTitle: "Helmet Sizing",
        sizingText: "Our \"Iso\" range of helmets come fitted with Isofit adjustment system which is able to accommodate different head sizes in a single shell allowing maximum size range cover.\n\nTry the helmet out of the box and turn the ratchet to best suit your comfort.\n\nEvery helmet includes KoolForm Comfort Liner in varied thickness for your very own personalization.",
        accessories: ["Neck Shield Pro (Included in every helmet box)"],
    },
];

export const amateurProducts = [];
export const allProducts = [...professionalProducts, ...amateurProducts];
