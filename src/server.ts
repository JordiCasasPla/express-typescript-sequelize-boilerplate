// server.js
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import httpStatus from "http-status";
import { successHandler, errorHandler } from "./config/morgan";
import db from "./config/sequelize";
import { ApiError } from "./errors";
import { logger } from "./config/logger";
import { config, validateConfig, validateEnv } from "./config/config";
import {
  errorConverter,
  errorHandler as middErrorHandler,
} from "./middlewares/error";
import routes from "./routes/v1";
import { initModels } from "./models";

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.health();
    this.errorHandling();
    this.initDatabase();
    this.initModels();
  }

  config() {
    if (config.env !== "test") {
      this.app.use(successHandler);
      this.app.use(errorHandler);
    }
    this.app.use(helmet());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(compression());
    this.app.use(cors({ origin: "*" }));
    this.app.options("*", cors());
    // this.app.use(validateEnv, validateConfig);
    this.client();
  }

  // serve static file as client
  client() {
    this.app.use(express.static(path.resolve(__dirname, "../client/dist")));
    // this.app.get('*', (req, res) => {
    //   res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    // });
  }

  routes() {
    this.app.use("/", routes);
  }

  health() {
    // health check route
    this.app.get("/health", function (req, res) {
      res.send("OK\n");
    });
  }

  errorHandling() {
    this.app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
    });
    this.app.use(errorConverter);
    this.app.use(middErrorHandler);
  }

  // Init database service
  async initDatabase() {
    try {
      db.sync({ force: false })
        .catch((err: Error) => console.log(err));
    } catch (error) {
      logger.error("Error syncing database:", error);
      throw error;
    }
  }

  async initModels () {
    try {
      initModels(db);
    } catch (error) {
      logger.error("Error initializing models:", error);
      throw error;
    }
  }

  start() {
    const port = config.port || 3000;
    this.app.listen(port, () => {
      if (config.env != "development") {
        // send some alert to notify the backend service started
      }
      console.log(`Server running on port ${port}`);
      logger.info(`Server running on port ${port}`);
    });
  }

  close() {
    // some alert to notify the backend service stopped
    logger.info("Server closed");
  }
}

export default Server;
