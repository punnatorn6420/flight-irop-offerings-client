"use client";

import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { OfferMock } from "@/types/offer";

type OnChangePayload = { ids: string[]; names: string[]; count: number };

export default function PassengerSelectCard({
  passengers,
  onChange,
}: {
  passengers: OfferMock["passengers"];
  onChange?: (p: OnChangePayload) => void;
}) {
  const [list, setList] = useState(
    passengers.map((p) => ({
      id: p.id,
      name: `${p.title} ${p.firstName} ${p.lastName}`.trim(),
      checked: !!p.selected,
    }))
  );

  const allChecked = useMemo(() => list.every((x) => x.checked), [list]);
  const someChecked = useMemo(
    () => list.some((x) => x.checked) && !allChecked,
    [list, allChecked]
  );

  // 🔴 สำคัญ: emit หลัง render เท่านั้น
  useEffect(() => {
    const sel = list.filter((x) => x.checked);
    const payload: OnChangePayload = {
      ids: sel.map((x) => x.id),
      names: sel.map((x) => x.name),
      count: sel.length,
    };
    onChange?.(payload);
    sessionStorage.setItem(
      "offer:selectedPassengerIds",
      JSON.stringify(payload.ids)
    );
    sessionStorage.setItem(
      "offer:selectedPassengerNames",
      JSON.stringify(payload.names)
    );
    sessionStorage.setItem(
      "offer:selectedPassengerCount",
      String(payload.count)
    );
  }, [list, onChange]);

  const toggleOne = (id: string, next?: boolean) =>
    setList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: next ?? !p.checked } : p))
    );

  const toggleAll = (next: boolean) =>
    setList((prev) => prev.map((p) => ({ ...p, checked: next })));

  return (
    <article className="bg-gray-100 p-4 md:p-5 rounded-2xl">
      <h3 className="font-bold text-[24px]">เลือกผู้โดยสาร</h3>
      <p className="mb-3 text-[16px] text-grey-700">
        ผู้โดยสารแต่ละคนสามารถเลือกสิทธิ์ที่แตกต่างกันได้
        และสามารถทำรายการได้ทีละคน หรือพร้อมกันทั้งหมดเพื่อรับสิทธิ์เดียวกัน
      </p>
      <div className="overflow-y-auto pr-2 -mr-2 max-h-[29vh]">
        <ul className="space-y-3">
          {list.map((p) => {
            const inputId = `p-${p.id}`;
            return (
              <li key={p.id} className="flex items-center gap-3">
                <Checkbox
                  id={inputId}
                  checked={p.checked}
                  onCheckedChange={(v) => toggleOne(p.id, Boolean(v))}
                  className="
                  h-6 w-6 rounded-md ring-grey-300
                  data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
                  data-[state=checked]:ring-primary cursor-pointer
                "
                />
                <label htmlFor={inputId} className="text-[18px] font-medium">
                  {p.name}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Checkbox
          id="all"
          checked={allChecked}
          aria-checked={allChecked ? "true" : someChecked ? "mixed" : "false"}
          onCheckedChange={() => toggleAll(!allChecked)}
          className="
            h-6 w-6 rounded-md ring-grey-300
            data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
            data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground
            data-[state=checked]:ring-primary data-[state=indeterminate]:ring-primary cursor-pointer
          "
        />
        <label htmlFor="all" className="text-[18px] font-medium">
          เลือกทั้งหมด เพื่อรับสิทธิ์เดียวกัน
        </label>
      </div>
    </article>
  );
}
