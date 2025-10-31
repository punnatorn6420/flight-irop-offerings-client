"use client";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <header className="rounded-b-3xl overflow-hidden shadow-xl bg-linear-to-r from-yellow-500 to-yellow-600">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 lg:px-6 lg:py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo_name.svg"
            alt="NOK AIR"
            width={165}
            height={165}
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
