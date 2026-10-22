import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FaqProps = { faqs: ReadonlyArray<readonly [string, string]> };
export function FaqView({ faqs, open = null, onToggle }: FaqProps & { open?: number | null; onToggle?: (index: number) => void }) {
  return <div className="border-t border-border">
    {faqs.map(([question, answer], index) => <div key={question} className="border-b border-border">
      <h3 className="flex">
        <Button variant="ghost" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => onToggle?.(index)}
          className="h-auto w-full justify-between rounded-none px-0 py-5 text-left text-base font-bold whitespace-normal hover:bg-transparent hover:no-underline">
          {question}<ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open === index ? "rotate-180" : ""}`} />
        </Button>
      </h3>
      <div id={`faq-answer-${index}`} hidden={open !== index} className="faq-answer overflow-hidden text-sm">
        <div className="max-w-2xl pb-4 pr-8 pt-0 text-base leading-7 text-muted-foreground">{answer}</div>
      </div>
    </div>)}
  </div>;
}