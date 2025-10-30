"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { Calendar, NavArrowLeft, NavArrowRight } from "iconoir-react";

const AVAIL_MAP: Record<string, Record<string, string[]>> = {
  "2025-10": {
    "02": ["08:15 - 09:30", "10:15 - 11:30", "12:50 - 14:05", "17:25 - 18:30"],
    "04": ["10:15 - 11:30"],
    "05": ["12:50 - 14:05"],
    "06": ["08:15 - 09:30", "12:50 - 14:05"],
    "07": ["08:15 - 09:30", "10:15 - 11:30"],
  },
};

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
const TH_DOW = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

function ymLabel(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${TH_MONTHS[(m ?? 1) - 1]} ${y}`;
}
function getDaysInMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m, 0).getDate();
}
function dayOfWeek(ym: string, dd: number) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, dd).getDay();
}

export default function ChangeFlightSameRoutePage() {
  const paxMax = offerMock.passengers.length;

  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  const [count, setCount] = useState<string>(String(paxMax));

  // useEffect(() => {

  // }, []);

  const months = useMemo(() => Object.keys(AVAIL_MAP).sort(), []);
  const defaultMonth = useMemo(() => {
    for (const ym of months) {
      const hasAny = Object.values(AVAIL_MAP[ym] || {}).some(
        (slots) => slots?.length > 0
      );
      if (hasAny) return ym;
    }
    return months[0] ?? "";
  }, [months]);

  const [currentYM, setCurrentYM] = useState<string>(defaultMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const WINDOW = 6;
  const totalDays = getDaysInMonth(currentYM);
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const [winStart, setWinStart] = useState(0);

  useEffect(() => {
    setWinStart(0);
    const daysWithFlight = Object.keys(AVAIL_MAP[currentYM] || {})
      .map((d) => Number(d))
      .sort((a, b) => a - b);
    setSelectedDay(daysWithFlight[0] ?? null);
    setSelectedSlot(null);
    setMounted(true);
    const namesStr = sessionStorage.getItem("offer:selectedPassengerNames");

    const initialNames = namesStr
      ? (JSON.parse(namesStr) as string[])
      : offerMock.passengers
          .filter((p) => p.selected)
          .map((p) => `${p.title} ${p.firstName} ${p.lastName}`.trim());

    setSelectedNames(initialNames);
    setSelectedCount(initialNames.length);
  }, [currentYM]);

  const slotsToday =
    (selectedDay &&
      AVAIL_MAP[currentYM]?.[String(selectedDay).padStart(2, "0")]) ||
    [];

  const primary =
    offerMock.passengers.find((p: any) => p.primary) ?? offerMock.passengers[0];
  const email = (primary as any)?.email || "";

  const monthOptions = months.map((ym) => ({ label: ymLabel(ym), value: ym }));

  const visibleDays = daysArray.slice(winStart, winStart + WINDOW);
  const canSlideLeft = winStart > 0;
  const canSlideRight = winStart + WINDOW < daysArray.length;
  const slideLeft = () =>
    canSlideLeft && setWinStart((s) => Math.max(0, s - 1));
  const slideRight = () =>
    canSlideRight &&
    setWinStart((s) => Math.min(daysArray.length - WINDOW, s + 1));

  return (
    <main className="min-h-screen flex flex-col">
      <section className="mx-auto w-full max-w-[1120px] flex-1 px-4 md:px-6 pt-4 md:pt-6 pb-24 md:pb-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[460px_minmax(0,1fr)]">
          <aside className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-361/200 md:hidden">
              <Image
                src="/images/change_flight_free_banner_m.svg"
                alt="เปลี่ยนเที่ยวบินฟรี เส้นทางเดิม"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative aspect-3/5 hidden md:block">
              <Image
                src="/images/change_flight_free_banner.svg"
                alt="เปลี่ยนเที่ยวบินฟรี เส้นทางเดิม"
                fill
                className="object-contain object-left md:object-center"
                priority
              />
            </div>
          </aside>
          <section className="rounded-2xl py-4 md:py-6">
            <div>
              <OfferPassengerCount
                names={selectedNames}
                className="mb-6"
                defaultOpen={false}
              />
              <h3 className="mb-3 text-[24px] font-bold">เลือกวันเดินทาง</h3>
              <div className="flex items-center gap-4">
                <div>
                  <Select
                    value={currentYM}
                    onValueChange={(v) => setCurrentYM(v)}
                  >
                    <SelectTrigger
                      className="
                        relative h-12! w-64 rounded-md border border-grey-500
                        pl-12 font-medium cursor-pointer
                      "
                    >
                      <Calendar
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-grey-500 size-5"
                        strokeWidth={2}
                      />
                      <SelectValue placeholder="เลือกเดือน" />
                    </SelectTrigger>
                    <SelectContent className="round-md">
                      {monthOptions.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="cursor-pointer"
                        >
                          <span className="text-[22px]">{opt.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={slideLeft}
                    disabled={!canSlideLeft}
                    className="h-10! w-10 cursor-pointer"
                  >
                    <NavArrowLeft width={20} height={20} strokeWidth={2} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={slideRight}
                    disabled={!canSlideRight}
                    className="h-10! w-10 cursor-pointer"
                  >
                    <NavArrowRight width={20} height={20} strokeWidth={2} />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory pb-2">
                {visibleDays.map((d) => {
                  const dd = String(d).padStart(2, "0");
                  const flights = AVAIL_MAP[currentYM]?.[dd]?.length ?? 0;
                  const disabled = flights === 0;
                  const isActive = selectedDay === d;

                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => !disabled && setSelectedDay(d)}
                      className={[
                        "flex h-[130px] w-[92px] shrink-0 cursor-pointer flex-col items-center rounded-md  border-2 px-3 py-4 text-center transition",
                        disabled
                          ? "border-grey-200 bg-grey-50 text-grey-600"
                          : "border-grey-200 bg-white  hover:bg-yellow-50 hover:border-yellow-200",
                        isActive && !disabled
                          ? "border-yellow-500 bg-yellow-200 text-yellow-800"
                          : "",
                      ].join(" ")}
                    >
                      <div className="text-[18px] font-bold">
                        {TH_DOW[dayOfWeek(currentYM, d)]}
                      </div>
                      <div
                        className={[
                          "font-medium text-5xl",
                          disabled ? "text-grey-600 " : "text-yellow-600 ",
                        ].join(" ")}
                      >
                        {d}
                      </div>
                      <div className="mt-1 text-[18px] font-bold">
                        {disabled ? "-" : `${flights} เที่ยวบิน`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
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
                        <Calendar
                          width={24}
                          height={24}
                          strokeWidth={2}
                          className="text-grey-500"
                        />
                      </div>
                      <div className="text-[18px] text-grey-700">
                        ไม่พบเที่ยวบิน กรุณาเลือกวันเดินทาง
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
