import { useEffect, useSyncExternalStore } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getPriceGuide, type PriceGuide } from "@/lib/pricing.functions";
import { getGuide, setGuide, subscribeGuide } from "@/lib/price-store";

let timerStarted = false;

/** Live price guide from the crew app; refreshes every 5 minutes, falls back to built-in prices. */
export function usePriceGuide(): PriceGuide {
  const fetchGuide = useServerFn(getPriceGuide);
  useEffect(() => {
    if (timerStarted) return;
    timerStarted = true;
    const id = setInterval(() => fetchGuide().then(setGuide).catch(() => {}), 5 * 60 * 1000);
    return () => { clearInterval(id); timerStarted = false; };
  }, [fetchGuide]);
  return useSyncExternalStore(subscribeGuide, getGuide, getGuide);
}
