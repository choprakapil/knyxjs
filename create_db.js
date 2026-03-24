import mysql from "mysql2/promise";

const credentials = [
  { user: "root", password: "" },
  { user: "root", password: "root" },
  { user: "root", password: "password" },
  { user: "root", password: "12345678" },
];

async function tryConnect(cred) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: cred.user,
      password: cred.password,
    });
    console.log(`Success connect: ${cred.user}:${cred.password}`);
    await connection.query("CREATE DATABASE IF NOT EXISTS knyx_db");
    console.log("Database created");
    await connection.end();
    return cred;
  } catch (error) {
    console.log(`Failed connect: ${cred.user}:${cred.password} - ${error.message}`);
    return null;
  }
}

async function main() {
  for (const cred of credentials) {
    const success = await tryConnect(cred);
    if (success) {
      console.log(`DATABSE_URL=mysql://${success.user}:${success.password}@localhost:3306/knyx_db`);
      process.exit(0);
    }
  }
  console.log("None connected");
  process.exit(1);
}

main();
