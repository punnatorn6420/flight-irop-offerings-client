"use client";

import Image from "next/image";
import { Check, CheckCircle, CheckCircleSolid, Copy } from "iconoir-react";
import { offerMock } from "@/data/offer.mock";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";

export default function OfferRedeemSuccessPage() {
  // หา primary + email
  const primary =
    offerMock.passengers.find((p: any) => p.primary) ?? offerMock.passengers[0];
  const email = (primary as any)?.email || "";

  const totalSegments = offerMock.trip.segments.length;
  const totalPassengers = offerMock.passengers.length;
  const totalTasks = totalSegments * totalPassengers;

  // นับงานที่สำเร็จจาก redeemProgress
  let doneTasks = 0;
  for (const pid of Object.keys(offerMock.redeemProgress || {})) {
    const arr = offerMock.redeemProgress[pid] || [];
    doneTasks += arr.filter(Boolean).length;
  }
  const allDone = doneTasks >= totalTasks;

  const shareLink =
    typeof window !== "undefined"
      ? `https://www.nokair.com/`
      : `https://www.nokair.com/`;

  const isSinglePassenger = totalPassengers === 1;
  const isPartial = !allDone;
  const showShareBlock = isPartial && !isSinglePassenger;

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // no-op
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-[980px] flex-col items-center px-4 py-12 md:pt-24">
      <div className="relative mb-8 w-full overflow-hidden justify-items-center">
        <div className="md:hidden">
          <Image
            src="/images/accept_banner_m.svg"
            alt="ระบบรับสิทธิ์ชดเชย"
            width={980}
            height={280}
            className="w-150 h-auto object-contain"
            priority
          />
        </div>
        <div className="hidden md:block">
          <Image
            src="/images/accept_banner.svg"
            alt="ระบบรับสิทธิ์ชดเชย"
            width={980}
            height={280}
            className="w-150 h-auto object-contain"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
      </div>

      {/* หัวเรื่อง */}
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center">
          <CheckCircleSolid
            className="text-yellow-600"
            width={36}
            height={36}
          />
        </span>
        <h1 className="text-center text-[24px] font-extrabold md:text-[28px]">
          ใช้สิทธิ์เรียบร้อยแล้ว!
        </h1>
      </div>
      <p className="mt-6 max-w-[820px] text-center text-[20px] leading-7 px-4 md:px-0">
        เราจะดำเนินการส่งเอกสารยืนยันไปที่อีเมล{" "}
        <a
          href={`mailto:${email}`}
          className="font-semibold underline decoration-yellow-500 underline-offset-2"
        >
          {email}
        </a>
        <div>
          ภายใน 1–2 วันทำการ หากมีข้อสงสัยเพิ่มเติม
          สามารถติดต่อศูนย์บริการลูกค้านกแอร์ โทร.1318
        </div>
      </p>
      {isPartial && (
        <>
          <button
            type="button"
            onClick={() => history.back()}
            className="mt-6 h-12 w-96 rounded-md bg-yellow-500 text-[20px] font-semibold text-yellow-800 hover:bg-yellow-500 cursor-pointer"
          >
            รับสิทธิ์ต่อ
          </button>
          {showShareBlock && (
            <>
              <div className=" leading-4 my-6 font-medium text-[18px]">
                <div className="text-center text-gray-400">หรือ</div>
                <div className="text-center text-gray-400">
                  คัดลอกลิงก์ให้ผู้โดยสารท่านอื่นรับสิทธิ์ต่อ
                </div>
              </div>
              <InputGroup className="w-96 md:w-xl h-12!">
                <InputGroupInput
                  readOnly
                  className="text-[20px]! "
                  value={shareLink}
                />
                <InputGroupAddon align="inline-end" className="">
                  <InputGroupButton
                    type="button"
                    onClick={handleCopy}
                    className="bg-yellow-500 text-yellow-900 py-4! px-2! rounded-md"
                  >
                    {copied ? (
                      <>
                        <Check width={24} height={24} />
                        <span className="text-[20px]! py-2!">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy width={24} height={24} />
                        <span className=" text-[20px]!">คัดลอก</span>
                      </>
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </>
          )}
        </>
      )}
      {allDone && (
        <button
          type="button"
          onClick={() => location.assign("https://www.nokair.com")}
          className="mt-8 h-12 w-96 rounded-md bg-yellow-500 text-[20px] font-semibold text-yellow-800 hover:bg-yellow-500 cursor-pointer"
        >
          ไปยังหน้าแรกนกแอร์
        </button>
      )}
    </section>
  );
}
