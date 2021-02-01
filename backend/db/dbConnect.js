import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  password: "postyy",
  host: "localhost",
  port: 5432,
  database: "consistency_tutorial",
});
