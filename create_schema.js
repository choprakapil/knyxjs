import mysql from "mysql2/promise";

async function main() {
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/knyx_db");
  const [rows] = await connection.query("DESCRIBE products");
  console.log("Products schema:\n", rows);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)
    )
  `);
  console.log("Category created");
  await connection.end();
}

main().catch(console.error);
