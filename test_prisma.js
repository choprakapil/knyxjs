import prisma from "./lib/prisma.js";

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Prisma success:", users);
  } catch (error) {
    console.error("Prisma error:", error.message);
  }
  process.exit(0);
}

main();
