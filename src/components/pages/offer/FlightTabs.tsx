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
    <div className="grid grid-cols-2 gap-3">
      {tabs.map((t) => {
        const isActive = value === t.code;
        return (
          <button
            key={t.code}
            onClick={() => onChangeAction(t.code)}
            className={[
              "min-w-0 w-full flex items-center justify-center gap-2 rounded-lg border",
              "px-7 py-2 text-[16px] sm:text-[18px] font-bold transition cursor-pointer",
              isActive
                ? "border-yellow-500 bg-yellow-50 text-yellow-800 hover:bg-yellow-50"
                : "border-yellow-700 bg-white hover:bg-yellow-50 text-yellow-800",
            ].join(" ")}
          >
            <Image
              src="/images/ph_airplane-in-flight.svg"
              alt="NOK AIR"
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="text-[18px] font-bold truncate" aria-hidden>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
