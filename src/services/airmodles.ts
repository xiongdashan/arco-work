export interface ArrDep {
  aircraftScheduledDateTime: string;
  boardingGateID: string;
  iataLocationCode: string;
  stationName: string;
  terminalName: string;
}

export interface Journey {
  id: string;
  cabinClass: string;
  flightNumber: string;
  terminal: string;
  arrival: ArrDep;
  dep: ArrDep;
}

export interface Pax {
  id: string;
  name: string;
  ptc: string;
  idType: string;
  idNumber: string;
  idIssue: string;
  nationnality: string;
  birthdate: string;
  gender: string;
  expired: string;
  mobile: string;
  tktNumbers: string;
}

export interface AirlinePrice {
  id: string;
  ptc: string;
  baseAmount: number;
  agencyFee: number;
  fee: number;
  tax: number;
  commission: number;
  commissionPercent: number;
  paxCount: number;
  totalAmount: number;
}

export interface PnrOrder {
  id: string;
  code: string;
  journey: Journey[];
  pax: Pax[];
  price: AirlinePrice[];
}
