import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm uppercase tracking-widest font-medium text-stone-600 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}
