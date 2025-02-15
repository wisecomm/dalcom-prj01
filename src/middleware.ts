import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("middleware pathname= " + pathname);

  const accessToken = request.cookies.get("accessToken")?.value;

  const publicPaths = ["/login", "/sign-up"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  console.log("accessToken = " + accessToken);
  console.log("isPublicPath = " + isPublicPath);
/*
  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL("/main", request.url));
  }
*/

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음 목록들로 시작되는 경로를 미들웨어 체크에서 제외하기:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - server/ (네트워크 요청 경로)
     */
    {
      source: "/((?!api|_next/static|image|_next/image|favicon.ico|server).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
