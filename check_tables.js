import mysql from "mysql2/promise";

async function main() {
  const connection = await mysql.createConnection("mysql://root:@localhost:3306/knyx_db");
  const [rows] = await connection.query("SHOW TABLES");
  console.log("Tables list:\n", rows);
  await connection.end();
}

main().catch(console.error);
