#!/usr/bin/env node

/**
 * MySQL Connection Troubleshooter
 * Run this to diagnose MySQL connection issues
 */

const mysql = require("mysql2/promise");

const configs = [
  {
    name: "No password (socket auth)",
    config: { host: "localhost", user: "root", database: "knyx_db" }
  },
  {
    name: "With empty password",
    config: { host: "localhost", user: "root", password: "", database: "knyx_db" }
  }
];

async function testConnection(config) {
  try {
    const connection = await mysql.createConnection(config.config);
    await connection.end();
    return { success: true, config: config.name };
  } catch (error) {
    return { success: false, config: config.name, error: error.message };
  }
}

async function main() {
  console.log("\n🔍 Testing MySQL connections...\n");

  for (const cfg of configs) {
    const result = await testConnection(cfg);
    
    if (result.success) {
      console.log(`✅ SUCCESS: ${result.config}`);
      console.log(`   Update DATABASE_URL with: mysql://root@localhost:3306/knyx_db\n`);
    } else {
      console.log(`❌ FAILED: ${result.config}`);
      console.log(`   Error: ${result.error}\n`);
    }
  }

  console.log("📝 If none worked, check:");
  console.log("   1. Is MySQL server running? Check with: mysql -u root -p");
  console.log("   2. What is your MySQL password?");
  console.log("   3. Does database 'knyx_db' exist?\n");
}

main().catch(console.error);
