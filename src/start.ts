import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { canonicalRedirect } from "./lib/canonical-redirect";
import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

// Runs before CSRF and the route handlers. server.ts also calls this first,
// so a request that enters through the worker entry never reaches this layer.
const canonicalHostMiddleware = createMiddleware().server(async ({ next, request }) => {
  const redirect = canonicalRedirect(request);
  if (redirect) return redirect;
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next, request }) => {
  if (new URL(request.url).pathname.startsWith("/lovable/")) {
    return next();
  }
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [canonicalHostMiddleware, errorMiddleware, csrfMiddleware],
}));
