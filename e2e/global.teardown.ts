import dotenv from "dotenv";
import { test as teardown } from "@playwright/test";
import { resolve } from "path";
import { execSync } from "child_process";

const envPath = resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

teardown("reset database", async () => {
  console.log("Stopping and removing Docker container...");
  try {
    execSync("docker stop test-db", { stdio: "inherit" });

    execSync("docker rm test-db", { stdio: "inherit" });

    console.log("Docker container stopped and removed successfully.");
  } catch (error) {
    console.error("Failed to stop/remove Docker container:", error);
  }
});
