import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { I18nProvider } from "@/lib/i18n";
import { getServerLocale, DEFAULT_LOCALE } from "@/lib/locales";

async function loadMessages(locale: "th" | "en") {
  if (locale === "en") {
    return (await import("@/lib/i18n/en.json")).default;
  }
  return (await import("@/lib/i18n/th.json")).default;
}

export const dynamic = "force-dynamic";

export default async function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await getServerLocale()) ?? DEFAULT_LOCALE;
  const messages = await loadMessages(locale);

  return (
    <div className="min-h-svh flex flex-col bg-white">
      <I18nProvider locale={locale} messages={messages}>
        <Header />
        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:pt-12">
            {children}
          </div>
        </main>
        <Footer />
      </I18nProvider>
    </div>
  );
}
