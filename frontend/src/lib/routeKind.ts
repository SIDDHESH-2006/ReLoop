/**
 * Classifies a pathname as part of the PUBLIC RELOOP site or the
 * AUTHENTICATED STUDENT PORTAL. Chrome (navbar / footer) is chosen from this.
 *
 * Public: landing, about, role selection, partner onboarding, coming soon,
 * and the student login/auth screens themselves.
 * Portal: everything a logged-in student uses (marketplace, analyze, etc).
 */
const PUBLIC_PREFIXES = [
  "/about",
  "/get-started",
  "/food-institutions",
  "/recyclers-upcyclers",
  "/ngos-donations",
  "/student-login",
  "/auth",
];

export function isPublicPath(pathname: string): boolean {
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

/** Routes that require an authenticated student session. */
const PROTECTED_PREFIXES = ["/marketplace", "/sell", "/list", "/analyze", "/dashboard", "/impact", "/passport", "/map", "/student"];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
