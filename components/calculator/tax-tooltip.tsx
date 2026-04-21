interface TaxTooltipProps {
  label: string;
  content: string;
}

export function TaxTooltip({ label, content }: TaxTooltipProps) {
  return (
    <span className="group relative inline-flex cursor-help items-center gap-2">
      <span>{label}</span>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
        i
      </span>
      <span className="pointer-events-none absolute left-0 top-full z-20 mt-3 hidden w-72 rounded-2xl bg-primary px-4 py-3 text-xs leading-6 text-primary-foreground shadow-panel group-hover:block group-focus-within:block">
        {content}
      </span>
    </span>
  );
}
