import { lazy, Suspense } from "react";
import { DeferredSection } from "./deferred-section";
import { ReviewsView } from "./reviews-view";
const GoogleReviewsGrid = lazy(() => import("./google-reviews").then((module) => ({ default: module.GoogleReviewsGrid })));
export function DeferredReviews() {
  const fallback = <ReviewsView />;
  return <DeferredSection fallback={fallback}><Suspense fallback={fallback}><GoogleReviewsGrid /></Suspense></DeferredSection>;
}
