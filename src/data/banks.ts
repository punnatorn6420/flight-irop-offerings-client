// src/data/banks.ts
export type BankCode = "BBL" | "KTB" | "KBANK" | "BAY" | "SCB" | "GSB";

export type BankMeta = {
  code: BankCode;
  th: string; // ชื่อไทยสำหรับแสดงผล
  icon: string; // path icon (public/)
};

export const BANKS_META: BankMeta[] = [
  { code: "KBANK", th: "ธนาคารกสิกรไทย", icon: "/images/KBANK.png" },
  { code: "BBL", th: "ธนาคารกรุงเทพ", icon: "/images/BBL.png" },
  { code: "KTB", th: "ธนาคารกรุงไทย", icon: "/images/KTB.png" },
  { code: "BAY", th: "ธนาคารกรุงศรี", icon: "/images/BAY.png" },
  { code: "GSB", th: "ธนาคารออมสิน", icon: "/images/GSB.png" },
];

export const findBank = (code?: BankCode) =>
  BANKS_META.find((b) => b.code === code);
