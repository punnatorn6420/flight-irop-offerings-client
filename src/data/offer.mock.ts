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
      id: "p01",
      title: "Mr.",
      firstName: "Punnatorn",
      lastName: "Yimpong",
      primary: true,
      email: "punnatorn@example.com",
      selected: true,
    },
    {
      id: "p14",
      title: "Mr.",
      firstName: "Ethan",
      lastName: "Chiu",
      selected: true,
    },
    {
      id: "p16",
      title: "Miss",
      firstName: "Nicha",
      lastName: "R.",
      selected: true,
    },
    {
      id: "p18",
      title: "Ms.",
      firstName: "Amina",
      lastName: "A.",
      selected: true,
    },
    {
      id: "p19",
      title: "Mr.",
      firstName: "Carlos",
      lastName: "M.",
      selected: true,
    },
    {
      id: "p20",
      title: "Miss",
      firstName: "Jirapat",
      lastName: "Dechchai",
      selected: true,
    },
    {
      id: "p24",
      title: "Ms.",
      firstName: "Pakjira",
      lastName: "Chantarangsi",
      selected: true,
    },
    {
      id: "p06",
      title: "Mrs.",
      firstName: "Siriporn",
      lastName: "Sae-Lim",
      selected: true,
    },
    {
      id: "p07",
      title: "Mr.",
      firstName: "Kittisak",
      lastName: "Wongchai",
      selected: true,
    },
  ],
  payment: {
    method: "BANK",
    cardBrand: "VISA",
    cardLast4: "4421",
    agencyName: "Nok Air Web",
  },
  redeemProgress: {
    p01: [true, true],
    p11: [true, false],
    p12: [false, false],
  },
};
