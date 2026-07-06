import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin", 10);

  // Create or update admin user
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { password },
    create: {
      email: "admin@example.com",
      password,
      role: "admin",
    },
  });

  console.log("✅ Admin user created:", user.email);

  // Create default settings
  const settings = await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      logoPath: "/assets/img/logo/logo-white-2.png",
      siteEmail: "contact@knyxsports.com",
      sitePhone: "",
      instagramUrl: "https://www.instagram.com/knyxsports/",
      facebookUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
      youtubeUrl: "",
      distributors: "[]",
    },
  });

  console.log("✅ Default settings created");

  // Create sample categories
  const categories = [
    { name: "Helmet", slug: "helmet" },
    { name: "Neck Protection", slug: "neck-protection" },
    { name: "Performance Wear", slug: "performance-wear" },
    { name: "Accessories", slug: "accessories" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("✅ Sample categories created");
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
