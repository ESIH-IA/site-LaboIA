import type { NextRequest } from "next/server";

import { locales, isLocale } from "./src/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

function isBypassPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/site.webmanifest" ||
    pathname === "/manifest.webmanifest" ||
    pathname.startsWith("/apple-touch-icon") ||
    pathname.includes("opengraph-image") ||
    pathname.includes("twitter-image") ||
    PUBLIC_FILE.test(pathname)
  );
}

function next() {
  return new Response(null, { headers: { "x-middleware-next": "1" } });
}

function redirect(url: URL, status = 307) {
  return Response.redirect(url.toString(), status);
}

function rewrite(url: URL, headers?: Headers) {
  const responseHeaders = headers ?? new Headers();
  responseHeaders.set("x-middleware-rewrite", url.toString());
  return new Response(null, { headers: responseHeaders });
}

function getCookieValue(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;

  const parts = cookieHeader.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (!part) continue;
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    const key = part.slice(0, eq);
    if (key !== name) continue;
    const value = part.slice(eq + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
  return undefined;
}

export function middleware(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const { pathname } = url;

    if (isBypassPath(pathname)) {
      return next();
    }

    const localeInPath = locales.find(
      (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );

    // No locale prefix -> redirect to cookie locale if present and valid
    if (!localeInPath) {
      const cookieLocale = getCookieValue(request, "lacdia_locale");
      if (isLocale(cookieLocale)) {
        url.pathname = `/${cookieLocale}${pathname}`;
        return redirect(url);
      }
      return next();
    }

    // Locale prefix present -> rewrite to non-prefixed route
    const newPathname = pathname.replace(`/${localeInPath}`, "") || "/";
    url.pathname = newPathname;

    const headers = new Headers();
    headers.append(
      "set-cookie",
      `lacdia_locale=${encodeURIComponent(localeInPath)}; Path=/; SameSite=Lax`
    );
    return rewrite(url, headers);
  } catch {
    // Never break the site because of middleware
    return next();
  }
}

export const config = {
  matcher: "/:path*",
};
