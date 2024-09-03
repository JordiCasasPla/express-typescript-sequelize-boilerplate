import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, errors } = winston.format;

// Define custom log format
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Daily rotate file transport
const transport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), customFormat),
  transports: [
    transport,
    new winston.transports.Console({
      level: "error",
      format: combine(winston.format.colorize(), customFormat),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});
