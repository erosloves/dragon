import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  // Если нет токена и путь начинается с /adminma, но это не /adminma/login
  if (
    !token &&
    pathname.startsWith("/adminma") &&
    pathname !== "/adminma/login"
  ) {
    return NextResponse.redirect(new URL("/adminma/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminma/:path*"], // Убрали /login, так как он не должен попадать под middleware
};
