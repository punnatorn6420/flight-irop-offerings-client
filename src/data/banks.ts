// src/data/banks.ts
export type BankCode = "BBL" | "KTB" | "KBANK" | "BAY" | "SCB" | "GSB";

export type BankMeta = {
  code: BankCode;
  th: string; // ชื่อไทยสำหรับแสดงผล
  icon: string; // path icon (public/)
};

export const BANKS_META: BankMeta[] = [
  { code: "KBANK", th: "ธนาคารกสิกรไทย", icon: "/images/KBANK.svg" },
  { code: "BBL", th: "ธนาคารกรุงเทพ", icon: "/images/BBL.svg" },
  { code: "KTB", th: "ธนาคารกรุงไทย", icon: "/images/KTB.svg" },
  { code: "BAY", th: "ธนาคารกรุงศรี", icon: "/images/BAY.svg" },
  { code: "GSB", th: "ธนาคารออมสิน", icon: "/images/GSB.svg" },
];

export function findBank(code?: BankCode) {
  if (!code) return undefined;
  return BANKS_META.find((b) => b.code === code);
}
