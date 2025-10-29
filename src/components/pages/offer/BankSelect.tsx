"use client";

import Image from "next/image";
import { BANKS_META, type BankCode, findBank } from "@/data/banks";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Bank as BankIcon } from "iconoir-react";

type Props = {
  value?: BankCode;
  onChange: (v: BankCode) => void;
  className?: string;
  showIcon?: boolean; // ถ้าใช้ Landmark ด้านนอก ให้ false
};

export default function BankSelect({
  value,
  onChange,
  className,
  showIcon = false,
}: Props) {
  const selected = findBank(value);

  return (
    <Select value={value} onValueChange={(v) => onChange(v as BankCode)}>
      {!selected && (
        <BankIcon
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-grey-500"
          width={20}
          height={20}
          strokeWidth={2}
        />
      )}
      <SelectTrigger
        className={cn(
          "cursor-pointer h-12! w-full rounded-md border border-gray-300 bg-white text-[18px] ",
          "flex items-center gap-3 ",
          "[&_[data-slot=select-value][data-placeholder]]:text-gray-400",
          className,
          selected ?? "pl-12"
        )}
      >
        <div className="w-full flex items-center gap-3 min-w-0">
          {selected && (
            <Image
              src={selected.icon}
              alt={selected.th}
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 object-contain rounded"
            />
          )}
          <SelectValue placeholder="เลือกธนาคาร" className="truncate min-w-0">
            <span>{selected ? selected.th : null}</span>{" "}
          </SelectValue>
        </div>
      </SelectTrigger>

      <SelectContent className="rounded-md font-medium">
        {BANKS_META.map((b) => (
          <SelectItem
            key={b.code}
            value={b.code}
            className="data-[state=checked]:bg-yellow-50 data-highlighted:bg-gray-50 cursor-pointer"
          >
            <span className="flex items-center gap-3 ">
              <Image
                src={b.icon}
                alt={b.th}
                width={24}
                height={24}
                className="rounded"
              />
              <span className="text-[18px] leading-8 ">{b.th}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
