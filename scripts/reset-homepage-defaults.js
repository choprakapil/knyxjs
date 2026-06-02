import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultHeroState = {
  videoSrc: "/assets/video/hero.mp4",
  posterImg: "/assets/img/hero/ai/bg-black.jpg",
  bgImage: "/assets/img/hero/ai/bg-black.jpg",
  videoName: "hero.mp4"
};

const defaultStoryState = {
  title: "Brand Story",
  intro: "At KNYX, protection is a craft, and performance is a promise. Born from the spirit of knight, KNYX reflects strength, precision, and timeless honour. We represent the modern athlete — focused, fearless, and equipped. KNYX was created with a singular vision: to build elite sports protection that blends advanced engineering with the classic elegance.",
  sections: [
    {
      id: 1,
      title: "The Origin",
      content: [
        "Inspired by the word NYX, meaning night, and transformed into KNYX, meaning knight, our brand represents the new age athlete — focused, fearless, and equipped. We exist to protect the moments that matter in sport.",
        "We are a sports protection brand built for athletes who play hard, think fast, and demand gear they can trust. Just like a knight’s armour once safeguarded warriors on the battlefield, KNYX exists to protect athletes in their arena.",
        "Our journey begins with cricket—a game of skill, speed, and split-second decisions—where protection isn’t optional, it’s essential."
      ],
      list: []
    },
    {
      id: 2,
      title: "The Modern Knight",
      content: [
        "Every athlete who steps onto the field is a warrior of the game.",
        "At KNYX, protection is not just a feature—it’s a responsibility. Every curve, every layer, every detail is engineered to perform under pressure. KNYX equips players with armour they can rely on — so they can focus on their game, not their safety.",
        "When you wear KNYX, you don’t just wear equipment. You wear confidence. You wear courage. You wear protection worthy of a knight."
      ],
      list: []
    },
    {
      id: 3,
      title: "Heritage & Innovation",
      content: [
        "Cricket carries tradition in every stroke and every stance. We respect that legacy.",
        "KNYX was created with a singular vision: to build elite sports protection that blends advanced engineering with the classic elegance.",
        "Our flagship cricket helmet is designed to preserve the iconic silhouette of the game, while integrating cutting-edge impact protection, lightweight materials, and superior comfort systems.",
        "Every KNYX product is meticulously engineered to deliver uncompromising safety without sacrificing style."
      ],
      list: []
    },
    {
      id: 4,
      title: "Our Philosophy",
      content: [
        "We believe in:"
      ],
      list: [
        "Safety First – Protection that meets and exceeds performance expectations",
        "Player-Focused Design – Comfort, fit, and confidence built in",
        "Relentless Innovation – Always improving, never standing still"
      ],
      footer: "Because when athletes feel protected, they play without hesitation—and that’s when the game is at its best."
    },
    {
      id: 5,
      title: "The KNYX Promise",
      content: [
        "Our journey begins with cricket helmets, but our ambition extends far beyond.",
        "As KNYX continues to evolve, we will introduce new innovations across sports—each designed to redefine safety, performance, and confidence. We are carving a path where the future isn’t something you wait for.",
        "It’s something you wear.",
        "This isn’t the future of sport.",
        "It’s #NowKnyx"
      ],
      list: []
    }
  ]
};

