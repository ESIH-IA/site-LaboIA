import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { locales } from "./src/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locale = locales.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );

  if (!locale) {
    const cookieLocale = request.cookies.get("lacdia_locale")?.value;
    if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
      const url = request.nextUrl.clone();
      url.pathname = `/${cookieLocale}${pathname}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const newPathname = pathname.replace(`/${locale}`, "") || "/";
  const url = request.nextUrl.clone();
  url.pathname = newPathname;

  const response = NextResponse.rewrite(url);
  response.cookies.set("lacdia_locale", locale, { path: "/", sameSite: "lax" });
  return response;
}

export const config = {
  matcher: "/:path*",
};
