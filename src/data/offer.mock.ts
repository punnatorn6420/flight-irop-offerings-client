import { OfferMock } from "@/types/offer";

export type RedeemProgress = Record<string /* passengerId */, boolean[]>;

export const offerMock: OfferMock = {
  pnrNumber: "ZXQ987",
  trip: {
    tripType: "ROUND_TRIP",
    cabin: "ECONOMY",
    segments: [
      {
        flightNumber: "DD752",
        origin: "DMK",
        originName: "กรุงเทพฯ (ดอนเมือง)",
        destination: "HKT",
        destinationName: "ภูเก็ต",
        travelDateIso: "2025-11-12",
        departTime: "07:20",
        arriveTime: "08:45",
        statusNote: "ออกเดินทางล่าช้า 25 นาทีโดยประมาณ",
      },
      {
        flightNumber: "DD753",
        origin: "HKT",
        originName: "ภูเก็ต",
        destination: "DMK",
        destinationName: "กรุงเทพฯ (ดอนเมือง)",
        travelDateIso: "2025-11-17",
        departTime: "19:10",
        arriveTime: "20:35",
      },
    ],
  },
  passengers: [
    {
      id: "p10",
      title: "Mr.",
      firstName: "Punnatorn",
      lastName: "Yimpong",
      primary: true,
      email: "punnatorn@example.com",
      selected: true,
    },
    {
      id: "p11",
      title: "Ms.",
      firstName: "Chayanis",
      lastName: "Kittipong",
      selected: true,
    },
    {
      id: "p12",
      title: "Miss",
      firstName: "Anya",
      lastName: "W.",
      selected: true,
    },
  ],
  payment: {
    method: "CARD",
    cardBrand: "VISA",
    cardLast4: "4421",
    agencyName: "Nok Air Web",
  },
  redeemProgress: {
    p10: [true, false],
    p11: [false, false],
    p12: [false, false],
  },
};
