"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import OfferFooterActions from "@/components/pages/offer/OfferFooterActions";
import { offerMock } from "@/data/offer.mock";
import OfferPassengerCount from "@/components/pages/offer/OfferPassengerCount";

export default function CreditHoldPage() {
  const paxMax = offerMock.passengers.length;
  const [count, setCount] = useState<string>(String(paxMax));
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    const namesStr = sessionStorage.getItem("offer:selectedPassengerNames");
    const initialNames = namesStr
      ? (JSON.parse(namesStr) as string[])
      : offerMock.passengers
          .filter((p) => p.selected)
          .map((p) => `${p.title} ${p.firstName} ${p.lastName}`.trim());

    setSelectedNames(initialNames);
  }, []);

  const primary =
    offerMock.passengers.find((p: any) => p.primary) ?? offerMock.passengers[0];
  const email = (primary as any)?.email || "";

  return (
    <section>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[460px_minmax(0,1fr)]">
        <aside className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-361/200 lg:hidden">
            <Image
              src="/images/credit_hold_banner_m.svg"
              alt="เก็บวงเงินไว้ใช้ภายใน 365 วัน (หากมีส่วนต่างค่โดยสารต้องชำระเพิ่ม)"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative aspect-3/5 hidden lg:block">
            <Image
              src="/images/credit_hold_banner.svg"
              alt="เก็บวงเงินไว้ใช้ภายใน 365 วัน (หากมีส่วนต่างค่โดยสารต้องชำระเพิ่ม)"
              fill
              className="object-contain object-left lg:object-center"
              priority
            />
          </div>
        </aside>
        <section className="rounded-2xl py-4 lg:py-6">
          <OfferPassengerCount
            names={selectedNames}
            className="mb-6"
            defaultOpen={false}
          />
          <div>
            <h2 className="text-[24px] font-bold">
              รายละเอียดการใช้สิทธิ์เก็บวงเงิน (Credit Shell)
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-[18px] font-medium leading-6">
              <li>Nok Air จะเก็บมูลค่าตั๋วของคุณไว้ในบัญชี Credit Shell</li>
              <li>ใช้งานได้ภายใน 365 วัน นับจากวันที่ยกเลิกเที่ยวบิน</li>
            </ul>
          </div>

          {/* เงื่อนไข */}
          <div className="mt-6">
            <h3 className="text-[24px] font-bold">เงื่อนไขการใช้วงเงิน</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-6 text-[18px] font-medium leading-6">
              <li>ต้องยืนยันร้องขอภายในวันเดินทางเดิม</li>
              <li>สามารถใช้กับเส้นทางบินใดก็ได้</li>
              <li>หากตั๋วใหม่มีราคาสูงกว่า ต้องชำระส่วนต่างเพิ่ม</li>
              <li>หากราคาต่ำกว่า จะไม่ได้รับส่วนต่างคืน</li>
              <li>
                หากซื้อช่องทางอื่น หรือจ่ายก่อนยกเลิกผ่านออนไลน์
                ต้องดำเนินการผ่านตัวแทนต้นทางนั้น
              </li>
            </ol>
          </div>

          {/* แจ้งติดต่อ + หมายเหตุ */}
          <div className="mt-6">
            <p className="text-[18px] font-medium">
              หากต้องการใช้สิทธิ์เก็บวงเงิน กรุณากดยืนยัน
              และสำเนาหน้าจอนี้ส่งเอกสารไปที่อีเมล{" "}
              <a
                href="mailto:Naomill69@noknoi.com"
                className="font-semibold underline decoration-yellow-500 underline-offset-2"
              >
                Naomill69@noknoi.com
              </a>
            </p>
          </div>

          {/* <OfferFooterActions
              confirmDisabled={false}
              onBack={() => history.back()}
              onConfirm={() => {
                console.log("Confirm Credit Hold");
              }}
            /> */}
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
  );
}
