import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { cacheSize } from "../utils/cache";
import { updateCache } from "../services/flightCacheService";

// this middleware checks if the cache is empty and if so, it sends a message to the client
export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (0 < cacheSize()) {
    next();
  } else {
    logger.verbose("Cache is empty");
    res.status(503).json({ message: "Service is loading" });
  }
};
