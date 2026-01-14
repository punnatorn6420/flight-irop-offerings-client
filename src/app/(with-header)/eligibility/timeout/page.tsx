"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TimerOff } from "iconoir-react";
import { useT } from "@/lib/i18n";
import router from "next/router";

export default function EligibilityTimeOutPage() {
  const t = useT("eligibility.timeout");

  return (
    <section className="items-center justify-center text-center">
      <div className="mx-auto flex h-[140px] w-[140px] items-center justify-center">
        <TimerOff width={140} height={140} className="text-yellow-500" />
      </div>
      <h1 className="mt-6 text-balance text-[22px] lg:text-[28px] font-bold text-black">
        {t("title", "การรับสิทธิ์เกินกำหนดเวลา")}
      </h1>
      <div className="mx-auto mt-3 max-w-[720px] text-pretty text-[16px] lg:text-[18px] text-grey-700 leading-6">
        <p>{t("line1", "ระบบตรวจสอบแล้วพบว่าเกินกำหนดการรับสิทธิ์")}</p>
        <p>
          {t(
            "line2",
            "(24 ชม. หลังจากเวลาเดินทาง) หากต้องการข้อมูลเพิ่มเติม กรุณาติดต่อศูนย์บริการลูกค้านกแอร์ โทร. 1318",
          )}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-11! w-36 rounded-md border-grey-300 text-[16px] text-yellow-900"
        >
          {t("back", "ย้อนกลับ")}
        </Button>
        <Button
          asChild
          className="h-11! w-36 rounded-md bg-primary text-[16px] text-yellow-900 hover:bg-yellow-600"
        >
          <Link href="/">{t("home", "กลับหน้าหลัก")}</Link>
        </Button>
      </div>
    </section>
  );
}
