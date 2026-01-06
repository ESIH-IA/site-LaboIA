import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

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

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    if (isBypassPath(pathname)) {
      return NextResponse.next();
    }

    const localeInPath = locales.find(
      (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );

    // No locale prefix -> redirect to cookie locale if present and valid
    if (!localeInPath) {
      const cookieLocale = request.cookies.get("lacdia_locale")?.value;
      if (isLocale(cookieLocale)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${cookieLocale}${pathname}`;
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // Locale prefix present -> rewrite to non-prefixed route
    const newPathname = pathname.replace(`/${localeInPath}`, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = newPathname;

    const response = NextResponse.rewrite(url);
    response.cookies.set("lacdia_locale", localeInPath, {
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch {
    // Never break the site because of middleware
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/:path*",
};
