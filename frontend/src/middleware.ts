import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, detectLocaleFromHeader, isValidLocale } from './lib/i18n';

const LOCALE_COOKIE = 'preferred-locale';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a valid locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameLocale) {
    // Already has a locale, just continue
    return NextResponse.next();
  }

  // Only redirect from root path `/`
  if (pathname === '/') {
    // Check cookie first
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (cookieLocale && isValidLocale(cookieLocale)) {
      return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url));
    }

    // Detect from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLocale = detectLocaleFromHeader(acceptLanguage);

    return NextResponse.redirect(new URL(`/${detectedLocale}`, request.url));
  }

  // For any other path without locale, redirect to default locale
  if (!pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.includes('.')) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
