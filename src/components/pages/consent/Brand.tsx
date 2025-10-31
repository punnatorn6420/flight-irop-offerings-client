"use client";
import Image from "next/image";

export default function Brand() {
  return (
    <section className="flex items-center justify-center gap-3">
      <Image
        src="/images/logo_name.svg"
        alt="NOK AIR"
        width={200}
        height={100}
        priority
      />
    </section>
  );
}
