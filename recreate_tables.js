import mysql from "mysql2/promise";

async function main() {
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/knyx_db");
  
  console.log("Dropping tables...");
  await connection.query("SET FOREIGN_KEY_CHECKS = 0");
  await connection.query("DROP TABLE IF EXISTS products");
  await connection.query("DROP TABLE IF EXISTS categories");
  await connection.query("SET FOREIGN_KEY_CHECKS = 1");

  console.log("Creating tables...");


  await connection.query(`
    CREATE TABLE categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)
    )
  `);

  await connection.query(`
    CREATE TABLE products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      image VARCHAR(191) DEFAULT NULL,
      specs JSON DEFAULT NULL,
      createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
      categoryId INT NOT NULL,
      CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES categories(id),
      INDEX idx_categoryId (categoryId)
    )
  `);

  console.log("Tables created successfully");
  await connection.end();
}

main().catch(console.error);
