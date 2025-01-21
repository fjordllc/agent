import dotenv from "dotenv";
import { test as teardown } from "@playwright/test";
import { resolve } from "path";

const envPath = resolve(__dirname, "../.env.local");
dotenv.config({ path: envPath });

teardown("reset database", async () => {

});
