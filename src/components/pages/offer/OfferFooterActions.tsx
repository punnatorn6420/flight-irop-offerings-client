"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import { WarningCircleSolid } from "iconoir-react";
import { redirect } from "next/navigation";

export type OfferFooterActionsProps = {
  backLabel?: string;
  confirmLabel?: string;
  onBack?: () => void;
  /** ฟังก์ชันที่จะรันจริง ๆ เมื่อยืนยัน */
  onConfirm?: () => void | Promise<void>;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  className?: string;
  confirmMode?: "direct" | "dialog";
  confirmDialog?: {
    title?: string;
    descriptionTop?: string | JSX.Element;
    email?: string;
    note?: string | JSX.Element;
    confirmText?: string;
    cancelText?: string;
    icon?: JSX.Element;
  };
};

export default function OfferFooterActions({
  backLabel = "ย้อนกลับ",
  confirmLabel = "ยืนยัน",
  onBack,
  onConfirm,
  confirmDisabled,
  confirmLoading,
  className,
  confirmMode = "direct",
  confirmDialog,
}: OfferFooterActionsProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = confirmLoading ?? internalLoading;

  const [openDialog, setOpenDialog] = useState(false);

  const runConfirm = async () => {
    if (!onConfirm) return;
    try {
      redirect("/offer/success");
      // const ret = onConfirm();
      // if (ret instanceof Promise) {
      //   setInternalLoading(true);
      //   await ret;
      // }
    } finally {
      setInternalLoading(false);
    }
  };

  const handleConfirmClick = () => {
    if (confirmMode === "dialog") {
      setOpenDialog(true);
    } else {
      void runConfirm();
    }
  };

  const {
    title = "ยืนยันการใช้สิทธิ์",
    descriptionTop = <>หากกดยืนยันรับสิทธิ์จะไม่สามารถแก้ไข หรือยกเลิกได้</>,
    email,
    note,
    confirmText = "ยืนยันรับสิทธิ์",
    cancelText = "ยกเลิก",
    icon,
  } = confirmDialog || {};

  return (
    <>
      <div
        className={clsx(
          "mt-20 grid gap-3 grid-cols-[1fr_1fr] bottom-0 left-0 right-0 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 md:p-0 md:bg-transparent md:backdrop-blur-0 md:supports-backdrop-filter:bg-transparent",
          className
        )}
      >
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-md text-[20px] border-yellow-500 text-yellow-800 cursor-pointer hover:bg-yellow-50 hover:text-yellow-800"
          onClick={onBack}
        >
          {backLabel}
        </Button>

        <Button
          type="button"
          className="h-12 rounded-md text-[20px] bg-primary  hover:bg-yellow-600 text-yellow-900 disabled:opacity-50 cursor-pointer"
          disabled={confirmDisabled || loading}
          onClick={handleConfirmClick}
        >
          {loading ? "กำลังดำเนินการ..." : confirmLabel}
        </Button>
      </div>
      {confirmMode === "dialog" && (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent className="max-w-[640px] rounded-3xl">
            <AlertDialogHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center text-yellow-500">
                {icon ?? <WarningCircleSolid width={64} height={64} />}
              </div>
              <AlertDialogTitle className="text-center text-[36px] font-extrabold">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-center text-[20px] leading-5 text-gray-800">
                  <p>{descriptionTop}</p>
                  {email && (
                    <p>
                      และจะได้รับเอกสารยืนยันการใช้สิทธิ์ที่อีเมล{" "}
                      <a
                        href={`mailto:${email}`}
                        className="font-bold text-black underline decoration-black underline-offset-2"
                      >
                        {email}
                      </a>
                    </p>
                  )}
                  {note ? <div>{note}</div> : null}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="mt-2 grid gap-3 grid-cols-2">
              <AlertDialogAction
                onClick={async () => {
                  await runConfirm();
                  setOpenDialog(false);
                }}
                className="h-12 rounded-md bg-yellow-500 text-[20px] hover:bg-yellow-600 text-yellow-800 cursor-pointer"
                disabled={loading}
              >
                {confirmText}
              </AlertDialogAction>
              <AlertDialogCancel className="h-12 rounded-md border-yellow-400 text-[20px] hover:bg-yellow-50 hover:text-yellow-800 text-yellow-800 cursor-pointer">
                {cancelText}
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
