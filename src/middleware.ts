import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  AUTH_API_ROUTE,
  AUTH_ROUTE,
  PUBLIC_ROUTES,
  REDIRECT_ROUTE,
} from "./routes";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLogged = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.startsWith(AUTH_ROUTE);
  const isApiAuthRoute = nextUrl.pathname.startsWith(AUTH_API_ROUTE);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  if (isAuthRoute) {
    if (isLogged) {
      return NextResponse.redirect(new URL(REDIRECT_ROUTE, nextUrl));
    }
    return NextResponse.next();
  }
  if (!isPublicRoute && !isLogged) {
    return Response.redirect(new URL(AUTH_ROUTE, nextUrl));
  }
  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
