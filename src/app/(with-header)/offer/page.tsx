"use client";

import { useEffect, useMemo, useState } from "react";
import FlightTabs from "@/components/pages/offer/FlightTabs";
import FlightInfoCard from "@/components/pages/offer/FlightInfoCard";
import PassengerSelectCard from "@/components/pages/offer/PassengerSelectCard";
import BenefitList from "@/components/pages/offer/BenefitList";
import { offerMock } from "@/data/offer.mock";
import { cn } from "@/lib/utils";

export default function OfferPage() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  useEffect(() => {
    const ssNames =
      typeof window !== "undefined"
        ? sessionStorage.getItem("offer:selectedPassengerNames")
        : null;
    const initialNames = ssNames
      ? JSON.parse(ssNames)
      : offerMock.passengers
          .filter((p) => p.selected)
          .map((p) => `${p.title} ${p.firstName} ${p.lastName}`.trim());

    setSelectedNames(initialNames);
    setSelectedCount(initialNames.length);
  }, []);

  const passengers = offerMock.passengers;
  const hasPassengerSelect = passengers.length > 1;

  const segments = offerMock.trip.segments;
  const tabs = useMemo(
    () =>
      segments.map((s) => ({
        code: s.flightNumber,
        label: `เที่ยวบิน ${s.flightNumber}`,
      })),
    [segments]
  );

  const usedIds = useMemo(
    () =>
      Object.entries(offerMock.redeemProgress)
        .filter(([, arr]) => Array.isArray(arr) && arr.every(Boolean)) // ใช้ครบทุกเซกเมนต์
        .map(([pid]) => pid),
    []
  );

  const [activeFlight, setActiveFlight] = useState<string>(tabs[0]?.code ?? "");
  const activeSegment = useMemo(
    () => segments.find((s) => s.flightNumber === activeFlight) ?? segments[0],
    [segments, activeFlight]
  );

  return (
    <section>
      <div className="justify-items-center lg:justify-items-start">
        <FlightTabs
          tabs={tabs}
          value={activeFlight}
          onChangeAction={async (code: string) => {
            setActiveFlight(code);
          }}
        />
      </div>
      <div className="mt-4 grid gap-4 lg:mt-6 lg:grid-cols-2">
        <FlightInfoCard
          tripType={offerMock.trip.tripType}
          segment={activeSegment}
          originalSegment={segments[0]}
          className={cn(!hasPassengerSelect && "lg:col-span-2")}
        />
        {passengers.length > 1 && (
          <PassengerSelectCard
            passengers={offerMock.passengers}
            usedIds={usedIds}
            onChange={({ names, count }) => {
              setSelectedNames(names);
              setSelectedCount(count);
            }}
          />
        )}
      </div>

      <div className="mt-6 lg:mt-8">
        <BenefitList />
      </div>
    </section>
  );
}
