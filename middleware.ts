import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}

function getAllowedAdminCredentials() {
  const list = (process.env.ADMIN_USERS ?? "").trim();
  if (list) {
    return list
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((pair) => {
        const idx = pair.indexOf(":");
        if (idx === -1) return null;
        const email = pair.slice(0, idx).trim();
        const password = pair.slice(idx + 1).trim();
        if (!email || !password) return null;
        return { email, password };
      })
      .filter((x): x is { email: string; password: string } => x !== null);
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword)
    return [{ email: adminEmail, password: adminPassword }];

  return [];
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isAdminRoute) return NextResponse.next();

  const allowed = getAllowedAdminCredentials();
  if (allowed.length === 0) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return unauthorized();
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return unauthorized();

  const base64Credentials = authHeader.slice("Basic ".length);
  let decoded = "";
  try {
    decoded = atob(base64Credentials);
  } catch {
    return unauthorized();
  }

  const [email, password] = decoded.split(":");
  const isAllowed = allowed.some(
    (u) => u.email === email && u.password === password,
  );
  if (!isAllowed) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
