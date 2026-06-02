#!/usr/bin/env node

import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const email = process.argv[2] || "admin@knyxsports.com";
const password = process.argv[3];

if (!password) {
  console.error("\nUsage: node scripts/reset-admin-password.js <email> <new-password>");
  console.error("Example: node scripts/reset-admin-password.js admin@example.com MyNewSecureP@ssw0rd");
  process.exit(1);
}

async function main() {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: {
        email,
        password: hashedPassword,
        role: "admin"
      }
    });

    console.log("\n✅ Admin password reset successfully.");
    console.log(`  • Email: ${user.email}`);
    console.log("  • Password: (updated)");
    console.log("\nYou can now log in at http://localhost:3000/admin/login");
    console.log("Remember to change the password again after login if needed.");
  } catch (error) {
    console.error("\n❌ Failed to reset admin password:", error.message);
    if (error.code === "P1000") {
      console.error("  Check DATABASE_URL in your .env or .env.local file.");
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
