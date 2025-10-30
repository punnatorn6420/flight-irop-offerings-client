"use client";
import Image from "next/image";

export default function Brand() {
  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 pt-8 md:pt-10">
      <div className="flex items-center justify-center gap-3">
        <Image
          src="/images/logo_name.svg"
          alt="NOK AIR"
          width={200}
          height={100}
          priority
        />
      </div>
    </div>
  );
}
