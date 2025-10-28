"use client";
import Image from "next/image";

export default function Brand() {
  return (
    <div className="flex items-center justify-center">
      <Image src="images/logo_name.png" alt="NOK AIR" width={140} height={60} priority />
    </div>
  );
}
