"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import OfferFooterActions from "@/components/pages/offer/OfferFooterActions";
import OfferPassengerCount from "@/components/pages/offer/OfferPassengerCount";
import { offerMock } from "@/data/offer.mock";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import BankSelect from "@/components/pages/offer/BankSelect";
import type { BankCode } from "@/data/banks";
import type { PaymentMethod } from "@/types/offer";

import {
  Bank as BankIcon,
  User as UserIcon,
  WarningCircle,
  HeadsetHelp,
  MastercardCard,
  WarningCircleSolid,
} from "iconoir-react";

function InfoPanel({
  icon,
  title,
  bullets,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  note?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-yellow-200 bg-yellow-50/60 p-8">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-yellow-400 bg-white text-yellow-500">
        {icon}
      </div>
      <h3 className="mb-3 text-center text-[22px] font-bold">{title}</h3>
      <ul className="mx-auto max-w-3xl list-disc space-y-2 pl-6 text-[18px] leading-7">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {note ? (
        <div className="mx-auto mt-4 max-w-3xl text-[18px]">{note}</div>
      ) : null}
    </div>
  );
}
// —————————————————————————————————————————————————————

export default function RefundPage() {
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

  const passengerOpts = useMemo(
    () =>
      offerMock.passengers.map((p) => ({
        id: p.id,
        label: `${(p.title || "").trim()} ${p.firstName} ${p.lastName}`.trim(),
      })),
    []
  );

  const primary =
    offerMock.passengers.find((p: any) => p.primary) ?? offerMock.passengers[0];
  const email = (primary as any)?.email || "";

  const [bank, setBank] = useState<BankCode | undefined>(undefined);
  const [accountName, setAccountName] = useState<string | undefined>(undefined);
  const [accountNo, setAccountNo] = useState<string>("");

  const canConfirmBank =
    !!count && !!bank && !!accountName && accountNo.trim().length > 0;

  const method: PaymentMethod = offerMock.payment.method;

  return (
    <section>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[460px_minmax(0,1fr)]">
        <aside className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-361/200 lg:hidden">
            <Image
              src="/images/refund_banner_m.svg"
              alt="ขอคืนเงินเต็มจำนวน"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative aspect-3/5 hidden lg:block">
            <Image
              src="/images/refund_banner.svg"
              alt="ขอคืนเงินเต็มจำนวน"
              fill
              className="object-contain object-left lg:object-center"
              priority
            />
          </div>
        </aside>
        <section className="rounded-md">
          <OfferPassengerCount
            names={selectedNames}
            className="mb-6"
            defaultOpen={false}
          />
          {method === "CARD" && (
            <>
              <section className="rounded-2xl bg-gray-50 p-4 lg:p-6">
                <div className="mx-auto mb-6 flex items-center justify-center rounded-2xl text-yellow-500">
                  <MastercardCard width={96} height={96} />
                </div>
                <h3 className="text-center text-[22px] lg:text-[26px] font-extrabold">
                  ท่านได้ชำระเงินผ่านช่องทางบัตรเครดิต/เดบิต
                </h3>
                <p className="mx-auto mt-6 max-w-4xl text-[18px] lg:text-[20px] leading-8 underline underline-offset-4">
                  เราจะดำเนินการคืนเงินไปยังบัตรใบเดิมที่ใช้ในการชำระเงิน
                </p>
                <ul className="mx-auto mt-4 max-w-4xl list-disc space-y-3 pl-6 text-[18px] leading-8">
                  <li>
                    โดยเงินจะคืนกลับเข้าบัตรใบเดิมภายในระยะเวลา 45 วัน
                    (ขึ้นอยู่ระยะเวลาการตัดรอบบิล)
                  </li>
                  <li>
                    หากไม่ได้รับเงินคืนภายในระยะเวลาที่กำหนด
                    กรุณาติดต่อศูนย์บริการลูกค้านกแอร์ โทร.1318
                  </li>
                </ul>
                <div className="mx-auto mt-6 max-w-4xl text-[18px] font-extrabold">
                  ต้องการขอคืนเงินเต็มจำนวน กรุณากดยืนยัน
                </div>
              </section>
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
            </>
          )}

          {method === "AGENCY" && (
            <>
              <section className="rounded-2xl bg-gray-50 p-4 lg:p-6">
                <div className="mx-auto mb-6 flex items-center justify-center rounded-2xl text-yellow-500">
                  <HeadsetHelp width={96} height={96} />
                </div>
                <h3 className="text-center text-[22px] lg:text-[26px] font-extrabold">
                  ท่านได้ซื้อตั๋วผ่านตัวแทนจำหน่าย
                </h3>
                <p className="mx-auto mt-6 max-w-4xl text-[18px] lg:text-[20px] leading-8 underline underline-offset-4">
                  หากต้องการขอคืนเงินเราจะดำเนินการผ่านตัวแทนจำหน่ายที่ท่านทำการจองไว้เท่านั้น
                  โดยจะใช้ระยะเวลาดำเนินการ 60 วัน
                </p>
                <div className="mx-auto mt-4 max-w-4xl list-disc space-y-3 text-[18px]">
                  กรุณาติดต่อไปยังตัวแทนจำหน่ายของท่านเพื่อดำเนินการขอคืนเงิน
                </div>
                <div className="mx-auto mt-4 max-w-4xl text-[18px] font-extrabold">
                  ต้องการขอคืนเงินเต็มจำนวน กรุณากดยืนยัน
                </div>
              </section>
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
            </>
          )}

          {method === "BANK" && (
            <>
              <div className="mb-2">
                <h3 className="text-[24px] font-bold">
                  กรุณากรอกช่องทางการคืนเงิน
                </h3>
                <p className="text-[16px] font-medium text-gray-500">
                  กรอกรายละเอียดเพื่อยืนยันช่องทางการโอนเงิน
                </p>
              </div>

              <div className="space-y-3">
                <div className="relative w-full">
                  <BankSelect
                    value={bank}
                    onChange={setBank}
                    showIcon={false}
                  />
                </div>

                <div className="relative w-full">
                  {!accountName && (
                    <UserIcon
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-grey-500"
                      width={20}
                      height={20}
                      strokeWidth={2}
                    />
                  )}

                  <Select value={accountName} onValueChange={setAccountName}>
                    <SelectTrigger
                      className={[
                        "[&_[data-slot=select-value][data-placeholder]]:text-gray-400",
                        "h-12! w-full rounded-md border border-gray-300 bg-white text-[18px] cursor-pointer",
                        accountName ? "" : "pl-12",
                      ].join(" ")}
                    >
                      <SelectValue placeholder="เลือกชื่อบัญชีผู้โดยสาร" />
                    </SelectTrigger>

                    <SelectContent className="rounded-md font-medium">
                      {passengerOpts.map((p) => (
                        <SelectItem
                          key={p.id}
                          value={p.label}
                          className="cursor-pointer"
                        >
                          <span className="text-lg">{p.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  placeholder="กรอกหมายเลขบัญชีธนาคาร"
                  className="h-12 rounded-md border-gray-300 text-[18px]!"
                  inputMode="numeric"
                />

                <div className="flex items-center gap-2 rounded-md bg-yellow-100 px-4 py-3 text-[18px]">
                  <WarningCircleSolid
                    width={18}
                    height={18}
                    className="text-yellow-600"
                  />
                  <span className="font-medium">
                    ระยะเวลาในการดำเนินคืนเงินภายใน 14 วัน
                  </span>
                </div>
              </div>
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
            </>
          )}
        </section>
      </div>
    </section>
  );
}
