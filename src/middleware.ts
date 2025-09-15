import { NextResponse } from "next/server";
import { auth } from "../auth";
import {
  protectedRoutes,
  publicPaths,
} from "@/utils/constants/protected-routes";
import { RolesEmun } from "./lib/enums/roles";

export default auth(async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!request.auth;
  const authenticatedRole = request.auth?.user?.role as RolesEmun;

  // 1. Allow public routes
  if (publicPaths.includes(pathname)) {
    if (
      isAuthenticated &&
      ["/login", "/register", "/bootstrap"].includes(pathname)
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const matchedRoute = protectedRoutes.find(({ url }) => url === pathname);
  if (isAuthenticated) {
    if (matchedRoute) {
      if (
        matchedRoute.role.length === 0 ||
        matchedRoute.role.includes(authenticatedRole)
      ) {
        return NextResponse.next();
      } else {
        // Authenticated but unauthorized
        const errorMessage = encodeURIComponent(
          "You don't have permission to access this page"
        );
        return NextResponse.redirect(
          new URL(`/unauthorized?error=${errorMessage}`, request.url)
        );
      }
    } else {
      // If no specific match, allow access
      return NextResponse.next();
    }
  }
  // User is not authenticated
  const url = request.nextUrl.clone();
  url.pathname = "/bootstrap";
  url.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(url);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|videos|.*\\.).*)"],
};
