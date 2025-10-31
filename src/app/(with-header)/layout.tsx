import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8 lg:pt-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
