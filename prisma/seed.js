import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

async function main() {
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/knyx_db");
  const password = await bcrypt.hash("admin123", 10);

  await connection.query(`
    INSERT INTO users (email, password, role) 
    VALUES ('admin@example.com', ?, 'admin')
    ON DUPLICATE KEY UPDATE password = ?
  `, [password, password]);

  console.log("✅ Admin created");
  await connection.end();
}

main().catch(console.error);
