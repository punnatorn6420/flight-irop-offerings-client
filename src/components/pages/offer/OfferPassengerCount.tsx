"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Group } from "iconoir-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useT, useLocale } from "@/lib/i18n";

type Props = {
  names: string[];
  value?: string;
  title?: string;
  className?: string;
  defaultOpen?: boolean;
};

export default function OfferPassengerCount({
  names,
  value,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  className,
  defaultOpen = true,
}: Props) {
  const t = useT("offer.passengerCount");
  const locale = useLocale();
  const nf = new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US");

  const count = useMemo(() => {
    if (Array.isArray(names) && names.length > 0) return names.length;
    const n = Number(value ?? 0);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [names, value]);

  const headerText = t(
    "header",
    locale === "th" ? "จำนวน {count} ท่าน" : "Passengers selected: {count}",
  ).replace("{count}", nf.format(count));

  return (
    <>
      <h3 className="mb-2 text-[24px] font-bold">
        {t("title", "ไม่พบรายชื่อผู้โดยสารที่เลือก")}
      </h3>
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
                "px-4 lg:px-5 py-2 rounded-lg",
                "hover:no-underline [&>svg]:ml-auto cursor-pointer",
              )}
            >
              <div className="flex w-full items-center gap-3 text-left ">
                <Group
                  width={24}
                  height={24}
                  strokeWidth={2}
                  className="shrink-0"
                />
                <div className="flex-1 font-bold text-[20px] lg:text-[22px]">
                  {headerText}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-4 lg:px-5 pb-4">
              {count > 0 ? (
                <ul className="space-y-1 pl-9">
                  {names.map((n, idx) => (
                    <li
                      key={`${n}-${idx}`}
                      className="text-[18px] lg:text-[20px] font-medium text-yellow-700"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-2 text-[16px] text-grey-600">
                  {t("empty", "ไม่พบรายชื่อผู้โดยสารที่เลือก")}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
