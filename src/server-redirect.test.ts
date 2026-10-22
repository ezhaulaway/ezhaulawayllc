import { canonicalRedirect } from "./server";
import { test, expect } from "vitest";
const loc=(u:string)=>canonicalRedirect(new Request(u))?.headers.get("location")??null;
test("r",()=>{
expect(loc("https://ezhaulawayllc.com/pricing/?a=1")).toBe("https://www.ezhaulawayllc.com/pricing?a=1");
expect(loc("http://ezhaulawayllc.com/pricing/")).toBe("https://www.ezhaulawayllc.com/pricing");
expect(loc("https://www.ezhaulawayllc.com/pricing")).toBe(null);
expect(loc("https://www.ezhaulawayllc.com/")).toBe(null);
expect(loc("http://localhost:8080/pricing/")).toBe(null);});
