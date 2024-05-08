import {
  NextResponse,
  type NextRequest
} from "next/server";
import { getUserCredentials } from "./utils/auth/get-user-credentials";

// Define the routes that require authentication
const protectedRoutes =
  [
    "/products"
  ];

export async function middleware(
  request: NextRequest
) {
  const pathname =
    request
      .nextUrl
      .pathname;

  const credentials =
    getUserCredentials(
      request
    );

  if (
    (protectedRoutes.includes(
      pathname
    ) &&
      !credentials) ||
    credentials?.refreshToken
  ) {
    request.cookies.delete(
      "user"
    );

    const response =
      NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );

    response.cookies.delete(
      "user"
    );

    return response;
  }
  // If the route is not protected or the user has valid credentials, continue to the next middleware
  return NextResponse.next();
}
