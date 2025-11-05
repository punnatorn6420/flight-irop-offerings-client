"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { WarningCircleSolid } from "iconoir-react";
import { useT } from "@/lib/i18n";

type Benefit = {
  id: string;
  title: string;
  note?: string;
  highlight?: boolean;
};

const BENEFIT_ROUTES: Record<string, string> = {
  "same-flight": "/offer/change-flight",
  "near-province": "/offer/change-route",
  "keep-credit": "/offer/credit-hold",
  refund: "/offer/refund",
  "no-benefit": "/offer/summary",
};

export default function BenefitList() {
  const t = useT("offer.benefits");
  const router = useRouter();

  const benefits: Benefit[] = useMemo(
    () => [
      {
        id: "same-flight",
        title: t(
          "items.sameFlight.title",
          "เปลี่ยนเที่ยวบินฟรี เส้นทางเดิม (ไม่เสียค่าใช้จ่าย 1 ครั้ง)"
        ),
      },
      {
        id: "near-province",
        title: t(
          "items.nearProvince.title",
          "เปลี่ยนเส้นทางไปจังหวัดใกล้เคียงฟรี (เดินทางภายในวันเดียวกัน)"
        ),
      },
      {
        id: "keep-credit",
        title: t(
          "items.keepCredit.title",
          "เก็บวงเงินไว้ใช้ภายใน 365 วัน (หากมีส่วนต่างค่าโดยสาร ต้องชำระเพิ่ม)"
        ),
      },
      {
        id: "refund",
        title: t("items.refund.title", "ขอคืนเงินเต็มจำนวน"),
      },
      {
        id: "no-benefit",
        title: t("items.noBenefit.title", "ไม่รับสิทธิ์"),
      },
    ],
    [t]
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDecline, setOpenDecline] = useState(false);

  const go = useCallback(
    (id: string) => {
      setSelectedId(id);
      if (id === "no-benefit") {
        setOpenDecline(true);
        return;
      }
      router.push(BENEFIT_ROUTES[id] ?? "/offer");
    },
    [router]
  );

  const confirmDecline = async () => {
    setOpenDecline(false);
    router.push(BENEFIT_ROUTES["no-benefit"]);
  };

  return (
    <>
      <div className="mb-5">
        <h3 className="text-[24px] font-bold">
          {t("title", "สิทธิประโยชน์ที่สายการบินรองรับ")}
        </h3>
        <p className="mt-1 text-[16px] leading-4 text-grey-700">
          {t("subtitle", "สิทธิ์ของแต่ละรายการนี้ขึ้นอยู่กับเงื่อนไขประกาศฯ")}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {benefits.map((b) => {
          const isSelected = selectedId === b.id;
          const highlightCls = b.highlight
            ? "border-[color:var(--color-yellow-400)]/60 bg-[color:var(--color-yellow-50)]"
            : "border-grey-200 bg-white hover:bg-grey-50";

          return (
            <article
              key={b.id}
              role="button"
              tabIndex={0}
              onClick={() => go(b.id)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && go(b.id)
              }
              className={[
                "relative overflow-hidden flex items-center justify-between gap-4 rounded-md border p-4 lg:p-5 shadow-sm outline-none transition",
                'before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2',
                "before:-right-20 lg:before:right-[-280px]",
                "before:w-[200px] before:h-32 lg:before:w-[405px] lg:before:h-40",
                "before:rounded-full before:bg-yellow-50 before:pointer-events-none",
                highlightCls,
                isSelected ? "ring-2 ring-yellow-500" : "ring-0",
              ].join(" ")}
            >
              <div className="relative z-1">
                <h4 className="text-[18px] font-semibold text-grey-900">
                  {b.title}
                </h4>
                {b.note && (
                  <p className="mt-1 text-[12px] text-grey-600">{b.note}</p>
                )}
              </div>
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(b.id);
                }}
                className="
                  relative z-1
                  rounded-lg text-[18px]! font-bold! h-10!
                "
              >
                {t("select", "เลือกสิทธิ์")}
              </Button>
            </article>
          );
        })}
      </div>
      <AlertDialog open={openDecline} onOpenChange={setOpenDecline}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center text-yellow-500">
              <WarningCircleSolid width={64} height={64} />
            </div>
            <AlertDialogTitle className="text-center text-[36px] font-extrabold">
              {t("decline.title", "ยืนยันการไม่ใช้สิทธิ์")}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-center text-[18px] leading-5 text-gray-800">
                {t(
                  "decline.desc",
                  "หากกดยืนยันไม่รับสิทธิ์จะไม่สามารถแก้ไข หรือยกเลิกได้"
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2 grid gap-3 grid-cols-2">
            <AlertDialogAction
              onClick={confirmDecline}
              className="h-12 rounded-md bg-primary text-[20px] hover:bg-yellow-400 text-yellow-800 cursor-pointer"
            >
              {t("decline.confirm", "ยืนยันไม่รับสิทธิ์")}
            </AlertDialogAction>
            <AlertDialogCancel className="h-12 rounded-md border-yellow-400 text-[20px] cursor-pointer hover:bg-yellow-50 text-yellow-800">
              {t("decline.cancel", "ยกเลิก")}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
