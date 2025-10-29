"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { offerMock } from "@/data/offer.mock";
import OfferFooterActions from "@/components/pages/offer/OfferFooterActions";
import OfferPassengerCount from "@/components/pages/offer/OfferPassengerCount";
import {
  routeKey,
  getMonthsForRoute,
  getDaysForRoute,
  getSlotsForRoute,
} from "@/data/offer_change_route.mock";
import { Calendar } from "iconoir-react";

const AVAIL_MAP: Record<string, Record<string, string[]>> = {};

// ——————————————————— util ———————————————————
const TH_MONTHS = [
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
];
function ymLabel(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${TH_MONTHS[(m ?? 1) - 1]} ${y}`;
}
function getDaysInMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}

export default function ChangeFlightSameRoutePage() {
  // ผู้โดยสาร
  const paxMax = offerMock.passengers.length;

  const [count, setCount] = useState<string>(String(paxMax));

  const primary =
    offerMock.passengers.find((p: any) => p.primary) ?? offerMock.passengers[0];
  const email = (primary as any)?.email || "";

  const ORIGINS = [
    { code: "CNX", label: "เชียงใหม่ (เชียงใหม่)" },
    { code: "KBV", label: "กระบี่ (กระบี่)" },
    { code: "HDY", label: "หาดใหญ่ (สงขลา)" },
  ];
  const DESTS = [
    { code: "DMK", label: "กรุงเทพฯ (ดอนเมือง)" },
    { code: "UTH", label: "อุดรธานี (อุดรธานี)" },
    { code: "URT", label: "สุราษฎร์ธานี (สุราษฎร์ฯ)" },
  ];

  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const [dest, setDest] = useState<string>("DMK");

  const months = useMemo(() => Object.keys(AVAIL_MAP).sort(), []);
  const defaultMonth = useMemo(() => months[0] ?? "", [months]);
  const [currentYM, setCurrentYM] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotsToday, setSlotsToday] = useState<string[]>([]);

  useEffect(() => {
    const rk = routeKey(origin, dest);
    const months = getMonthsForRoute(rk);
    const firstYM = months[0] ?? "";
    setCurrentYM(firstYM);

    const days = firstYM ? getDaysForRoute(rk, firstYM) : [];
    const firstDD = days[0] ?? null;
    setSelectedDay(firstDD);

    const slots = firstDD ? getSlotsForRoute(rk, firstYM, firstDD) : [];
    setSlotsToday(slots);
    setSelectedSlot(null);
  }, [origin, dest]);

  useEffect(() => {
    if (!currentYM || !selectedDay) {
      setSlotsToday([]);
      setSelectedSlot(null);
      return;
    }
    const rk = routeKey(origin, dest);
    setSlotsToday(getSlotsForRoute(rk, currentYM, selectedDay));
    setSelectedSlot(null);
  }, [currentYM, selectedDay, origin, dest]);

  const confirmDisabled =
    !count || !origin || !dest || !selectedDay || !selectedSlot;

  return (
    <main className="min-h-screen flex flex-col">
      <section className="mx-auto w-full max-w-[1120px] flex-1 px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[460px_minmax(0,1fr)]">
          {/* <aside className="relative aspect-3/4 overflow-hidden rounded-2xl md:aspect-3/5">
            <Image
              src="/images/change_route_free_banner.png"
              alt="เปลี่ยนเส้นทางไปจังหวัดใกล้เคียงฟรี (เดินทางภายในวันเดียวกัน)"
              fill
              className="object-contain object-left md:object-center"
              priority
            />
          </aside> */}
          <aside className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-361/200 md:hidden">
              <Image
                src="/images/change_route_free_banner_m.png"
                alt="เปลี่ยนเส้นทางไปจังหวัดใกล้เคียงฟรี (เดินทางภายในวันเดียวกัน)"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative aspect-3/5 hidden md:block">
              <Image
                src="/images/change_route_free_banner.png"
                alt="เปลี่ยนเส้นทางไปจังหวัดใกล้เคียงฟรี (เดินทางภายในวันเดียวกัน)"
                fill
                className="object-contain object-left md:object-center"
                priority
              />
            </div>
          </aside>
          <section className="rounded-2xl py-4 md:py-6">
            <OfferPassengerCount
              max={paxMax}
              value={count}
              onValueChange={setCount}
              className="mb-6"
            />

            <section>
              <h3 className="mb-3 text-[24px] font-bold">เลือกเส้นทาง</h3>
              <div className="grid grid-cols-[44px_128px_minmax(0,1fr)] gap-x-4 gap-y-6 items-center!">
                <div className="relative col-start-1 row-span-2 min-h-24">
                  <div className="absolute left-1/2 -translate-x-1/2 top-3.5 bottom-3.5 w-1 rounded bg-[#F6C200]" />
                  <span className="absolute left-1/2 -translate-x-1/2 top-0 h-7 w-7 rounded-full border-[3px] border-[#F6C200] bg-white" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-7 w-7 rounded-full border-[3px] border-[#F6C200] bg-white" />
                </div>
                <div className="col-start-2 row-start-1">
                  <div className="text-[20px] font-semibold text-[#1f2937]">
                    ต้นทาง :
                  </div>
                  <div className="text-[16px] leading-4 text-grey-800 font-medium">
                    (ในภูมิภาคเดียวกันเท่านั้น)
                  </div>
                </div>
                <div className="col-start-3 row-start-1 justify-items-end">
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger className="h-auto! w-50 rounded-md cursor-pointer border border-grey-300 bg-white pl-3 text-[18px] font-medium data-[state=open]:ring-2 data-[state=open]:ring-[#F6C200]/40">
                      <SelectValue placeholder="กรุณาเลือกจังหวัด" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md">
                      {ORIGINS.map((o) => (
                        <SelectItem
                          key={o.code}
                          value={o.code}
                          className="cursor-pointer"
                        >
                          <span className="text-lg cursor-pointer">
                            {o.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-start-2 row-start-2">
                  <div className="text-[20px] font-semibold text-[#1f2937]">
                    ปลายทาง :
                  </div>
                  <div className="text-[16px] leading-4 text-grey-800 font-medium">
                    (สามารถเลือกได้)
                  </div>
                </div>
                <div className="col-start-3 row-start-2 justify-items-end">
                  <Select value={dest} onValueChange={setDest}>
                    <SelectTrigger className="h-auto! w-50 rounded-md border cursor-pointer border-grey-300 bg-white pl-3 text-[18px] font-medium data-[state=open]:ring-2 data-[state=open]:ring-[#F6C200]/40">
                      <SelectValue placeholder="กรุณาเลือกจังหวัด" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md ">
                      {DESTS.map((d) => (
                        <SelectItem
                          key={d.code}
                          value={d.code}
                          className="cursor-pointer"
                        >
                          <span className="text-lg ">{d.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <div className="mt-6">
              <h3 className="mb-3 text-[24px] font-bold">เลือกเวลาเที่ยวบิน</h3>

              <div role="radiogroup" className="grid gap-3 grid-cols-3">
                {slotsToday.length > 0 ? (
                  slotsToday.map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        aria-pressed={active}
                        className={[
                          "h-12 w-full cursor-pointer rounded-lg border text-center text-[16px] font-bold",
                          active
                            ? "border-yellow-500 bg-yellow-50 text-[#9A7B00]"
                            : "border-yellow-500 bg-white text-yellow-700 hover:bg-yellow-50",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-full">
                    <div className="mx-auto max-w-xl rounded-2xl border border-grey-200 bg-white p-8 text-center shadow-sm">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-grey-200">
                        {/* <CalendarX2 className="h-6 w-6 text-grey-500" /> */}
                        <Calendar
                          width={24}
                          height={24}
                          strokeWidth={2}
                          className="text-grey-500"
                        />
                      </div>
                      <div className="text-[16px] text-grey-600">
                        ไม่พบเที่ยวบิน กรุณาเลือกเส้นทาง (และวันเดินทาง)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <OfferFooterActions
              confirmMode="dialog"
              confirmDisabled={false}
              onBack={() => history.back()}
              onConfirm={async () => {}}
              confirmDialog={{
                title: "ยืนยันการใช้สิทธิ์",
                descriptionTop:
                  "หากกดยืนยันรับสิทธิ์จะไม่สามารถแก้ไข หรือยกเลิกได้",
                email: email,
                confirmText: "ยืนยันรับสิทธิ์",
                cancelText: "ยกเลิก",
              }}
            />
          </section>
        </div>
      </section>
    </main>
  );
}
