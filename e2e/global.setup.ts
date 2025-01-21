import { execSync } from "child_process";
import { test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env.test") });

setup("Global Setup for E2E Tests", async () => {
  const dbName = "e2e_test";
  const dbUser = "postgres";
  const dbPassword = "testpassword";
  const dbPort = 5432;
  const seedFilePath = resolve(__dirname, "../supabase/seed.sql");

  console.log("Starting Docker container for test database...");

  try {
    execSync(
      `docker run --name test-db -e POSTGRES_PASSWORD=${dbPassword} -p ${dbPort}:${dbPort} -d postgres`,
      { stdio: "inherit" },
    );
  } catch (error) {
    console.error("Failed to start Docker container:", error);
    throw error;
  }

  console.log("Docker container started.");

  console.log("Waiting for the database to initialize...");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log(`Creating database: ${dbName}`);
  try {
    execSync(`psql -U ${dbUser} -h localhost -c "CREATE DATABASE ${dbName};"`, {
      stdio: "inherit",
      env: {
        ...process.env,
        PGPASSWORD: dbPassword,
      },
    });
  } catch (error) {
    console.error("Failed to create database:", error);
    throw error;
  }

  console.log(`Seeding database from: ${seedFilePath}`);
  try {
    execSync(`psql -U ${dbUser} -h localhost -d ${dbName} -f ${seedFilePath}`, {
      stdio: "inherit",
      env: {
        ...process.env,
        PGPASSWORD: dbPassword,
      },
    });
  } catch (error) {
    console.error("Failed to seed database:", error);
    throw error;
  }

  console.log("Database seeded successfully.");
});
