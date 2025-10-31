"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Refresh } from "iconoir-react";
import Footer from "@/components/common/Footer";

export default function Actions() {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (!accepted || loading) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      localStorage.setItem("consentAccepted", "true");
      toast.success("ยืนยันแล้ว");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <section className="mt-14 mb-6">
          <div className="flex gap-3 items-center">
            <Checkbox
              id="consent"
              className="cursor-pointer h-6 w-6"
              checked={accepted}
              onCheckedChange={(v) => setAccepted(Boolean(v))}
            />
            <label
              htmlFor="consent"
              className="text-[18px] lg:text-[20px] leading-5 lg:leading-8 font-medium pt-1"
            >
              ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขในการเก็บรวบรวมใช้และเปิดเผยข้อมูลส่วนบุคคล
              และยินยอมตามที่ระบุไว้ข้างต้น
            </label>
          </div>

          <div className="mt-5 lg:mt-7 flex justify-center">
            <Button
              onClick={submit}
              disabled={!accepted}
              className="min-w-[360px]"
            >
              ยินยอม
            </Button>
          </div>
        </section>
      </div>
      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-50 
                   px-2 backdrop-blur supports-backdrop-filter:bg-white/80"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <section className="mt-4 mb-6">
          <div className="flex gap-3 items-center">
            <Checkbox
              id="consent"
              className="cursor-pointer h-6 w-6 rounded-md"
              checked={accepted}
              onCheckedChange={(v) => setAccepted(Boolean(v))}
            />
            <label
              htmlFor="consent"
              className="text-[18px] lg:text-[20px] leading-5 lg:leading-8 font-medium pt-1"
            >
              ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขในการเก็บรวบรวมใช้และเปิดเผยข้อมูลส่วนบุคคล
              และยินยอมตามที่ระบุไว้ข้างต้น
            </label>
          </div>

          <div className="mt-5 lg:mt-7 flex justify-center">
            <Button
              onClick={submit}
              disabled={!accepted}
              className="min-w-full"
            >
              ยินยอม
            </Button>
          </div>
        </section>
        <Footer></Footer>
      </div>
    </>
  );
}
