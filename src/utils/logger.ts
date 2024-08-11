// make a simple logger using winston

import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "logs/error.log", level: "error", format: winston.format.simple() }),
    new winston.transports.File({ filename: "logs/vebose.log", level: "verbose", format: winston.format.simple() }),
    new winston.transports.File({ filename: "logs/info.log", level: "info", format: winston.format.simple() }),
  ],
});

export default logger;
