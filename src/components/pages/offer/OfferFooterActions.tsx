"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export type OfferFooterActionsProps = {
  backLabel?: string;
  confirmLabel?: string;
  onBack?: () => void;
  onConfirm?: () => void | Promise<void>;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  className?: string; 
};

export default function OfferFooterActions({
  backLabel = "ย้อนกลับ",
  confirmLabel = "ยืนยัน",
  onBack,
  onConfirm,
  confirmDisabled,
  confirmLoading,
  className,
}: OfferFooterActionsProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = confirmLoading ?? internalLoading;

  const handleConfirm = async () => {
    if (!onConfirm) return;
    try {
      const ret = onConfirm();
      if (ret instanceof Promise) {
        setInternalLoading(true);
        await ret;
      }
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "mt-20 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr] bottom-0 left-0 right-0 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 p-4 md:p-0 md:bg-transparent md:backdrop-blur-0 md:supports-backdrop-filter:bg-transparent",
        className
      )}
    >
      <Button
        type="button"
        variant="outline"
        className="h-12 rounded-lg text-[18px] border-yellow-500 text-yellow-700 cursor-pointer"
        onClick={onBack}
      >
        {backLabel}
      </Button>

      <Button
        type="button"
        className="h-12 rounded-lg text-[18px] bg-primary text-primary-foreground hover:bg-yellow-600 disabled:opacity-50 cursor-pointer"
        disabled={confirmDisabled || loading}
        onClick={handleConfirm}
      >
        {loading ? "กำลังดำเนินการ..." : confirmLabel}
      </Button>
    </div>
  );
}
