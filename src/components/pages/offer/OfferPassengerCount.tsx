"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Group } from "iconoir-react";

type Props = {
  max: number;
  value: string;
  onValueChange: (v: string) => void;
  title?: string;
  className?: string;
};

export default function OfferPassengerCount({
  max,
  value,
  onValueChange,
  title = "ผู้โดยสารที่ต้องการใช้สิทธิ์นี้",
  className,
}: Props) {
  const options = Array.from({ length: Math.max(0, max) }, (_, i) => i + 1);

  return (
    <div className={cn(className)}>
      <h3 className="mb-2 text-[24px] font-bold">{title}</h3>
      <div className="flex items-center gap-2 w-full">
        <div className="relative w-full">
          <Group
            width={20}
            height={20}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          />
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-full h-12! rounded-md pl-12 text-[20px] font-medium border-grey-500 bg-white">
              <SelectValue placeholder={`จำนวน ${max} ท่าน`} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {options.map((n) => (
                <SelectItem key={n} value={String(n)} className="text-[18px]">
                  จำนวน {n} ท่าน
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
