"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { WindowXmark, Refresh } from "iconoir-react";

type Kind = "server" | "invalid" | "network";

const COPY: Record<Kind, { title: string; desc: string }> = {
  server: {
    title: "ไม่สามารถดำเนินการได้ในขณะนี้",
    desc: "ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง",
  },
  invalid: {
    title: "ระบบขัดข้องชั่วคราว",
    desc: "ไม่สามารถตรวจสอบข้อมูลในขณะนี้ กรุณาลองใหม่อีกครั้ง",
  },
  network: {
    title: "เชื่อมต่อเครือข่ายไม่ได้",
    desc: "กรุณาตรวจสอบอินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
  },
};

const RETRY_KEY = "eligibility_retry_count";
const RETRY_LIMIT = 3;

export default function EligibilityErrorPage() {
  const router = useRouter();
  const params = useSearchParams();

  const kindParam = (params.get("kind") || "server") as Kind;
  const copy = useMemo(() => COPY[kindParam] ?? COPY.server, [kindParam]);

  useEffect(() => {
    const count = Number(sessionStorage.getItem(RETRY_KEY) || "0");
    if (count >= RETRY_LIMIT) {
      router.replace("/eligibility/expired");
    }
  }, [router]);

  const onRetry = useCallback(() => {
    const current = Number(sessionStorage.getItem(RETRY_KEY) || "0");
    const next = current + 1;
    sessionStorage.setItem(RETRY_KEY, String(next));
    if (next >= RETRY_LIMIT) {
      router.replace("/eligibility/expired");
      return;
    }
    if (typeof window !== "undefined") window.location.reload();
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col bg-white text-grey-900">
      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[920px] text-center">
          <div className="mx-auto flex h-[140px] w-[140px] items-center justify-center">
            <WindowXmark width={140} height={140} className="text-yellow-500" />
          </div>
          <h1 className="mt-6 text-[22px] md:text-[28px] font-extrabold text-black">
            {copy.title}
          </h1>
          <p className="mx-auto mt-2 max-w-[720px] text-[16px] md:text-[18px] text-grey-600">
            {copy.desc}
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              onClick={onRetry}
              className="
                h-12 md:h-12 w-[420px] max-w-[82vw]
                rounded-md text-[20px] font-semibold
                bg-primary text-yellow-900 hover:bg-yellow-500
                shadow-sm cursor-pointer
              "
            >
              <Refresh
                width={24}
                height={24}
                strokeWidth={2}
                className="mr-2 -mt-0.5"
              />
              ลองอีกครั้ง
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
