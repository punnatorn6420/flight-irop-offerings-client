"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Group, NavArrowDown } from "iconoir-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type Props = {
  names: string[];
  value?: string; // ใช้เป็น fallback ถ้า names ว่าง
  title?: string;
  className?: string;
  defaultOpen?: boolean; // true = เริ่มเปิด
};

export default function OfferPassengerCount({
  names,
  value,
  title = "ผู้โดยสารที่ต้องการใช้สิทธิ์นี้",
  className,
  defaultOpen = true,
}: Props) {
  const count = useMemo(() => {
    if (Array.isArray(names) && names.length > 0) return names.length;
    const n = Number(value ?? 0);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [names, value]);

  const headerText = `จำนวน ${count} ท่าน`;

  return (
    <>
      <h3 className="mb-2 text-[24px] font-bold">{title}</h3>
      <section
        className={cn("rounded-md border border-grey-200 bg-white", className)}
      >
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultOpen ? "item-1" : undefined}
          className="w-full"
        >
          <AccordionItem value="item-1" className="border-none ">
            <AccordionTrigger
              className={cn(
                "px-4 md:px-5 py-2 rounded-lg",
                "hover:no-underline [&>svg]:ml-auto cursor-pointer"
              )}
            >
              <div className="flex w-full items-center gap-3 text-left ">
                <Group
                  width={24}
                  height={24}
                  strokeWidth={2}
                  className="shrink-0"
                />
                <div className="flex-1 font-bold text-[20px] md:text-[22px]">
                  {headerText}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 md:px-5 pb-4">
              {count > 0 ? (
                <ul className="space-y-1 pl-9">
                  {names.map((n, idx) => (
                    <li
                      key={`${n}-${idx}`}
                      className="text-[18px] md:text-[20px] font-medium text-yellow-700"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-2 text-[16px] text-grey-600">
                  ไม่พบรายชื่อผู้โดยสารที่เลือก
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
