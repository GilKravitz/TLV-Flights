import { mapRecordsToFlights } from "../utils/mapRecordsToFlights";

describe("mapRecordsToFlights", () => {
  it("should map records to flights with correct date format", () => {
    const records: TlvFlightData.Record[] = [
      {
        _id: 1,
        CHOPER: "IZ",
        CHFLTN: "167",
        CHOPERD: "ARKIA  ISRAELI  AIRLINES",
        CHSTOL: "2024-08-10T09:45:00",
        CHPTOL: "2024-08-10T09:45:00",
        CHAORD: "D",
        CHLOC1: "LCA",
        CHLOC1D: "LARNACA",
        CHLOC1TH: "לרנקה",
        CHLOC1T: "LARNACA",
        CHLOC1CH: "קפריסין",
        CHLOCCT: "CYPRUS",
        CHTERM: 3,
        CHCINT: "34-40",
        CHCKZN: "B",
        CHRMINE: "CANCELED",
        CHRMINH: "מבוטלת",
      },
      {
        _id: 2,
        CHOPER: "W6",
        CHFLTN: "2097",
        CHOPERD: "WIZZAIR",
        CHSTOL: "2024-08-10T10:10:00",
        CHPTOL: "2024-08-10T09:45:00",
        CHAORD: "A",
        CHLOC1: "KRK",
        CHLOC1D: "KRAKOW",
        CHLOC1TH: "קרקוב",
        CHLOC1T: "KRAKOW",
        CHLOC1CH: "פולין",
        CHLOCCT: "POLAND",
        CHTERM: 3,
        CHCINT: null,
        CHCKZN: null,
        CHRMINE: "LANDED",
        CHRMINH: "נחתה",
      },
    ];

    const expectedFlights: TlvFlightData.Flight[] = [
      {
        _id: 1,
        CHOPER: "IZ",
        CHFLTN: "167",
        CHOPERD: "ARKIA  ISRAELI  AIRLINES",
        CHSTOL: new Date("2024-08-10T09:45:00"),
        CHPTOL: new Date("2024-08-10T09:45:00"),
        CHAORD: "D",
        CHLOC1: "LCA",
        CHLOC1D: "LARNACA",
        CHLOC1TH: "לרנקה",
        CHLOC1T: "LARNACA",
        CHLOC1CH: "קפריסין",
        CHLOCCT: "CYPRUS",
        CHTERM: 3,
        CHCINT: "34-40",
        CHCKZN: "B",
        CHRMINE: "CANCELED",
        CHRMINH: "מבוטלת",
      },
      {
        _id: 2,
        CHOPER: "W6",
        CHFLTN: "2097",
        CHOPERD: "WIZZAIR",
        CHSTOL: new Date("2024-08-10T10:10:00"),
        CHPTOL: new Date("2024-08-10T09:45:00"),
        CHAORD: "A",
        CHLOC1: "KRK",
        CHLOC1D: "KRAKOW",
        CHLOC1TH: "קרקוב",
        CHLOC1T: "KRAKOW",
        CHLOC1CH: "פולין",
        CHLOCCT: "POLAND",
        CHTERM: 3,
        CHCINT: null,
        CHCKZN: null,
        CHRMINE: "LANDED",
        CHRMINH: "נחתה",
      },
    ];

    const result = mapRecordsToFlights(records);
    expect(result).toEqual(expectedFlights);
  });
});
