"use client";

import { useMemo, useState } from "react";
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
import { Landmark, CircleAlert, UserRound } from "lucide-react";
import { BankCode } from "@/data/banks";
import BankSelect from "@/components/pages/offer/BankSelect";

type Props = {
  value?: BankCode;
  onChange: (v: BankCode) => void;
  className?: string;
};

export default function RefundPage() {
  // จำนวนผู้โดยสาร
  const paxMax = offerMock.passengers.length;
  const [count, setCount] = useState<string>(String(paxMax));

  const passengerOpts = useMemo(
    () =>
      offerMock.passengers.map((p) => ({
        id: p.id,
        label: `${(p.title || "").trim()} ${p.firstName} ${p.lastName}`.trim(),
      })),
    []
  );

  const [bank, setBank] = useState<BankCode | undefined>(undefined);
  const [accountName, setAccountName] = useState<string | undefined>(undefined);
  const [accountNo, setAccountNo] = useState<string>("");

  const canConfirm =
    !!count && !!bank && !!accountName && accountNo.trim().length > 0;

  return (
    <main className="min-h-screen">
      <section className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-6 px-4 pb-12 pt-6 md:grid-cols-[460px_minmax(0,1fr)] md:px-6">
        <aside className="relative aspect-3/4 overflow-hidden rounded-md md:aspect-3/5">
          <Image
            src="/images/refund_banner.png"
            alt="ขอคืนเงินเต็มจำนวน"
            fill
            className="object-contain object-left md:object-center"
            priority
          />
        </aside>

        <section className="rounded-md py-4 md:py-6">
          <OfferPassengerCount
            max={paxMax}
            value={count}
            onValueChange={setCount}
            className="mb-6"
          />

          <div className="mb-2 ">
            <h3 className="text-[24px] font-bold">
              กรุณากรอกช่องทางการคืนเงิน
            </h3>
            <p className="text-[16px] text-gray-500 font-medium">
              กรอกรายละเอียดเพื่อยืนยันช่องทางการโอนเงิน
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative w-full">
              <Landmark className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-500" />
              <BankSelect value={bank} onChange={setBank} showIcon={false} />
            </div>
            <div className="relative w-full">
              <UserRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-500" />
              <Select value={accountName} onValueChange={setAccountName}>
                <SelectTrigger className="[&_[data-slot=select-value]:not([data-placeholder])]:text-gray-400 cursor-pointer h-12! w-full rounded-md border border-gray-300 bg-white pl-12 text-[18px] ">
                  <SelectValue placeholder="เลือกชื่อบัญชีผู้โดยสาร" />
                </SelectTrigger>
                <SelectContent className="rounded-md font-medium">
                  {passengerOpts.map((p) => (
                    <SelectItem key={p.id} value={p.label}>
                      <span className="text-lg font-medium! text-black">
                        {" "}
                        {p.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              placeholder="กรอกหมายเลขบัญชีธนาคาร"
              className="[&_[data-slot=select-value]:not([data-placeholder])]:text-gray-400 cursor-pointer h-12 rounded-md border-gray-300 text-[18px]!"
              inputMode="numeric"
            />
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-3 text-[18px] ">
              <CircleAlert className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">
                ระยะเวลาในการดำเนินคืนเงินภายใน 14 วัน
              </span>
            </div>
          </div>

          <OfferFooterActions
            confirmDisabled={!canConfirm}
            onBack={() => history.back()}
            onConfirm={() => {
              console.log("Refund Submit", {
                count,
                bank,
                accountName,
                accountNo,
              });
            }}
          />
        </section>
      </section>
    </main>
  );
}
