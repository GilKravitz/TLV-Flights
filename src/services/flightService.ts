import { getFlightsFromCache, searchForQuickGetaway } from "./flightCacheService";
import { getMostFrequentString } from "../utils/getMostFrequentString";
import { getFromCache, setInCache } from "../utils/cache";
import logger from "../utils/logger";

const getFlights = (country: string = ""): TlvFlightData.Flight[] => {
  const flights = getFlightsFromCache();
  if (country === "") return flights;

  country = country.toLowerCase();
  return flights.filter((flight) => flight.CHLOCCT.toLowerCase() === country);
};

const getOutboundFlights = (country: string = ""): TlvFlightData.Flight[] => {
  const flights = getFlights(country);
  return flights.filter((flight) => flight.CHCINT !== null);
};

export const getNoFlights = (country: string): number => {
  let noflights = getFromCache<number>("noFlights" + country);
  if (!noflights) {
    let flights = getFlights(country);
    noflights = flights.length;
    logger.verbose(`Set flights in cache ${country && "for country " + country}`);
    setInCache("noFlights" + country, flights.length);
  }
  return noflights;
};

export const getNoOutboundFlights = (country: string): number => {
  let noOutboundFlights = getFromCache<number>("noOutboundFlights" + country);
  if (!noOutboundFlights) {
    let flights = getFlights(country);
    noOutboundFlights = flights.filter((flight) => flight.CHCINT !== null).length;
    logger.verbose(`Set outbound flights in cache ${country && "for country " + country}`);
    setInCache("noOutboundFlights" + country, noOutboundFlights);
  }
  return noOutboundFlights;
};

export const getNoInboundFlights = (country: string): number => {
  let noInboundFlights = getFromCache<number>("noInboundFlights" + country);
  if (!noInboundFlights) {
    let flights = getFlights(country);
    noInboundFlights = flights.filter((flight) => flight.CHCINT === null).length;
    logger.verbose(`Set inbound flights in cache ${country && "for country " + country}`);
    setInCache("noInboundFlights" + country, noInboundFlights);
  }
  return noInboundFlights;
};

export const getNoDelayedFlights = (): number => {
  let noDelayedFlights = getFromCache<number>("noDelayedFlights");
  if (!noDelayedFlights) {
    const flights = getFlights();
    noDelayedFlights = flights.filter((flight) => flight.CHPTOL > flight.CHSTOL).length;
    logger.verbose(`Set delayed flights in cache`);
    setInCache("noDelayedFlights", noDelayedFlights);
  }
  return noDelayedFlights;
};

export const getMostPopularDestination = (): string => {
  let mostPopularDestination = getFromCache<string>("mostPopularDestination");
  if (!mostPopularDestination) {
    const outboundFlights = getOutboundFlights();
    const destinations = outboundFlights.map((flight) => flight.CHLOC1T);
    mostPopularDestination = getMostFrequentString(destinations);
    logger.verbose(`Set most popular destination in cache`);
    setInCache("mostPopularDestination", mostPopularDestination);
  }
  return mostPopularDestination;
};

export const getQuickGetaway = (): QuickGetaway | null => {
  let quickGetaway = getFromCache<QuickGetaway>("quickGetaway");
  if (!quickGetaway) {
    const flights = getFlights();
    quickGetaway = searchForQuickGetaway(flights);
    logger.verbose(`Set quick getaway in cache`);
    setInCache("quickGetaway", quickGetaway);
  }
  return quickGetaway;
};
