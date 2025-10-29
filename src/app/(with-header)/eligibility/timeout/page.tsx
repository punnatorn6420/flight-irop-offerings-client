"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function EligibilityTimeoutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-grey-900">
      <section className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[880px] text-center">
          <div className="relative mx-auto w-[120px] h-[120px] md:w-36 md:h-36">
            <Image
              src="/icons/timer-remove.png"
              alt="การรับสิทธิ์เกินกำหนดเวลา"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="mt-6 text-balance text-[22px] md:text-[28px] font-bold text-black">
            การรับสิทธิ์เกินกำหนดเวลา
          </h1>
          <p className="mx-auto mt-3 max-w-[720px] text-pretty text-[16px] md:text-[18px] text-grey-900 leading-relaxed">
            <div>ระบบตรวจสอบแล้วพบว่ามีเกินกำหนดการรับสิทธิ์</div>
            <span className="whitespace-nowrap">
              {" "}
              (24 ชม. หลังจากเวลาเดินทาง)
            </span>{" "}
            หากต้องการข้อมูลเพิ่มเติม กรุณาติดต่อศูนย์บริการลูกค้านกแอร์ โทร.{" "}
            <a
              href="tel:1318"
              className="font-medium text-yellow-600 underline decoration-yellow-400 underline-offset-2 hover:text-yellow-700"
            >
              1318
            </a>
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              asChild
              variant="outline"
              className="h-11! w-36 px-5 rounded-md text-[16px] border-grey-300 text-yellow-900 cursor-pointer"
            >
              <button onClick={() => history.back()}>ย้อนกลับ</button>
            </Button>
            <Button
              asChild
              className="h-11! w-36 px-6 rounded-md text-[16px] bg-primary text-yellow-900 hover:bg-yellow-600"
            >
              <Link href="/">กลับหน้าหลัก</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
