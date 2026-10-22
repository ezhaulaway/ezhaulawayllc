import { useEffect, useRef, useState, type ReactNode } from "react";

/** Keep static content in SSR; request interactive code only near the viewport. */
export function DeferredSection({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={container}>{ready ? children : fallback}</div>;
}