import { faqItems } from "@/lib/content";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Întrebări frecvente despre salariul net și brut
        </h2>
      </div>
      <div className="grid gap-4">
        {faqItems.map((item) => (
          <details
            key={item.question}
            className="group rounded-[28px] border border-slate-200/70 bg-white/85 p-6 shadow-panel backdrop-blur"
          >
            <summary className="cursor-pointer list-none text-lg font-semibold text-ink">
              {item.question}
            </summary>
            <p className="mt-4 leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
