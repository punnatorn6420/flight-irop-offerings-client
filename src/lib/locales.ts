import { cookies, headers } from "next/headers";

export type Locale = "th" | "en";
export const SUPPORTED: Locale[] = ["th", "en"];
export const LOCALE_COOKIE = "APP_LOCALE";
export const DEFAULT_LOCALE: Locale = "th";

export function normalizeLocale(input?: string | null): Locale {
  const v = (input || "").toLowerCase();
  if (v.includes("th")) return "th";
  return "en";
}

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const c = cookieStore.get(LOCALE_COOKIE)?.value;
  if (c && SUPPORTED.includes(c as Locale)) return c as Locale;

  const hdrs = await headers();
  const accept = hdrs.get("accept-language");
  return normalizeLocale(accept);
}
