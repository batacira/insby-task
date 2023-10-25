import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default function middleware(req: any) {
  const cookiesList = cookies();
  const initToken = cookiesList.get("InitToken")?.value;
  const loginToken = cookiesList.get("LoginToken")?.value;
  let absoluteURL;
  if (req.nextUrl.pathname === "/") {
    absoluteURL = new URL("/register", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (!loginToken && req.nextUrl.pathname === "/products") {
    absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (!initToken && req.nextUrl.pathname === "/login") {
    absoluteURL = new URL("/register", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
