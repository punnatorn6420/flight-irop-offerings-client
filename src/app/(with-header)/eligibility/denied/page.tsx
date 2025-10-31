"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function EligibilityTimeoutPage() {
  return (
    <section className="flex-1 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[880px] text-center">
        <div className="relative mx-auto w-[120px] h-[120px] lg:w-36 lg:h-36">
          <Image
            src="/icons/denied.svg"
            alt="การรับสิทธิ์เกินกำหนดเวลา"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="mt-6 text-balance text-[22px] lg:text-[28px] font-bold text-black">
          ไม่เข้าเงื่อนไขการรับสิทธิ์
        </h1>
        <p className="mx-auto mt-3 max-w-[720px] text-pretty text-[16px] lg:text-[18px] text-grey-900 leading-relaxed">
          <div>ขออภัยค่ะ คุณไม่เข้าเงื่อนไขในการรับสิทธิ์ตามที่กำหนด</div>
          <div>กรุณาตรวจสอบรายละเอียดเงื่อนไขอีกครั้งก่อนทำรายการใหม่</div>
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
  );
}
