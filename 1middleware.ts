import { NextRequest, NextResponse } from "next/server";
// import { includes } from "lodash";

const isClientReq = (pathname: string) => {
  return pathname.startsWith("/api/client");
};
const isAdminReq = (pathname: string) => {
  return pathname.startsWith("/api/admin");
};

export default function middleware(req: NextRequest) {
  const authToken = req.headers.get("authorization");
  const { pathname } = req.nextUrl;

  if (isAdminReq(pathname) && authToken !== process.env.API_AUTH_TOKEN) {
    return () => {
      NextResponse.redirect(new URL(`${process.env.SITE_DOMAIN}/models`));
    };

    // return NextResponse.redirect(new URL(`${process.env.SITE_DOMAIN}/models`));
  }
  // if (isClientReq(pathname)) {
  //   return () => {
  //     return NextResponse.json({ ok: "ok" });
  //   };
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
