"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NavArrowDown, NavArrowUp } from "iconoir-react";
import { useLocale } from "@/lib/i18n";

type Locale = "th" | "en";
const COOKIE = "APP_LOCALE";

const LOCALES: { code: Locale; label: string; flagSrc: string }[] = [
  { code: "th", label: "ภาษาไทย", flagSrc: "/icons/th.svg" },
  { code: "en", label: "English", flagSrc: "/icons/gb.svg" },
];

export default function LanguageSwitcher({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value = "th",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange,
}: {
  value?: Locale;
  onChange?: (next: Locale) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const current = useLocale(); // "th" | "en"
  const currentDef = LOCALES.find((l) => l.code === current) ?? LOCALES[0];

  function setCookie(next: Locale) {
    // ใส่ Secure เมื่อรันบน https จริง
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  function changeLocale(next: Locale) {
    if (next === current) return;
    setCookie(next);
    router.refresh(); // ให้ server อ่านคุกกี้ใหม่ แล้ว re-render
    setOpen(false);
  }

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
            <Image
              src={currentDef.flagSrc}
              alt=""
              fill
              className="object-cover"
            />
          </span>
          <span className="text-[20px]">{currentDef.label}</span>
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
          const active = l.code === currentDef.code;
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
