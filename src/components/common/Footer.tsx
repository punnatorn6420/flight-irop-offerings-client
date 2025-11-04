"use client";

import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT();

  return (
    <footer className="text-center text-[18px] font-light text-grey-800">
      {t("footer", "© 2025 บริษัท สายการบินนกแอร์ จำกัด (มหาชน)")}
    </footer>
  );
}
