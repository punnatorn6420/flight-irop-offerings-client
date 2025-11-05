"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WindowXmark, Refresh } from "iconoir-react";
import { useT } from "@/lib/i18n";
import { useState } from "react";

export default function EligibilityErrorPage() {
  const t = useT("eligibility.error");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRetry = () => {
    if (loading) return;
    setLoading(true);
    router.refresh();
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="items-center justify-center text-center">
      <div className="mx-auto flex h-[140px] w-[140px] items-center justify-center">
        <WindowXmark width={140} height={140} className="text-yellow-500" />
      </div>

      <h1 className="mt-6 text-balance text-[22px] lg:text-[28px] font-bold text-black">
        {t("title", "ไม่สามารถดำเนินการได้ในขณะนี้")}
      </h1>

      <div className="mx-auto mt-3 max-w-[720px] text-pretty text-[16px] lg:text-[18px] text-grey-700 leading-6">
        <p>{t("desc", "ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง")}</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleRetry}
          disabled={loading}
          className="h-11! lg:w-80 rounded-md border-grey-300 text-[16px] text-yellow-900"
        >
          <Refresh
            width={18}
            height={18}
            className={`mr-2 ${loading ? "animate-spin" : ""}`}
          />
          {loading
            ? t("retrying", "กำลังลองอีกครั้ง...")
            : t("retry", "ลองอีกครั้ง")}
        </Button>
      </div>
    </section>
  );
}
