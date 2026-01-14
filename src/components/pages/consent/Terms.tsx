"use client";

import { useT } from "@/lib/i18n";

export default function Terms() {
  const t = useT("consent.terms");

  const title = t(
    "title",
    "ข้อกำหนดและเงื่อนไขการใช้บริการ ( Terms & Conditions )",
  );
  const sections = t<
    { heading: string; items?: string[]; paragraph?: string }[]
  >("sections", []);

  return (
    <section className="mt-6">
      <h2 className="text-[22px] lg:text-[24px] font-bold leading-6">
        {title}
      </h2>

      <ol className="mt-6 lg:mt-2 text-[18px] lg:text-[20px] leading-6 lg:leading-7 text-black space-y-5">
        {sections.map((sec, idx) => (
          <li key={idx}>
            <p className="font-bold">{`${idx + 1}. ${sec.heading}`}</p>

            {sec.paragraph && (
              <span className="lg:font-medium">{sec.paragraph}</span>
            )}

            {sec.items && sec.items.length > 0 && (
              <ul className="list-disc pl-8 lg:font-medium">
                {sec.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
