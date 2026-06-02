#!/usr/bin/env node

/**
 * Admin Panel Setup Helper Script
 * Run this script to set up the admin panel after database migration
 * 
 * Usage: node scripts/setup-admin.js [email] [password]
 * Example: node scripts/setup-admin.js admin@example.com mySecurePassword123
 */

import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const DEFAULT_EMAIL = "admin@knyxsports.com";
const DEFAULT_PASSWORD = "admin123456";

async function setupAdminPanel() {
  console.log("\n🚀 Starting Admin Panel Setup...\n");

  const email = process.argv[2] || DEFAULT_EMAIL;
  const password = process.argv[3] || DEFAULT_PASSWORD;

  try {
    // 1. Check if admin user exists
    console.log("📝 Checking for existing admin user...");
    let adminUser = await prisma.user.findUnique({
      where: { email }
    });

    if (adminUser) {
      console.log(`✅ Admin user already exists: ${email}`);
    } else {
      // 2. Create admin user
      console.log(`📝 Creating new admin user: ${email}`);
      const hashedPassword = await bcrypt.hash(password, 10);
      
      adminUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "admin"
        }
      });

      console.log(`✅ Admin user created successfully!`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   ID: ${adminUser.id}`);
    }

    // 3. Check and create default settings
    console.log("\n📝 Setting up default site configuration...");
    let settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    if (!settings) {
      settings = await prisma.setting.create({
        data: {
          id: 1,
          logoPath: "/assets/img/logo/logo-white-2.png",
          siteEmail: "contact@knyxsports.com",
          sitePhone: "",
          instagramUrl: "https://www.instagram.com/knyxsports/",
          facebookUrl: "",
          twitterUrl: "",
          linkedinUrl: "",
          stockists: []
        }
      });

      console.log("✅ Default settings created");
    } else {
      console.log("✅ Settings already configured");
    }

    // 4. Create default categories if none exist
    console.log("\n📝 Setting up default categories...");
    const categoryCount = await prisma.category.count();

    if (categoryCount === 0) {
      const defaultCategories = [
        { name: "Helmets", slug: "helmets" },
        { name: "Accessories", slug: "accessories" },
        { name: "Protection Gear", slug: "protection-gear" }
      ];

      for (const category of defaultCategories) {
        await prisma.category.create({
          data: category
        });
      }

      console.log(`✅ Created ${defaultCategories.length} default categories`);
    } else {
      console.log(`✅ Categories already exist (${categoryCount} found)`);
    }

    // 5. Print summary
    console.log("\n" + "=".repeat(50));
    console.log("✅ ADMIN PANEL SETUP COMPLETE!");
    console.log("=".repeat(50));

    console.log("\n📋 Setup Summary:");
    console.log(`  • Admin User: ${email}`);
    console.log(`  • Categories: ${await prisma.category.count()}`);
    console.log(`  • Products: ${await prisma.product.count()}`);
    console.log(`  • Settings: Configured`);

    console.log("\n🔗 Next Steps:");
    console.log("  1. Start the development server: npm run dev");
    console.log("  2. Open admin panel: http://localhost:3000/admin/login");
    console.log(`  3. Login with: ${email}`);
    console.log(`  4. Password: ${password}`);

    console.log("\n⚠️  IMPORTANT:");
    console.log("  • Change the default password immediately after first login");
    console.log("  • Update .env.local with a strong JWT_SECRET");
    console.log("  • Use HTTPS in production");

    console.log("\n📚 Documentation:");
    console.log("  • Full Guide: docs/admin-panel.md");
    console.log("  • Quick Start: docs/admin-quickstart.md");
    console.log("  • API Reference: docs/admin-api-reference.md");

    console.log("\n");

  } catch (error) {
    console.error("\n❌ Error during setup:");
    console.error(error.message);
    
    if (error.code === "P2002") {
      console.error("   This email is already registered in the system.");
    } else if (error.code === "P1000") {
      console.error("   Cannot connect to database. Check DATABASE_URL in .env.local");
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
setupAdminPanel();
