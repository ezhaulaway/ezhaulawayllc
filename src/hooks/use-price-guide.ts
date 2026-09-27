import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FALLBACK_GUIDE, getPriceGuide, type PriceGuide } from "@/lib/pricing.functions";

let shared: PriceGuide = FALLBACK_GUIDE;

/** Live price guide from the crew app; refreshes every 5 minutes, falls back to built-in prices. */
export function usePriceGuide(): PriceGuide {
  const fetchGuide = useServerFn(getPriceGuide);
  const [guide, setGuide] = useState<PriceGuide>(shared);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetchGuide()
        .then((g) => { shared = g; if (alive) setGuide(g); })
        .catch(() => {});
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => { alive = false; clearInterval(id); };
  }, [fetchGuide]);
  return guide;
}
