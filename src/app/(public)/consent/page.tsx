import Actions from "@/components/pages/consent/Actions";
import Brand from "@/components/pages/consent/Brand";
import Terms from "@/components/pages/consent/Terms";

export default function ConsentPage() {
  return (
    <main className="min-h-screen">
      <Brand />
      <Terms />
      <Actions />
      <footer className="pt-12 text-center text-[18px] text-grey-800">
        © 2017 บริษัท สายการบินนกแอร์ จำกัด (มหาชน)
      </footer>
    </main>
  );
}
