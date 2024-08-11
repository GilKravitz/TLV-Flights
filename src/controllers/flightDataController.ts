import { Request, Response, NextFunction } from "express";
import * as FlightDataService from "../services/flightService";
export default class FlightDataController {
  static async noFlights(req: Request, res: Response, next: NextFunction) {
    try {
      const country = req.query.country as string;
      const noFlights = FlightDataService.getNoFlights(country);
      res.json({ noFlights });
    } catch (error) {
      next(error);
    }
  }
  static async noOutboundFlights(req: Request, res: Response, next: NextFunction) {
    try {
      const country = req.query.country as string;
      const noOutboundFlights = FlightDataService.getNoOutboundFlights(country);
      res.json({ noOutboundFlights });
    } catch (error) {
      next(error);
    }
  }
  static async noInboundFlights(req: Request, res: Response, next: NextFunction) {
    try {
      const country = req.query.country as string;
      const noInboundFlights = FlightDataService.getNoInboundFlights(country);
      res.json({ noInboundFlights });
    } catch (error) {
      next(error);
    }
  }

  static async noDelayedFlights(req: Request, res: Response, next: NextFunction) {
    try {
      const noDelayedFlights = FlightDataService.getNoDelayedFlights();
      res.json({ noDelayedFlights });
    } catch (error) {
      next(error);
    }
  }
  static async mostPopularDestination(req: Request, res: Response, next: NextFunction) {
    try {
      const mostPopularDestination = FlightDataService.getMostPopularDestination();
      res.json({ country: mostPopularDestination });
    } catch (error) {
      next(error);
    }
  }

  static async quickGetaway(req: Request, res: Response, next: NextFunction) {
    try {
      const gateaway = FlightDataService.getQuickGetaway();
      const { departure, arrival } = gateaway || {};
      res.json({ departure, arrival });
    } catch (error) {
      next(error);
    }
  }
}
