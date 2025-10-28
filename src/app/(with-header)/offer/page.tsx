"use client";

import { useMemo, useState } from "react";
import FlightTabs from "@/components/pages/offer/FlightTabs";
import FlightInfoCard from "@/components/pages/offer/FlightInfoCard";
import PassengerSelectCard from "@/components/pages/offer/PassengerSelectCard";
import BenefitList from "@/components/pages/offer/BenefitList";

import { offerMock } from "@/data/offer.mock";

export default function OfferPage() {
  const segments = offerMock.trip.segments;
  const tabs = useMemo(
    () =>
      segments.map((s) => ({
        code: s.flightNumber,
        label: `เที่ยวบิน ${s.flightNumber}`,
      })),
    [segments]
  );

  const [activeFlight, setActiveFlight] = useState<string>(tabs[0]?.code ?? "");
  const activeSegment = useMemo(
    () => segments.find((s) => s.flightNumber === activeFlight) ?? segments[0],
    [segments, activeFlight]
  );

  return (
    <main className="min-h-screen bg-grey-50">
      <section className="mx-auto w-full max-w-[1120px] px-4 md:px-6 pb-12">
        <div className="mt-8 md:mt-12 justify-items-center md:justify-items-start">
          <FlightTabs
            tabs={tabs}
            value={activeFlight}
            onChangeAction={async (code: string) => {
              setActiveFlight(code);
            }}
          />
        </div>
        <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2">
          <FlightInfoCard
            tripType={offerMock.trip.tripType}
            segment={activeSegment}
            originalSegment={segments[0]}
          />
          <PassengerSelectCard passengers={offerMock.passengers} />
        </div>

        <div className="mt-6 md:mt-8">
          <BenefitList />
        </div>
      </section>
    </main>
  );
}
