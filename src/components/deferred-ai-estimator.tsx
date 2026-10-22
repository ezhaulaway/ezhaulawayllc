import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AiEstimatorIntro } from "@/components/ai-estimator-intro";
import { EstimatePreview } from "./estimate-preview";

const AiEstimator = lazy(() => import("@/components/ai-estimator").then((module) => ({ default: module.AiEstimator })));

function EstimatePlaceholder() {
  return (
    <section className="py-16 sm:py-24" aria-busy="true">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <AiEstimatorIntro />
        <EstimatePreview />
      </div>
    </section>
  );
}

export function DeferredAiEstimator() {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container}>
      {ready ? <Suspense fallback={<EstimatePlaceholder />}><AiEstimator /></Suspense> : <EstimatePlaceholder />}
    </div>
  );
}