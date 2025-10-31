"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NavArrowDown, NavArrowUp } from "iconoir-react";

type Locale = "th" | "en";

const LOCALES: { code: Locale; label: string; flagSrc: string }[] = [
  { code: "th", label: "ภาษาไทย", flagSrc: "/icons/th.svg" },
  { code: "en", label: "English", flagSrc: "/icons/gb.svg" },
];

export default function LanguageSwitcher({
  value = "th",
  onChange,
}: {
  value?: Locale;
  onChange?: (next: Locale) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [locale, setLocale] = React.useState<Locale>(value ?? "th");

  React.useEffect(() => {
    if (value) return;
    const m = document.cookie.match(/(?:^|;\s*)lang=(th|en)/);
    if (m) setLocale(m[1] as Locale);
  }, [value]);

  React.useEffect(() => {
    if (value && value !== locale) setLocale(value);
  }, [value]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const setLangCookie = (next: Locale) => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `lang=${next}; path=/; expires=${expires.toUTCString()}`;
  };

  const changeLocale = (next: Locale) => {
    setLangCookie(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", next);
    router.replace(`${pathname}?${params.toString()}`);
    setLocale(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Change language"
          className="
            h-10! px-4 lg:px-5 rounded-xl
            bg-white! hover:bg-yellow-50!
            text-black! font-bold
            shadow-md
            data-[state=open]:ring-2 data-[state=open]:ring-yellow-400 cursor-pointer
          "
        >
          <span className="relative mr-3 inline-flex h-7 w-7 overflow-hidden rounded-full bg-white/90 ring-1 ring-black/5">
            <Image src={current.flagSrc} alt="" fill className="object-cover" />
          </span>
          <span className="text-[20px]">{current.label}</span>
          {open ? (
            <NavArrowUp className="ml-2 h-5  font-bold!" />
          ) : (
            <NavArrowDown className="ml-2 h-5  font-bold!" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="
          w-40 rounded-2xl border-0 space-y-2
          shadow-xl
          bg-white
        "
      >
        {LOCALES.map((l) => {
          const active = l.code === current.code;
          return (
            <DropdownMenuItem
              key={l.code}
              onClick={() => changeLocale(l.code)}
              className={[
                "flex cursor-pointer items-center gap-3 rounded-xl",
                "text-[18px] font-extrabold text-grey-900",
                active ? "bg-yellow-100" : "hover:bg-grey-50",
              ].join(" ")}
            >
              <span className="relative inline-flex h-7 w-7 overflow-hidden rounded-full bg-white ring-1 ring-black/5">
                <Image src={l.flagSrc} alt="" fill className="object-cover" />
              </span>
              <span className="ml-2 text-[20px]">{l.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
