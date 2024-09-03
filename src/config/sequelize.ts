import { Sequelize } from "sequelize";
import { config } from "./config";

const db = new Sequelize({
  dialect: "postgres",
  database: config.db.database || "database",
  host: config.db.host || "localhost",
  username: config.db.user || "postgres",
  password: config.db.password || "no-pass",
  port: Number(config.db.port) || 5432,
});

export default db;
