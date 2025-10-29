"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { WindowXmark } from "iconoir-react";

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

  // เกิน limit แล้ว ให้ส่งไปหน้า expired
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
    // ให้รีเฟรชหน้าปัจจุบัน (หรือจะเรียก re-fetch ตามจริงในระบบของคุณก็ได้)
    if (typeof window !== "undefined") window.location.reload();
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col bg-white text-grey-900">
      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[880px] text-center">
          <div className="relative mx-auto w-[120px] h-[120px] md:w-36 md:h-36">
            <WindowXmark
              className="object-contain text-yellow-500"
              width={120}
              height={120}
            ></WindowXmark>
          </div>

          <h1 className="mt-6 text-balance text-[22px] md:text-[28px] font-bold text-black">
            {copy.title}
          </h1>

          <p className="mx-auto mt-3 max-w-[720px] text-pretty text-[16px] md:text-[18px] text-grey-900 leading-relaxed">
            ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => history.back()}
              className="h-11! w-36 px-5 rounded-md text-[16px] border-grey-300 text-yellow-900 cursor-pointer"
            >
              ย้อนกลับ
            </Button>
            <Button
              type="button"
              onClick={onRetry}
              className="h-11! w-36 px-6 rounded-md text-[16px] bg-primary text-yellow-900 hover:bg-yellow-600"
            >
              ลองอีกครั้ง
            </Button>

            <Button
              asChild
              className="h-11! w-36 px-6 rounded-md text-[16px] bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
            >
              <Link href="/">กลับหน้าหลัก</Link>
            </Button>
          </div>

          <p className="mt-3 text-[12px] text-grey-600">
            * ระบบจะพาไปหน้าหมดอายุอัตโนมัติเมื่อกดลองใหม่เกิน 3 ครั้ง
          </p>
        </div>
      </section>
    </main>
  );
}
