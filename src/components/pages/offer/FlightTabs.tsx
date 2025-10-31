"use client";

import { Button } from "@/components/ui/button";
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
    <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
      {tabs.map((t) => {
        const isActive = value === t.code;
        return (
          <Button
            key={t.code}
            onClick={() => onChangeAction(t.code)}
            className={[
              "h-12! min-w-0 w-full flex items-center justify-center gap-2 rounded-lg border",
              "px-6! transition border-2",
              isActive
                ? "border-yellow-700! bg-yellow-100! text-yellow-800! hover:bg-yellow-50!"
                : "border-yellow-700! bg-white! hover:bg-yellow-50! text-yellow-700!",
            ].join(" ")}
          >
            <Image
              src="/images/ph_airplane-in-flight.svg"
              alt="NOK AIR"
              width={24}
              height={24}
              className="shrink-0"
            />
            <span className="text-[20px] font-bold truncate" aria-hidden>
              {t.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
