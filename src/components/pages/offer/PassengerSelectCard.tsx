"use client";

import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { OfferMock } from "@/types/offer";
import { Minus } from "iconoir-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type OnChangePayload = { ids: string[]; names: string[]; count: number };

export default function PassengerSelectCard({
  passengers,
  usedIds = [],
  onChange,
}: {
  passengers: OfferMock["passengers"];
  usedIds?: string[];
  onChange?: (p: OnChangePayload) => void;
}) {
  const [list, setList] = useState(
    passengers.map((p) => ({
      id: p.id,
      name: `${p.title} ${p.firstName} ${p.lastName}`.trim(),
      checked: !!p.selected,
      disabled: usedIds.includes(p.id),
    }))
  );

  const selectable = useMemo(() => list.filter((x) => !x.disabled), [list]);
  const selectableCount = selectable.length;

  useEffect(() => {
    setList((prev) =>
      prev.map((x) => ({
        ...x,
        disabled: usedIds.includes(x.id),
        checked: usedIds.includes(x.id) ? false : x.checked,
      }))
    );
  }, [usedIds]);

  const allChecked = useMemo(
    () => selectableCount > 0 && selectable.every((x) => x.checked),
    [selectable, selectableCount]
  );
  const someChecked = useMemo(
    () => selectable.some((x) => x.checked) && !allChecked,
    [selectable, allChecked]
  );

  useEffect(() => {
    const sel = list.filter((x) => !x.disabled && x.checked);
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
      prev.map((p) =>
        p.id === id
          ? p.disabled
            ? p // ห้ามแตะ
            : { ...p, checked: next ?? !p.checked }
          : p
      )
    );

  const toggleAll = (next: boolean) =>
    setList((prev) =>
      prev.map((p) => (p.disabled ? p : { ...p, checked: next }))
    );

  return (
    <article className="bg-gray-100 p-4 lg:p-5 rounded-2xl">
      <h3 className="font-bold text-[24px]">เลือกผู้โดยสาร</h3>
      <p className="mb-3 text-[16px] text-grey-700">
        ผู้โดยสารแต่ละคนสามารถเลือกสิทธิ์ที่แตกต่างกันได้
        และสามารถทำรายการได้ทีละคน หรือพร้อมกันทั้งหมดเพื่อรับสิทธิ์เดียวกัน
      </p>
      {selectableCount > 1 && (
        <div className="mb-3 flex items-center gap-3">
          <Checkbox
            id="all"
            checked={allChecked ? true : someChecked ? "indeterminate" : false}
            onCheckedChange={(v) => {
              const next = v === true || (v === "indeterminate" && !allChecked);
              toggleAll(next);
            }}
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
      )}
      <ScrollArea type="auto" className="h-46">
        <ul className="space-y-3 pr-3">
          {list.map((p) => {
            const inputId = `p-${p.id}`;
            return (
              <li key={p.id} className="flex items-center gap-3">
                {p.disabled ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-grey-500">
                    <Minus width={24} height={24} className="text-white" />
                  </span>
                ) : (
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
                )}
                <label
                  htmlFor={inputId}
                  className={cn(
                    "text-[18px] font-medium",
                    p.disabled && "text-gray-400"
                  )}
                >
                  {p.name}
                </label>
              </li>
            );
          })}
        </ul>
        <ScrollBar orientation="vertical" forceMount />
      </ScrollArea>
    </article>
  );
}
