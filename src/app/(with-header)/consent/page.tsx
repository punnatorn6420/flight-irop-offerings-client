import Actions from "@/components/pages/consent/Actions";
import Brand from "@/components/pages/consent/Brand";
import Terms from "@/components/pages/consent/Terms";

export default function ConsentPage() {
  return (
    <div>
      <div className="pb-[calc(160px+env(safe-area-inset-bottom))]">
        <Brand />
        <Terms />
      </div>
      <Actions />
    </div>
  );
}
