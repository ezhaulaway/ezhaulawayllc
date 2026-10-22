import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getGoogleReviews } from "@/lib/google-reviews.functions";
import { ReviewsView } from "./reviews-view";
export function GoogleReviewsGrid() {
  const fetchReviews = useServerFn(getGoogleReviews);
  const { data } = useQuery({ queryKey: ["google-reviews"], queryFn: () => fetchReviews(), staleTime: 1000 * 60 * 60 });
  return <ReviewsView data={data} />;
}
