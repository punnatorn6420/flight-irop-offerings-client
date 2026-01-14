import "server-only";
import { cookies, headers } from "next/headers";

export type Locale = "th" | "en";
export const SUPPORTED: Locale[] = ["th", "en"];
export const LOCALE_COOKIE = "APP_LOCALE";
export const DEFAULT_LOCALE: Locale = "th";

export function normalizeLocale(input?: string | null): Locale {
  const v = (input || "").toLowerCase();
  return v.includes("th") ? "th" : "en";
}

export async function getServerLocale(): Promise<Locale> {
  const c = (await cookies()).get(LOCALE_COOKIE)?.value as Locale | undefined;
  if (c && SUPPORTED.includes(c)) return c;
  const accept = (await headers()).get("accept-language");
  return normalizeLocale(accept);
}

export async function loadMessages(locale: Locale) {
  const mod = await import(`@/lib/i18n/${locale}.json`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return mod.default as Record<string, any>;
}
