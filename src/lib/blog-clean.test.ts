import { describe, expect, it } from "vitest";
import { cleanHtml } from "./blog-html";
import { SCHEDULED_POSTS, toRow } from "@/content/scheduled-posts";

describe("cleanHtml", () => {
  it("leaves ordinary article markup alone", () => {
    const html =
      '<h2 id="a">Couch removal</h2><p style="text-align:center">Call <a href="tel:+17206147223">us</a> or see <a href="/services/furniture-removal">furniture removal</a>.</p>' +
      '<img src="https://x.supabase.co/storage/v1/object/public/blog-images/a.jpg" alt="Couch on a dolly" width="800" height="600"><table><tr><td>1</td></tr></table><ul><li>One = 1</li></ul>' +
      '<span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff0000"><path d="M5 12h14"></path></svg></span>';
    expect(cleanHtml(html)).toBe(html);
  });

  it("does not change any of our own posts", () => {
    SCHEDULED_POSTS.forEach((post, index) => {
      const html = toRow(post, index).content_html ?? "";
      expect(cleanHtml(html), post.slug).toBe(html);
    });
  });

  it("removes scripts of every kind", () => {
    expect(cleanHtml("<p>hi</p><script>alert(1)</script>")).toBe("<p>hi</p>");
    expect(cleanHtml('<script type="application/ld+json">{}</script><p>x</p>')).toBe("<p>x</p>");
    expect(cleanHtml("<p>x</p><script src=//evil.example/a.js>")).not.toMatch(/<script/i);
    expect(cleanHtml("<ScRiPt >alert(1)</sCrIpT >")).toBe("");
  });

  it("removes event handlers however they are attached", () => {
    for (const html of [
      "<img src=x onerror=alert(1)>",
      '<img src="x"onerror="alert(1)">',
      "<img src=x/onerror=alert(1)>",
      '<img a"b alt="x>" onerror=alert(1)>',
      '<details open ontoggle="alert(1)">x</details>',
      "<body onload=alert(1)>",
    ]) {
      expect(cleanHtml(html)).not.toMatch(/on(error|toggle|load)\s*=/i);
    }
  });

  it("removes disguised script URLs but keeps real links", () => {
    for (const html of [
      '<a href="javascript:alert(1)">x</a>',
      '<a href=" &#106;avascript:alert(1)">x</a>',
      '<a href="jav&#x09;ascript:alert(1)">x</a>',
      "<a href='JaVaScRiPt&colon;alert(1)'>x</a>",
      '<a href="data:text/html;base64,PHNjcmlwdD4=">x</a>',
      '<img src="vbscript:msgbox(1)">',
    ]) {
      expect(cleanHtml(html)).not.toMatch(/href|src=/i);
    }
    expect(cleanHtml('<a href="https://www.ezhaulawayllc.com/pricing">x</a>')).toContain(
      'href="https://www.ezhaulawayllc.com/pricing"',
    );
  });

  it("removes forms, redirects, styles and the unsafe parts of inline drawings", () => {
    const out = cleanHtml(
      '<form action="https://evil.example"><input name=p><button>Go</button></form><meta http-equiv="refresh" content="0;url=https://evil.example">' +
        '<style>body{display:none}</style><link rel="stylesheet" href="https://evil.example/x.css"><base href="https://evil.example/">' +
        '<svg><a><animate attributeName="href" values="javascript:alert(1)"/></a></svg><p style="background:url(https://evil.example/t.gif)">ok</p>',
    );
    expect(out.replace(/\s+/g, "")).toBe("<svg><a></a></svg><p>ok</p>");
  });

  it("keeps sandboxed video embeds from allowed hosts only", () => {
    const ok = cleanHtml(
      '<iframe src="https://www.youtube.com/embed/abc" width="560" onload="x()"></iframe>',
    );
    expect(ok.replace(/\s+/g, " ")).toBe(
      '<iframe src="https://www.youtube.com/embed/abc" width="560" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>',
    );
    expect(cleanHtml('<iframe src="https://evil.example/"></iframe>')).toBe("");
    expect(cleanHtml('<iframe src="https://youtube.com.evil.example/"></iframe>')).toBe("");
    expect(
      cleanHtml(
        '<iframe srcdoc="<script>alert(1)</script>" src="https://www.youtube.com/embed/abc"></iframe>',
      ),
    ).not.toMatch(/srcdoc|<script|alert/);
    expect(cleanHtml('<p>a</p><iframe src="https://evil.example/">')).toBe("<p>a</p>");
  });

  it("does not let an unfinished tag or comment swallow the rest of the page", () => {
    expect(cleanHtml("<p>a</p><img src=x title=")).toBe("<p>a</p>&lt;img src=x title=");
    expect(cleanHtml("<p>a</p><!-- open")).toBe("<p>a</p> open");
  });

  it("is stable when run twice", () => {
    const html =
      '<p>x</p><iframe src="https://player.vimeo.com/video/1"></iframe><img src=x onerror=alert(1)>';
    expect(cleanHtml(cleanHtml(html))).toBe(cleanHtml(html));
  });
});
