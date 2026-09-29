import { defineMcp } from "@lovable.dev/mcp-js";
import getPricing from "./tools/get-pricing";
import listServices from "./tools/list-services";
import listServiceAreas from "./tools/list-service-areas";

export default defineMcp({
  name: "ezhaulawayllc",
  title: "ezhaulawayllc",
  version: "0.1.0",
  instructions:
    "Public info for EZ Haulaway, a junk removal company in Parker, CO. Use get_pricing for current prices, list_services for what they haul, and list_service_areas for cities served and the phone number.",
  tools: [getPricing, listServices, listServiceAreas],
});
