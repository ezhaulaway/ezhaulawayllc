import type React from "react";
import { SectionHeader } from "@/components/site-chrome";

/** Renders **bold** markers in copy as <strong>. */
function bold(text: string, k: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={k + i} className="font-semibold text-foreground">{part}</strong> : part));
}

/** Renders **bold** and internal [label](/path) links inside content strings. */
export function rich(text: string) {
  const parts = text.split(/\[([^\[\]]+)\]\((\/[^)\s]*)\)/g);
  const out: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    out.push(...bold(parts[i], `t${i}-`));
    if (i + 2 < parts.length) {
      out.push(<a key={`l${i}`} href={parts[i + 2]} className="font-semibold text-primary hover:underline">{parts[i + 1]}</a>);
    }
  }
  return out;
}

export function ProseSection({ eyebrow, title, blocks, plainHeadings = false }: { eyebrow: string; title: string; blocks: Array<[string, string]>; plainHeadings?: boolean }) {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 space-y-8">
          {blocks.map(([heading, text]) => (
            <div key={heading}>
              {plainHeadings ? <p className="text-lg font-bold">{heading}</p> : <h3 className="text-lg font-bold">{heading}</h3>}
              <p className="mt-2 leading-8 text-muted-foreground">{rich(text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
