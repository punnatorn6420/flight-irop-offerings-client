"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  noBrand?: boolean;
  noFooter?: boolean;
};

export default function LoginForm(_: Props) {
  const [pnr, setPnr] = useState("");
  const [lastName, setLastName] = useState("");
  const canSubmit = pnr.trim() !== "" && lastName.trim() !== "";
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    router.replace("/offer");
  };

  return (
    <div className="flex min-h-full flex-col">
      <section>
        <h2 className="text-center text-[32px] font-bold">
          กรุณากรอกข้อมูลเที่ยวบินของท่าน
        </h2>
        <p className="mt-1 text-center text-[20px] text-grey-600">
          โปรดกรอกรหัสการจองและนามสกุลของท่าน เพื่อยืนยันตัวตน
        </p>
        <form onSubmit={onSubmit} className="mt-4 lg:mt-6 space-y-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pnr" className="sr-only">
              รหัสการจอง (PNR)
            </Label>
            <Input
              id="pnr"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.toUpperCase())}
              placeholder="กรอกรหัสการจอง (PNR)"
              className="h-12! rounded-md text-lg!"
              autoComplete="off"
              inputMode="text"
              maxLength={8}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="lname" className="sr-only">
              นามสกุล
            </Label>
            <Input
              id="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="กรอกนามสกุล (ไทย/อังกฤษ)"
              className="h-12! rounded-md text-lg!"
              autoComplete="family-name"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={!canSubmit} className="w-full">
              ยืนยัน
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
