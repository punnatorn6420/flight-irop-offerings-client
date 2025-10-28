import { OfferMock } from "@/types/offer";

export type RedeemProgress = Record<string /* passengerId */, boolean[]>;

export const offerMock: OfferMock = {
  pnrNumber: "ABC123",
  trip: {
    tripType: "ROUND_TRIP",
    cabin: "ECONOMY",
    segments: [
      {
        flightNumber: "DD103",
        origin: "DMK",
        originName: "กรุงเทพฯ (ดอนเมือง)",
        destination: "CNX",
        destinationName: "เชียงใหม่",
        travelDateIso: "2025-10-02",
        departTime: "14:15",
        arriveTime: "16:15",
        statusNote: "ล่าช้า 2.15 ชั่วโมงโดยประมาณ",
      },
      {
        flightNumber: "DD205",
        origin: "CNX",
        originName: "เชียงใหม่ ",
        destination: "DMK",
        destinationName: "กรุงเทพฯ (ดอนเมือง",
        travelDateIso: "2025-10-05",
        departTime: "16:30",
        arriveTime: "18:15",
      },
    ],
  },
  passengers: [
    {
      id: "p1",
      title: "Mr.",
      firstName: "Thanantakorn",
      lastName: "Wattanasirirungroj",
      selected: true,
    },
    {
      id: "p2",
      title: "Mrs.",
      firstName: "Jenna Grace",
      lastName: "Thompson",
      selected: true,
    },
    {
      id: "p3",
      title: "Ms.",
      primary: true,
      email: "Naomill69@noknoi.com",
      firstName: "Sarah",
      lastName: "Thompson",
      selected: true,
    },
  ],
  payment: {
    method: "AGENCY",
    cardBrand: "VISA",
    cardLast4: "1234",
    agencyName: "Example Travel",
  },
  redeemProgress: <RedeemProgress>{
    p1: [false, false],
    p2: [true, true],
    p3: [true, true],
  },
};