const defaultTechnologyState = {
  hero: {
    badge: "Engineered excellence",
    title: "The Science",
    content: "At KNYX, technology is the core of our design philosophy. Every helmet is the result of advanced engineering, material science, and relentless testing, created to deliver protection you can trust at every level of the game. We use high performance materials selected for their strength to weight ratio, durability and resilience under pressure. Each layer within a KNYX helmet serves a precise function — from outer shell rigidity to inner cushioning — working together as a unified protection system.",
    image: "/assets/img/technology/section_1.png",
    reverse: false
  },
  sections: [
    {
      id: 1,
      title: "Outer Layer",
      content: "The shell of KNYX C7 Cricket Helmets form the cornerstone for Pro Level Players by incorporating layers of Carbon Composite which distribute and dissipate impact energy across the fibre matrix, reducing localized stress and deformation resulting in a lighter shell with higher structural integrity.<br/><br/>Similarly, KNYX C5 and C3 ranges are built with Impact Modified Polymer shell designed to undergo controlled plastic deformation under impact. This absorbs and dissipate energy without cracking or shattering making it a reliable material where accessibility and durability are key.",
      image: "/assets/img/technology/section2.png",
      video: "",
      reverse: true
    },
    {
      id: 2,
      title: "Inner Layer",
      content: "The internal Impact Layer of our C7 and C5 cricket helmets is constructed with Expanded Polypropylene (EPP) which offers superior performance under repeated and variable impact loading conditions. It absorbs energy and returns to its original shape, maintaining protective performance over multiple impacts.<br/><br/>Impact Lining of our C3 and other Cricket Helmets utilise Expanded Polystyrene (EPS) which is effective for a single high impact protection through permanent densification and irreversible cell deformation.",
      image: "/assets/img/technology/section_3.png",
      video: "",
      reverse: false
    },
    {
      id: 3,
      title: "Impact Intelligence",
      content: "KNYX C5 and C7 Cricket Helmet are constructed with our in-house Radial Impact Mitigation (RIM) System. RIM employs unique moulding abilities of EPP to create flexible and autonomous pods that absorb, disperse, and reduce the force of high-speed linear and lateral impacts. Through carefully engineered geometry and energy-dissipating material, we minimized shock transfer while maintaining structural integrity resulting in superior protection without unnecessary bulk.<br/><br/>The Inner Layer of all our other helmets is designed with a variable thickness EPS lining that directs impact forces away from the player’s head while progressively absorbing the shock via singular buckling behaviour.",
      image: "/assets/img/technology/impact_intelligence.png",
      video: "",
      reverse: true
    },
    {
      id: 4,
      title: "Thermal Management",
      content: "The Engineered Ventilation System (EVS) is a designed by-product of the RIM System. This resulted in creation of multiple air pathways in between the Shell and the EPP which increases airflow and reduces heat buildup by generating a cooling wind exchange system in C7 and C5 ranges of helmet.<br/><br/>The C3 and other cricket helmet models take advantage of strategically placed inlets and outlets on the helmet to optimize airflow and regulate temperature allowing players to stay focused under pressure.",
      image: "/assets/img/technology/Thermal_Management.png",
      video: "",
      reverse: false
    },
    {
      id: 5,
      title: "Precision Fit System",
      content: "All of the KNYX helmets feature ergonomic design principles and variable fit systems that ensure stability, comfort, and secure positioning during play because protection is only efficient when it fits perfectly.<br/><br/>KNYX C7 and C5 Cricket Helmets are equipped with patented ISOFIT micro adjustment system. IsoFit adapts to the unique shape of each wearer’s head, delivering a truly personalized fit without ever needing to 3D scan your head. IsoFit evenly distributes helmet weight around the head, keeping the helmet stable, balanced and centred during use.<br/><br/>Fit systems on our C3 and other cricket helmets are designed to tighten around the lower head with either the use of our unique 360 fit system or achieve stability with conforming comfort liner for easy and quick adjustments for a perfect fit.",
      image: "/assets/img/products/6.png",
      video: "/assets/video/Precision_Fit_System.MP4",
      reverse: true
    },
    {
      id: 6,
      title: "Facial Protection",
      content: "Every KNYX Helmet Is equipped with our proprietary Tactical Faceguard engineered for optimal protection. The unique lightweight design expands the frontal as well as peripheral vision for better tracking of the incoming ball. The compact and optimized structure contours to the face while reducing gaps to hinder any possible penetration of the ball and evading facial contact.",
      image: "/assets/img/products/7.png",
      video: "",
      reverse: false
    }
  ]
};

async function main() {
  try {
    const existingSetting = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    let currentContent = {};
    if (existingSetting && existingSetting.content) {
      try {
        currentContent = JSON.parse(existingSetting.content);
      } catch (err) {
        currentContent = {};
      }
    }

    // Set correct home and technology layouts
    currentContent.home = {
      hero: {
        videoSrc: currentContent.home?.hero?.videoSrc || defaultHeroState.videoSrc,
        posterImg: currentContent.home?.hero?.posterImg || defaultHeroState.posterImg,
        bgImage: currentContent.home?.hero?.bgImage || defaultHeroState.bgImage,
        videoName: currentContent.home?.hero?.videoName || defaultHeroState.videoName
      },
      brandStory: defaultStoryState
    };

    currentContent.technology = defaultTechnologyState;

    await prisma.setting.upsert({
      where: { id: 1 },
      update: {
        content: JSON.stringify(currentContent)
      },
      create: {
        id: 1,
        content: JSON.stringify(currentContent),
        logoPath: "/assets/img/logo/logo-white-2.png",
        siteEmail: "contact@knyxsports.com",
        sitePhone: "",
        instagramUrl: "https://www.instagram.com/knyxsports/"
      }
    });

    console.log("✅ Database homepage and technology defaults reset successfully.");
  } catch (error) {
    console.error("❌ Failed to reset database settings row:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
