'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type Benefit = {
  id: string;
  title: string;
  note?: string;
  highlight?: boolean;
};

const BENEFITS: Benefit[] = [
  { id: 'same-flight',   title: 'เปลี่ยนเที่ยวบินฟรี เส้นทางเดิม (ไม่เสียค่าใช้จ่าย 1 ครั้ง)', highlight: true },
  { id: 'near-province', title: 'เปลี่ยนเส้นทางไปจังหวัดใกล้เคียงฟรี (เดินทางภายในวันเดียวกัน)' },
  { id: 'keep-credit',   title: 'เก็บวงเงินไว้ใช้ภายใน 365 วัน (หากมีส่วนต่างค่าโดยสาร ต้องชำระเพิ่ม)' },
  { id: 'refund',        title: 'ขอคืนเงินเต็มจำนวน' },
  { id: 'no-benefit',    title: 'ไม่รับสิทธิ์' },
];

// ปรับ path ให้ตรงกับ app ของคุณ
const BENEFIT_ROUTES: Record<string, string> = {
  'same-flight': '/offer/change-flight',
  'near-province': '/offer/change-route',
  'keep-credit': '/offer/credit-hold',
  'refund': '/offer/refund',
  'no-benefit': '/offer/decline',
};

export default function BenefitList() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const go = useCallback(
    (id: string) => {
      setSelectedId(id);
      router.push(BENEFIT_ROUTES[id] ?? '/offer');
    },
    [router]
  );

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-[24px] font-bold">สิทธิประโยชน์ที่สายการบินรองรับ</h3>
        <p className="mt-1 text-[16px] leading-4 text-grey-600">
          สิทธิ์ของแต่ละรายการนี้ขึ้นอยู่กับเงื่อนไขประกาศฯ
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {BENEFITS.map((b) => {
          const isSelected = selectedId === b.id;
          const highlightCls = b.highlight
            ? 'border-[color:var(--color-yellow-400)]/60 bg-[color:var(--color-yellow-50)]'
            : 'border-grey-200 bg-white hover:bg-grey-50';

          return (
            <article
              key={b.id}
              role="button"
              tabIndex={0}
              onClick={() => go(b.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && go(b.id)}
              className={[
                'flex items-center justify-between gap-4 rounded-lg border p-4 md:p-5 shadow-sm outline-none transition',
                highlightCls,
                isSelected ? 'ring-2 ring-yellow-500' : 'ring-0',
              ].join(' ')}
            >
              <div>
                <h4 className="text-[18px] font-semibold text-grey-900">{b.title}</h4>
                {b.note && <p className="mt-1 text-[12px] text-grey-600">{b.note}</p>}
              </div>

              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(b.id);
                }}
                className="
                  rounded-lg text-[18px] font-bold px-4 h-10
                  bg-primary text-black hover:bg-yellow-600
                  focus-visible:ring-2 focus-visible:ring-primary
                  cursor-pointer
                "
              >
                เลือกสิทธิ์
              </Button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
