import { useState } from "react";
import { FaqView, type FaqProps } from "./faq-view";
export function InteractiveFaq(props: FaqProps) {
  const [open, setOpen] = useState<number | null>(null);
  return <FaqView {...props} open={open} onToggle={(index) => setOpen((value) => value === index ? null : index)} />;
}