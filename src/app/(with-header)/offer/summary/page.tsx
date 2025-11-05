"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { offerMock } from "@/data/offer.mock";
import { useT } from "@/lib/i18n";
import { BadgeCheck } from "iconoir-react";
import { useRouter } from "next/navigation";

export default function OfferSummaryPage() {
  const t = useT("offer.summary");
  const router = useRouter();
  const handleEdit = () => history.back();
  const handleConfirm = () => {
    router.replace("/offer/success");
  };

  return (
    <section>
      <div className="text-center">
        <div className="mx-auto flex h-32 w-32 items-center justify-center">
          <BadgeCheck width={140} height={140} className="text-yellow-500" />
        </div>
        <h1 className="text-[32px] md:text-[42px] font-extrabold text-black">
          {t("title", "กรุณาตรวจสอบ และยืนยันการรับสิทธิ์")}
        </h1>
        <p className="text-[16px] md:text-[20px] text-grey-900">
          {t(
            "subtitle",
            "โปรดตรวจสอบรายละเอียดของผู้โดยสารแต่ละท่านให้ถูกต้องก่อนยืนยัน"
          )}
        </p>
      </div>
      <article className="mx-auto mt-4 max-w-2xl rounded-2xl bg-grey-50">
        <div className="px-5 py-2 font-bold text-yellow-700 text-2xl">
          {t("sectionTitle", "รายละเอียดการรับสิทธิ์ — PNR:")}{" "}
          {offerMock.pnrNumber}
        </div>
        <div className="px-1 py-2">
          {(() => {
            const selectionTextByPid: Record<string, string> = {
              [offerMock.passengers[0]?.id ?? ""]: t(
                "choices.sameRoute",
                "เปลี่ยนเที่ยวบินเส้นทางเดิมฟรี 1 ครั้ง (เชียงใหม่-ดอนเมือง 14:15–15:30)"
              ),
              [offerMock.passengers[1]?.id ?? ""]: t(
                "choices.refund",
                "ขอคืนเงิน"
              ),
            };

            return (
              <ScrollArea type="auto" className="h-46">
                <ul>
                  {offerMock.passengers.map((p, idx) => {
                    const displayName = `${p.title ?? ""} ${
                      p.firstName ?? ""
                    } ${p.lastName ?? ""}`.trim();
                    const text = selectionTextByPid[p.id];
                    const isPending = !text;
                    return (
                      <li key={p.id}>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] text-lg leading-8">
                          <div className="flex items-start gap-3">
                            <span className="w-6 shrink-0 text-right font-bold">
                              {idx + 1}
                            </span>
                            <div className="font-bold">{displayName}</div>
                          </div>
                          <div
                            className={[
                              isPending
                                ? "text-grey-700 italic"
                                : "font-medium",
                            ].join(" ")}
                          >
                            {isPending
                              ? t(
                                  "pending",
                                  "ยังไม่รับสิทธิ์ (ต้องทำรายการ 24 ชั่วโมงก่อนการเดินทาง)"
                                )
                              : text}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <ScrollBar orientation="vertical" forceMount />
              </ScrollArea>
            );
          })()}
        </div>
      </article>
      <div className="mx-auto mt-4 max-w-2xl grid grid-cols-1 gap-3 md:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="h-12! border-yellow-500! bg-white! hover:bg-yellow-50!"
          onClick={handleEdit}
        >
          {t("edit", "แก้ไขการรับสิทธิ์")}
        </Button>
        <Button className="h-12!" type="button" onClick={handleConfirm}>
          {t("confirm", "ยืนยันการรับสิทธิ์")}
        </Button>
      </div>
    </section>
  );
}
