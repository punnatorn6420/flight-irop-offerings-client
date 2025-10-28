"use client";

import Image from "next/image";
type Tab = { code: string; label: string };

export default function FlightTabs({
  tabs,
  value,
  onChangeAction,
}: {
  tabs: Tab[];
  value: string;
  onChangeAction: (code: string) => Promise<void>;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((t) => {
        const isActive = value === t.code;
        return (
          <button
            key={t.code}
            onClick={() => onChangeAction(t.code)}
            className={[
              "inline-flex items-center gap-2 rounded-lg border px-8 py-2 text-sm transition",
              isActive
                ? "border-yellow-500 bg-yellow-50 text-yellow-900"
                : "border-grey-200 bg-white hover:bg-grey-50",
            ].join(" ")}
          >
            <Image
              src="/images/ph_airplane-in-flight.png"
              alt="NOK AIR"
              width={20}
              height={20}
            />
            <span className="text-[18px] font-bold" aria-hidden>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
