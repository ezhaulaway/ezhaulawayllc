import { SectionHeader } from "@/components/site-chrome";

export function ProseSection({ eyebrow, title, blocks }: { eyebrow: string; title: string; blocks: Array<[string, string]> }) {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 space-y-8">
          {blocks.map(([heading, text]) => (
            <div key={heading}>
              <h3 className="text-lg font-bold">{heading}</h3>
              <p className="mt-2 leading-8 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
