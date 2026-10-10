import { SectionHeader } from "@/components/site-chrome";

/** Renders **bold** markers in copy as <strong>. */
function rich(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part));
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
