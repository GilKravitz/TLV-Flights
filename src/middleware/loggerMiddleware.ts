import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

// this middleware logs errors and sends a 500 status code
export const logError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  res.status(500).json({ error: "Internal server error" });
};

// this middleware logs the request method, url, status code and duration
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1e3 + nanoseconds * 1e-6).toFixed(3);
    logger.info(`${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration} ms`);
  });

  next();
};
