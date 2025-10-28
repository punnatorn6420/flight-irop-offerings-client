// src/data/offer_change_route.mock.ts

export type RouteKey = `${string}-${string}`; // e.g. "CNX-DMK"

export const CHANGE_ROUTE_AVAIL: Record<
  RouteKey,
  Record<string, Record<string, string[]>>
> = {
  // เชียงใหม่ -> ดอนเมือง
  "CNX-DMK": {
    "2025-10": {
      "02": [
        "08:15 - 09:30",
        "10:15 - 11:30",
        "12:50 - 14:05",
        "17:25 - 18:30",
      ],
      "04": ["10:15 - 11:30"],
      "05": ["12:50 - 14:05"],
      "06": ["08:15 - 09:30", "12:50 - 14:05"],
      "07": ["08:15 - 09:30", "10:15 - 11:30"],
    },
  },

  // กระบี่ -> ดอนเมือง
  "KBV-DMK": {
    "2025-10": {
      "02": ["07:40 - 09:05", "13:45 - 15:10"],
      "03": ["09:20 - 10:45", "17:10 - 18:35"],
      "06": ["11:30 - 12:55"],
    },
  },

  // หาดใหญ่ -> ดอนเมือง
  "HDY-DMK": {
    "2025-10": {
      "01": ["06:15 - 07:35", "19:10 - 20:30"],
      "05": ["08:30 - 09:50", "14:20 - 15:40", "20:10 - 21:30"],
    },
  },
};

// -------- helpers --------

export const routeKey = (origin?: string, dest?: string): RouteKey | null =>
  origin && dest ? `${origin}-${dest}` : null;

export function getMonthsForRoute(key: RouteKey | null): string[] {
  if (!key) return [];
  return Object.keys(CHANGE_ROUTE_AVAIL[key] ?? {}).sort();
}

export function getDaysForRoute(key: RouteKey | null, ym: string): string[] {
  if (!key) return [];
  return Object.keys(CHANGE_ROUTE_AVAIL[key]?.[ym] ?? {}).sort(); // ["02","04",...]
}

export function getSlotsForRoute(
  key: RouteKey | null,
  ym: string,
  dd: string
): string[] {
  if (!key) return [];
  return CHANGE_ROUTE_AVAIL[key]?.[ym]?.[dd] ?? [];
}
