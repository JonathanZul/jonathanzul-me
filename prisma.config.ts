import { defineConfig, env } from "prisma/config";
import { config } from "dotenv";

config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL || env("DATABASE_URL"),
  },
  seed: {
    run: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts",
  },
});
