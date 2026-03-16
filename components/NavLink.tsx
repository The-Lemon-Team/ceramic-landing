import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const resolvedHref = href.startsWith("#") ? `/${href}` : href;
  return (
    <Link
      href={resolvedHref}
      className="text-sm uppercase tracking-widest font-medium text-stone-600 dark:text-stone-200 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}
