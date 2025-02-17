import { apiRoutes, routes } from '@/routes';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { cookieName, redirectLogin } from './helpers/api';
import { jwtVerify } from 'jose';

const publicRoutes: ReadonlyArray<string> = [
  routes.login,
  routes.underConstruction,
  routes.vendor.support,
  routes.vendor.login,
  routes.vendor.newRegister.default,
  routes.vendor.newRegister.welcome,
];

const publicApiRoutes: ReadonlyArray<string> = [
  apiRoutes.vendorRegistration,
  apiRoutes.login,
  apiRoutes.isLoggedIn,
  apiRoutes.categories,
];

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const staticFileRegex = /\.(js|css|png|jpg|jpeg|svg|ico|json)$/;
  if (staticFileRegex.test(pathname)) return NextResponse.next();
  if (publicRoutes.includes(pathname)) return NextResponse.next();
  if (publicApiRoutes.includes(pathname)) return NextResponse.next();

  const token = await cookies().then(res => res.get(cookieName));
  if (!token) return NextResponse.redirect(new URL(routes.login, request.url));
  if (token && token?.value === undefined) return redirectLogin(request, token);

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token?.value, secret);

    if (payload.exp && Date.now() >= payload.exp * 1000)
      return redirectLogin(request, token);

    const isLoggedIn = payload !== undefined;
    if (!isLoggedIn) return redirectLogin(request, token);

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return redirectLogin(request, token);
  }
};

const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|manifest.json|icons).*)',
  ],
};

export { config, middleware };
