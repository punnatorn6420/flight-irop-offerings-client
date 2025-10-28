"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="rounded-b-3xl overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,.12)]"
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
      </div>
    </header>
  );
}
