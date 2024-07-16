import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEY_ACCESS_TOKEN } from "./constants";

export function middleware(request: NextRequest) {
  console.log("Middleware executed");
  const token = request.cookies.has(COOKIE_KEY_ACCESS_TOKEN);
  console.log({ token });

  if (!token) {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: ["/", "/home", "/vendas", "/login", "/clientes", "/produtos"],
};
