// This file contains the cache service for get/set flights.

import { getFromCache, setInCache } from "../utils/cache";
import { FLIGHTS_CACHE_KEY, QUICK_GATEAWAY_DAYS } from "../constants";
import { fetchFlightsFromApi } from "./flightApiService";
import { log } from "console";
import { isDateAfter } from "../utils/dateRange";
import logger from "../utils/logger";
import { getMostFrequentString } from "../utils/getMostFrequentString";

export const getFlightsFromCache = (): TlvFlightData.Flight[] => {
  const flights = getFromCache<TlvFlightData.Flight[]>(FLIGHTS_CACHE_KEY);
  return flights || [];
};

export const updateCache = async (): Promise<void> => {
  logger.info("Updating cache with remote flight data");
  const flights = await fetchFlightsFromApi();
  const outboundFlights = flights.filter((flight) => flight.CHCINT !== null);
  setApiDataInCache(flights, outboundFlights);
  logger.info("Cache updated successfully");
};

const mostPopularDestination = (outboundFlights: TlvFlightData.Flight[]): string => {
  const destinations = outboundFlights.map((flight) => flight.CHLOC1T);
  const mostPopularDestination = getMostFrequentString(destinations);
  return mostPopularDestination;
};
export const searchForQuickGetaway = (flights: TlvFlightData.Flight[]): QuickGetaway | null => {
  // create a map for each country with its flights from and to TLV
  const countryMap = flights.reduce((acc, flight) => {
    if (!acc[flight.CHLOCCT]) {
      acc[flight.CHLOCCT] = [];
    }
    acc[flight.CHLOCCT].push(flight);
    return acc;
  }, {} as Record<string, TlvFlightData.Flight[]>);

  // find a country with a outbound flight and a inbound flight that is within the QUICK_GATEAWAY_DAYS range
  for (const country in countryMap) {
    const outboundFlights = countryMap[country].filter((flight) => flight.CHCINT !== null);
    const inboundFlights = countryMap[country].filter((flight) => flight.CHCINT === null);

    for (const outboundFlight of outboundFlights) {
      for (const inboundFlight of inboundFlights) {
        if (
          isDateAfter(outboundFlight.CHSTOL, QUICK_GATEAWAY_DAYS, inboundFlight.CHSTOL) &&
          isDateAfter(outboundFlight.CHSTOL, QUICK_GATEAWAY_DAYS, inboundFlight.CHPTOL)
        ) {
          const departure = `${outboundFlight.CHOPER}${outboundFlight.CHFLTN}`;
          const arrival = `${inboundFlight.CHOPER}${inboundFlight.CHFLTN}`;
          logger.verbose(`Quick getaway found: ${outboundFlight._id}_${departure} <-> ${inboundFlight._id}_${arrival}`);
          return { departure, arrival };
        }
      }
    }
  }

  return null;
};

const setApiDataInCache = (flights: TlvFlightData.Flight[], outboundFlights: TlvFlightData.Flight[]): void => {
  const noFlights = flights.length;
  const noOutboundFlights = outboundFlights.length;
  const noInboundFlights = noFlights - noOutboundFlights;
  const noDelayedFlights = flights.filter((flight) => flight.CHPTOL > flight.CHSTOL).length;

  setInCache("noFlights", noFlights);
  setInCache("noOutboundFlights", noOutboundFlights);
  setInCache("noInboundFlights", noInboundFlights);
  setInCache("noDelayedFlights", noDelayedFlights);
  setInCache("mostPopularDestination", mostPopularDestination(outboundFlights));
  setInCache("quickGetaway", searchForQuickGetaway(flights));
  setInCache("flights", flights);
};
