export const mapRecordsToFlights = (records: TlvFlightData.Record[]): TlvFlightData.Flight[] => {
  return records.map((record) => ({
    ...record,
    CHPTOL: new Date(record.CHPTOL),
    CHSTOL: new Date(record.CHSTOL),
  }));
};
