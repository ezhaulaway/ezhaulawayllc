import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { isLiveCityService } from "@/content/live-pages";

/** Links to the city-service page when it is live, otherwise to the global service page. */
export function CityServiceLink({
  city,
  service,
  className,
  children,
}: {
  city: string;
  service: string;
  className?: string;
  children: ReactNode;
}) {
  if (isLiveCityService(city, service)) {
    return (
      <Link to="/service-areas/$city/$service" params={{ city, service }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/services/$slug" params={{ slug: service }} className={className}>
      {children}
    </Link>
  );
}
