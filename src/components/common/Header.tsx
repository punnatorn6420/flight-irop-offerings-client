"use client";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <header
      className="rounded-b-3xl overflow-hidden shadow-xl"
      style={{ background: "var(--color-yellow-500)" }}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo_name.png"
            alt="NOK AIR"
            width={128}
            height={128}
          />
        </div>
        <div className="flex items-center justify-end">
          <LanguageSwitcher
            value={"th"}
            onChange={(lng) => {
              document.cookie = `lang=${lng}; path=/; max-age=31536000`;
            }}
          />
        </div>
      </div>
    </header>
  );
}
