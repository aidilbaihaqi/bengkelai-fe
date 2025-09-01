import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { applySecurityHeaders, rateLimiter, getClientIP } from "./utils/security";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  // Apply rate limiting
  const clientIP = getClientIP(request);
  if (!rateLimiter.isAllowed(clientIP)) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "900", // 15 minutes
        "Content-Type": "text/plain",
      },
    });
  }
  
  // Apply all security headers
  applySecurityHeaders(responseHeaders);
  
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}