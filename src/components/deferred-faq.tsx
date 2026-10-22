import { lazy, Suspense } from "react";
import { DeferredSection } from "./deferred-section";
import { FaqView, type FaqProps } from "./faq-view";
const InteractiveFaq = lazy(() => import("./faq-interactive").then((module) => ({ default: module.InteractiveFaq })));
export function DeferredFaq(props: FaqProps) {
  const fallback = <FaqView {...props} />;
  return <DeferredSection fallback={fallback}><Suspense fallback={fallback}><InteractiveFaq {...props} /></Suspense></DeferredSection>;
}