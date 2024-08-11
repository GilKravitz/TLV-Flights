import axios from "axios";
import logger from "../utils/logger";

import { REQ_LIMIT, RESOURCE_ID, BASE_URL } from "../constants";
import { mapRecordsToFlights } from "../utils/mapRecordsToFlights";

// This function fetches the total number of flights from the API
const getTotalFlights = async (): Promise<number> => {
  try {
    logger.verbose("Fetching total flights from API");
    const response = await axios.get<TlvFlightData.Data>(BASE_URL, {
      params: {
        resource_id: RESOURCE_ID,
        limit: 0,
      },
    });
    const totalFlights = response.data.result.total;
    return totalFlights;
  } catch (error) {
    logger.error(error);
    return 0;
  }
};

// This function fetches all available flights from the API
export const fetchFlightsFromApi = async (): Promise<TlvFlightData.Flight[]> => {
  try {
    const totalFlights = await getTotalFlights();
    const pages = Math.ceil(totalFlights / REQ_LIMIT);
    logger.verbose(`Total flights: ${totalFlights}, pages: ${pages}`);
    const response = await axios.get<TlvFlightData.Data>(BASE_URL, {
      params: {
        resource_id: RESOURCE_ID,
        limit: totalFlights,
      },
    });
    logger.verbose(`Fetched ${response.data.result.records.length} flights from API`);
    const flights = mapRecordsToFlights(response.data.result.records);
    return flights;
  } catch (error) {
    logger.error(error);
    return [];
  }
};
