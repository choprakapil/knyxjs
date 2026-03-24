import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

const paths = [
  "/opt/homebrew/bin/mysql_upgrade",
  "/opt/homebrew/bin/mariadb-upgrade",
  "/usr/local/mysql/bin/mysql_upgrade",
  "/usr/local/bin/mysql_upgrade",
  "/usr/local/bin/mariadb-upgrade",
  "/usr/local/opt/mysql/bin/mysql_upgrade",
  "/opt/homebrew/opt/mariadb/bin/mariadb-upgrade",
];

async function main() {
  for (const path of paths) {
    if (fs.existsSync(path)) {
      console.log(`Found upgrade tool at: ${path}`);
      try {
        const { stdout, stderr } = await execAsync(`${path} -u root`);
        console.log(`Success:\n${stdout}`);
        if (stderr) console.error(`Stderr:\n${stderr}`);
        process.exit(0);
      } catch (error) {
        console.error(`Error running ${path}: ${error.message}`);
      }
    }
  }
  console.log("No upgrade tool found in known paths");
  process.exit(1);
}

main();
