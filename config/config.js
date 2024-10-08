require("dotenv").config();
module.exports = {
  development: {
    dialect: "postgres",
    database: process.env.DB_NAME || "boilerplate",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
  },
  test: {
    dialect: "postgres",
    database: process.env.POSTGRES_DB_NAME || "boilerplate",
    username: process.env.POSTGRES_DB_USERNAME || "postgres",
    password: process.env.POSTGRES_DB_PASSWORD || "postgres",
    host: process.env.POSTGRES_DB_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_DB_PORT || "5432"),
  },
  production: {
    dialect: "postgres",
    database: process.env.POSTGRES_DB_NAME,
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT),
  },
};
