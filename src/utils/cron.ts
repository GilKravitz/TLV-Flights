// make cron every 15 minutes and 15 sec e.g 12:00:15, 12:15:15, 12:30:15, 12:45:15 etc to update the cache with remote flight data
//
import cron from "node-cron";

import { updateCache } from "../services/flightCacheService";
import logger from "./logger";
export const startCacheUpdateCron = () => {
  cron.schedule("15 */15 * * * *", async () => {
    try {
      logger.info("Cron job started to update cache with remote flight data");
      await updateCache();
    } catch (error) {
      console.error(error);
    }
  });
};
