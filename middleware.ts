// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // console.log("request:", request);
  // const bearer_token = request.headers.get("authorization");
  // const user_token = bearer_token.split(" ")[1];
  // const token_validity = await verifyToken(user_token);
  // if (token_validity.email !== "waleed2@gmail.com") {
  //   return new NextResponse(
  //     JSON.stringify({ success: false, message: "authentication failed" })
  //   );
  // }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/users/delete/:path*",
};
