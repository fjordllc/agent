import dotenv from "dotenv";
import { test as setup } from "@playwright/test";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

setup("reset database", async () => {
  
});
