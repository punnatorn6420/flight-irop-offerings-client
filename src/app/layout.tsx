import { headers } from "next/headers";
import localFont from "next/font/local";
import "@/app/globals.css";
import { I18nProvider } from "@/lib/i18n";
import { getServerLocale, DEFAULT_LOCALE } from "@/lib/locales";
import { Toaster } from "sonner";

async function loadMessages(locale: "th" | "en") {
  if (locale === "en") {
    return (await import("../lib/i18n/en.json")).default;
  }
  return (await import("../lib/i18n/th.json")).default;
}

const dbOzoneX = localFont({
  src: [
    {
      path: "../../public/fonts/DB Ozone X.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/DB Ozone X Med.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/DB Ozone X Bd.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-db-ozone-x",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ua = (await headers()).get("user-agent") || "";
  const initialMode = /(?:Line\/|LIFF)/i.test(ua) ? "liff" : "web";
  const locale = (await getServerLocale()) ?? DEFAULT_LOCALE;
  const messages = await loadMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${dbOzoneX.variable} bg-white text-text-body antialiased`}
      >
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
