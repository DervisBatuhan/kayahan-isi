import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;
const SESSION_COOKIE = "kh_session";

async function hasValidSession(token: string | undefined) {
  if (!token || !process.env.AUTH_SECRET) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Admin panel guard ---
  if (pathname.startsWith("/admin")) {
    const authed = await hasValidSession(
      request.cookies.get(SESSION_COOKIE)?.value,
    );
    const isLoginRoute = pathname === "/admin/login";

    if (!authed && !isLoginRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (authed && isLoginRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // --- Locale redirect for the public site ---
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let preferred = defaultLocale;
  if (cookieLocale && isLocale(cookieLocale)) {
    preferred = cookieLocale;
  } else {
    // First visit: honour a clear English preference from the browser.
    const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
    if (/(^|,|\s)en\b/.test(accept) && !/(^|,|\s)tr\b/.test(accept)) {
      preferred = "en";
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
