const logger = require("./src/config/logger");
import Server from "./src/server";

const server = new Server();
try {
  server
    .initDatabase()
    .then(() => {
      server.start();
    })
    .catch((err: Error) => {
      logger.error("Failed to initialize database:", err);
      if (server) {
        server.close();
      }
    });
} catch (error) {
  logger.error(error);
}

const exitHandler = (error: Error) => {
  logger.error(error);
  if (server) {
    server.close();
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  exitHandler(error);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
