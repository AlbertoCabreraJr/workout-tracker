import { Pool } from "pg";

export const db = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true",
});

export const connectDB = async () => {
  try {
    const client = await db.connect();
    console.log("✅ Connected to database");
    client.release();
  } catch (error) {
    console.error("❌ Error connecting to database", error);
    process.exit(1);
  }
};
