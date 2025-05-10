import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface EnviromentConfig {
  NODE_ENV: "development" | "production" | "test";
  PORT: number;
  MONGO_URL: string;
  JWT_SECRET: string;
  SESSION_SECRET: string;
}

const defaultConfig: EnviromentConfig = {
  NODE_ENV: "development",
  PORT: 8000,
  MONGO_URL: "mongodb://localhost:27017/webprofiledb",
  JWT_SECRET: "SOMESECRET",
  SESSION_SECRET: "SESSIONSECRET",
};

function validateEnv(): EnviromentConfig {
  const env: Partial<EnviromentConfig> = {};

  env.NODE_ENV =
    (process.env.NODE_ENV as EnviromentConfig["NODE_ENV"]) ||
    defaultConfig.NODE_ENV;

  if (!["devlopment", "production", "test"].includes(env.NODE_ENV)) {
    console.warn("Invalid NODE_ENV. using default : development");
    env.NODE_ENV = defaultConfig.NODE_ENV;
  }

  env.PORT = process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : defaultConfig.PORT;
  if (isNaN(env.PORT)) {
    console.warn("Invalid PORT. using default : 8000");
    env.PORT = defaultConfig.PORT;
  }

  return env as EnviromentConfig;
}

export const ENV = validateEnv();
