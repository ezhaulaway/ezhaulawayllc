import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { PHONE_TEL } from "@/content/site";

type PhoneLinkProps = ComponentPropsWithoutRef<"a"> & {
  /** Where this link sits, sent with the phone_call_click event. */
  location: string;
};

/** The one business phone link. The number and the location attribute stay in one place. */
export const PhoneLink = forwardRef<HTMLAnchorElement, PhoneLinkProps>(function PhoneLink(
  { location, ...props },
  ref,
) {
  return <a {...props} ref={ref} href={`tel:${PHONE_TEL}`} data-phone-location={location} />;
});
