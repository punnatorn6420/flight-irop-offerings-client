"use client";

import { useT, useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { OfferMock } from "@/types/offer";

function formatDateByLocale(iso: string, locale: "th" | "en") {
  const d = new Date(`${iso}T00:00:00`);
  const fmt = new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return fmt.format(d);
}

function formatTimeRange(
  from: string,
  to: string,
  locale: "th" | "en"
): string {
  return locale === "th" ? `${from} - ${to} น.` : `${from} – ${to}`;
}

export default function FlightInfoCard({
  tripType,
  segment,
  className,
  originalSegment,
}: {
  tripType: OfferMock["trip"]["tripType"];
  segment: OfferMock["trip"]["segments"][number];
  className?: string;
  originalSegment?: OfferMock["trip"]["segments"][number];
}) {
  const t = useT("offer.flightInfo");
  const locale = useLocale();

  const rows: [string, string][] = [
    [
      t("tripType.label", "ประเภทเที่ยวบิน"),
      tripType === "ROUND_TRIP"
        ? t("tripType.roundTripOutbound", "ไป-กลับ (ขาไป)")
        : t("tripType.oneWay", "ขาเดียว"),
    ],
    [t("flightNumber", "เลขเที่ยวบิน"), segment.flightNumber],
    [
      t("route", "เส้นทาง"),
      `${segment.originName} (${segment.origin}) → ${segment.destinationName} (${segment.destination})`,
    ],
    [
      t("travelDate", "วันเดินทาง"),
      formatDateByLocale(segment.travelDateIso, locale),
    ],
    [
      t("originalTime", "เวลาเดินทางเดิม"),
      formatTimeRange(
        originalSegment ? originalSegment.departTime : segment.departTime,
        originalSegment ? originalSegment.arriveTime : segment.arriveTime,
        locale
      ),
    ],
    [
      t("newTime", "เวลาเดินทางใหม่"),
      formatTimeRange(segment.departTime, segment.arriveTime, locale),
    ],
    [t("status", "สถานะเที่ยวบิน"), segment.statusNote ?? "-"],
  ];

  return (
    <article className={cn("bg-gray-100 p-4 md:p-5 rounded-2xl", className)}>
      <h3 className="mb-3 font-bold text-[24px]">
        {t("title", "ข้อมูลเที่ยวบิน")}
      </h3>
      <div className="space-y-2 text-[20px] leading-6">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] items-start gap-2">
            <div className="font-bold">{k} :</div>
            <div className="font-medium">{v}</div>
          </div>
        ))}
      </div>
    </article>
  );
}
