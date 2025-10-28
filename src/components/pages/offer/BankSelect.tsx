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
      <SelectTrigger
        className={cn(
          "[&_[data-slot=select-value]:not([data-placeholder])]:text-gray-400 cursor-pointer h-12! w-full rounded-md border border-gray-300 bg-white pl-12 text-[18px] ",
          "flex items-center gap-2 pl-12",
          "[&_[data-slot=select-value][data-placeholder]]:text-gray-400",
          className
        )}
      >
        <div className="w-full flex items-center gap-2 min-w-0">
          {selected && (
            <Image
              src={selected.icon}
              alt={selected.th}
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 object-contain rounded"
            />
          )}

          <SelectValue placeholder="เลือกธนาคาร" className="truncate min-w-0 ">
            <span className="font-medium! text-black">
              {selected ? selected.th : null}
            </span>{" "}
          </SelectValue>
        </div>
      </SelectTrigger>

      <SelectContent className="rounded-md font-medium">
        {BANKS_META.map((b) => (
          <SelectItem
            key={b.code}
            value={b.code}
            className="data-[state=checked]:bg-yellow-50 data-highlighted:bg-gray-50"
          >
            <span className="flex items-center gap-3 ">
              <Image
                src={b.icon}
                alt={b.th}
                width={24}
                height={24}
                className="rounded"
              />
              <span className="text-[18px] leading-8">{b.th}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
