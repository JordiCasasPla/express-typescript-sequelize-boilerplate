import Server from "./src/server";
import { logger } from "./src/config/logger";

const server = new Server();

const initializeDatabase = async () => {
  try {
    await server.initDatabase();
    server.start();
  } catch (err) {
    logger.error("Failed to initialize database:", err);
    console.log("Failed to initialize database:", err);
    if (server) {
      console.log("Closing server");
      server.close();
    }
  }
};

initializeDatabase();

const handleExit = (error: Error) => {
  logger.error(error);
  if (server) {
    server.close();
  }
  process.exit(1);
};

process.on("uncaughtException", handleExit);
process.on("unhandledRejection", handleExit);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
