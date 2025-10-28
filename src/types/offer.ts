export type CabinClass = "ECONOMY" | "PREMIUM" | "BUSINESS";

export interface FlightSegment {
  flightNumber: string; // DD103
  origin: string; // DMK
  originName: string; // ดอนเมือง [DMK]
  destination: string; // CNX
  destinationName: string; // เชียงใหม่ [CNX]
  travelDateIso: string; // 2025-10-02
  departTime: string; // 14:15
  arriveTime: string; // 16:15
  statusNote?: string; // ล่าช้า 2.15 ชั่วโมงโดยประมาณ
}

export interface TripInfo {
  tripType: "ONE_WAY" | "ROUND_TRIP";
  cabin: CabinClass;
  segments: FlightSegment[]; // ไป & กลับ
}

export interface Passenger {
  id: string;
  title: "Mr." | "Mrs." | "Ms." | "Master" | "Miss";
  firstName: string;
  lastName: string;
  selected?: boolean;
}

export interface BenefitOption {
  id: string;
  titleTh: string;
  descTh?: string;
  badgeTh?: string;
  // ปุ่ม “เลือกสิทธิ์”
  ctaTh?: string;
  // เงื่อนไขสั้น ๆ สำหรับ tooltip หรือ note ใต้กล่อง
  noteTh?: string;
}

export interface OfferMock {
  trip: TripInfo;
  passengers: Passenger[];
}
