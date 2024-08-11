import express from "express";
import FlightDataController from "../controllers/flightDataController";

const router = express.Router();

router.get("/noFlights", FlightDataController.noFlights);
router.get("/noOutboundFlights", FlightDataController.noOutboundFlights);
router.get("/noInboundFlights", FlightDataController.noInboundFlights);
router.get("/noDelayedFlights", FlightDataController.noDelayedFlights);
router.get("/mostPopularDestination", FlightDataController.mostPopularDestination);
router.get("/quickGataway", FlightDataController.quickGetaway);

export default router;
