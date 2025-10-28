"use client";
import Image from "next/image";

export default function Hero({ size }: { size: "sm" | "lg" }) {
  const src = size === "lg" ? "/images/auth_banner.png" : "/images/auth_banner_m.png";

  if (size === "lg") {
    return (
      <div className="w-[380px] md:w-[380px] md:h-[640px]">
        <Image
          src={src}
          alt="Authentication Banner"
          width={760}
          height={1280}
          className="h-full w-full object-cover rounded-[28px]"
          priority
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[320px] mx-auto">
      <Image
        src={src}
        alt="Authentication Banner"
        width={640}
        height={400}
        className="w-full h-auto rounded-[14px]"
        priority
      />
    </div>
  );
}
