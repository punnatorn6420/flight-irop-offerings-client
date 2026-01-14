"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

type Props = {
  noBrand?: boolean;
  noFooter?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LoginForm(_: Props) {
  const t = useT("login");
  const [pnr, setPnr] = useState("");
  const [lastName, setLastName] = useState("");
  const [touched, setTouched] = useState<{ pnr?: boolean; last?: boolean }>({});
  const router = useRouter();

  const pnrRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    pnrRef.current?.focus();
  }, []);

  const pnrValid = useMemo(() => /^[A-Z0-9]{5,8}$/.test(pnr), [pnr]);
  const lastValid = useMemo(() => lastName.trim().length > 0, [lastName]);
  const canSubmit = pnrValid && lastValid;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const params = new URLSearchParams({
      pnr,
      lastName: lastName.trim(),
    });
    router.replace(`/offer?${params.toString()}`);
  };

  return (
    <div className="flex min-h-full flex-col">
      <section>
        <h2 className="text-center text-[32px] font-bold">
          {t("title", "กรุณากรอกข้อมูลเที่ยวบินของท่าน")}
        </h2>
        <p className="mt-1 text-center text-[20px] text-grey-600">
          {t(
            "subtitle",
            "โปรดกรอกรหัสการจองและนามสกุลของท่าน เพื่อยืนยันตัวตน",
          )}
        </p>
        <form onSubmit={onSubmit} className="mt-4 lg:mt-6 space-y-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="pnr" className="sr-only">
              {t("pnr.label", "รหัสการจอง (PNR)")}
            </Label>
            <Input
              ref={pnrRef}
              id="pnr"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.toUpperCase())}
              placeholder={t("pnr.placeholder", "กรอกรหัสการจอง (PNR)")}
              className="h-12! rounded-md text-lg!"
              autoComplete="off"
              inputMode="text"
              aria-invalid={touched.pnr && !pnrValid}
              aria-describedby="pnr-help pnr-error"
            />
            {touched.pnr && !pnrValid && (
              <div id="pnr-error" className="text-sm text-red-600">
                {t("pnr.error", "รูปแบบ PNR ไม่ถูกต้อง")}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="lname" className="sr-only">
              {t("last.label", "นามสกุล")}
            </Label>
            <Input
              id="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t("last.placeholder", "กรอกนามสกุล (ไทย/อังกฤษ)")}
              className="h-12! rounded-md text-lg!"
              autoComplete="family-name"
              aria-invalid={touched.last && !lastValid}
              aria-describedby="last-error"
            />
            {touched.last && !lastValid && (
              <div id="last-error" className="text-sm text-red-600">
                {t("last.error", "กรุณากรอกนามสกุล")}
              </div>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full"
              onMouseDown={() => setTouched({ pnr: true, last: true })}
            >
              {t("submit", "ยืนยัน")}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
