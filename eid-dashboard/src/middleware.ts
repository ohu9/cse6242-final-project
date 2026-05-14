import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_PATH = "/";

const isLogin = (pathname: string) => pathname === LOGIN_PATH || pathname.startsWith(LOGIN_PATH + "/");

const AUTH_COOKIE = "user";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasAuth = Boolean(req.cookies.get(AUTH_COOKIE)?.value);

  if(hasAuth && isLogin(pathname)) {
    const dashboardURL = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardURL);
  }
  
  if (isLogin(pathname)) return NextResponse.next();

  if (!hasAuth) {
    const homeURL = new URL("/", req.url);
    return NextResponse.redirect(homeURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // run on all routes except Next static/image assets and files with an extension
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|map|txt)).*)",
  ],
};
