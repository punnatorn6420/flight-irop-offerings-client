"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Refresh } from "iconoir-react";

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
      toast.success("ยืนยันแล้ว"); // << ใช้ sonner
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="mt-10 mb-8">
        <div className="flex gap-3 items-center">
          <Checkbox
            id="consent"
            className="cursor-pointer"
            checked={accepted}
            onCheckedChange={(v) => setAccepted(Boolean(v))}
          />
          <label
            htmlFor="consent"
            className="text-[18px] md:text-[20px] leading-5 md:leading-8 font-medium pt-1"
          >
            ข้าพเจ้าได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขในการเก็บรวบรวมใช้และเปิดเผยข้อมูลส่วนบุคคล
            และยินยอมตามที่ระบุไว้ข้างต้น
          </label>
        </div>

        <div className="mt-5 md:mt-7 flex justify-center">
          <Button
            onClick={submit}
            disabled={!accepted || loading}
            className="min-w-[360px] h-14 text-[20px] bg-primary text-primary-foreground hover:bg-brand-600 cursor-pointer"
          >
            {loading && (
              // <Loader2
              //   className="mr-2 h-5 w-5 animate-spin "
              //   aria-hidden="true"
              // />
              <Refresh
                width={20}
                height={20}
                strokeWidth={2}
                className="mr-2 animate-spin"
                aria-hidden="true"
              />
            )}
            <span className="text-yellow-900 font-bold">ยินยอม</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
