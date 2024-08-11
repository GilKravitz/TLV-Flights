import express from "express";

import cors from "cors";
import "dotenv/config";
import logger from "./utils/logger";
import { requestLogger, logError } from "./middleware/loggerMiddleware";
import flightDataRouter from "./routes/flightDataRouter";
import swaggerRouter from "./routes/swaggerRouter";
import { startCacheUpdateCron } from "./utils/cron";
import { updateCache } from "./services/flightCacheService";
import { cacheMiddleware } from "./middleware/cacheMiddleware";

startCacheUpdateCron();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost", methods: "GET" }));

app.use(cacheMiddleware);
app.use(requestLogger);
app.use("/", flightDataRouter);
app.use("/api-docs", swaggerRouter);
app.use(logError);

app.listen(port, async () => {
  logger.info(`Server started at http://localhost:${port}`);
  logger.info(`API documentation available at http://localhost:${port}/api-docs`);
  logger.info("Server initialized successfully");
  await updateCache();
});
