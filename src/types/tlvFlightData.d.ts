declare namespace TlvFlightData {
  interface Data {
    help: string;
    success: boolean;
    result: Result;
  }

  interface Result {
    include_total: boolean;
    limit: number;
    records_format: string;
    resource_id: string;
    total_estimation_threshold: null;
    records: Record[];
    fields: Field[];
    _links: Links;
    total: number;
    total_was_estimated: boolean;
  }

  interface Links {
    start: string;
    next: string;
  }

  interface Field {
    id: string;
    type: string;
    info?: Info;
  }

  interface Info {
    label: string;
    notes: string;
    type_override: string;
  }

  interface Record {
    _id: number; //record positive index
    CHOPER: string; // flight code
    CHFLTN: string; //flight number
    CHOPERD: string; //airline company
    CHSTOL: string; //estimated departure time
    CHPTOL: string; //real departure time
    CHAORD: string; //gate
    CHLOC1: string; //short version destination Airport
    CHLOC1D: string; //full name destination airport
    CHLOC1TH: string; //city Hebrew - name
    CHLOC1T: string; //city English- name
    CHLOC1CH: string; //country Hebrew - name
    CHLOCCT: string; //country English - name
    CHTERM: number; //TLV Terminal
    CHCINT: null | string; //TLV check-in counter - if empty inbound flights else outbound flight
    CHCKZN: null | string; //TLV check in zone - if empty inbound flights else outbound flight
    CHRMINE: string; //status in English
    CHRMINH: string; //status in Hebrew
  }

  interface Flight extends Record {
    CHSTOL: Date; //estimated departure time
    CHPTOL: Date; //real departure time
  }
}
