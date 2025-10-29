"use client";

import type { OfferMock } from "@/types/offer";

function formatThaiDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const dow = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."][d.getDay()];
  const month = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ][d.getMonth()];
  return `${dow} ${d.getDate()} ${month} ${d.getFullYear()}`;
}

export default function FlightInfoCard({
  tripType,
  segment,
  originalSegment,
}: {
  tripType: OfferMock["trip"]["tripType"];
  segment: OfferMock["trip"]["segments"][number];
  originalSegment?: OfferMock["trip"]["segments"][number];
}) {
  const rows: [string, string][] = [
    [
      "ประเภทเที่ยวบิน",
      tripType === "ROUND_TRIP" ? "ไป - กลับ (ขาไป)" : "ขาเดียว",
    ],
    ["เลขเที่ยวบิน", segment.flightNumber],
    [
      "เส้นทาง",
      `${segment.originName} (${segment.origin}) → ${segment.destinationName} (${segment.destination})`,
    ],
    ["วันเดินทาง", formatThaiDate(segment.travelDateIso)],
    [
      "เวลาเดินทางเดิม",
      originalSegment
        ? `${originalSegment.departTime} - ${originalSegment.arriveTime} น.`
        : `${segment.departTime} - ${segment.arriveTime} น.`,
    ],
    ["เวลาเดินทางใหม่", `${segment.departTime} - ${segment.arriveTime} น.`],
    ["สถานะเที่ยวบิน", segment.statusNote ?? "-"],
  ];

  return (
    <article className="bg-gray-100 p-4 md:p-5 rounded-2xl">
      <h3 className="mb-3 font-bold text-[24px]">ข้อมูลเที่ยวบิน</h3>
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
