// app/middleware.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: Request) {
  const userCookies = cookies();
  const userRole = (await userCookies).get("userRole")?.value;

  if (userRole !== "Admin") {
    return NextResponse.redirect(new URL("/", request.url)); // Redirige vers la page d'accueil si non admin
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/*"], // Appliquer ce middleware uniquement aux pages sous /admin
};