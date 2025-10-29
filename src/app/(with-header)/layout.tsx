import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-dvh bg-white">{children}</main>
      <Footer />
    </>
  );
}
