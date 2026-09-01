"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-ink/[0.06]">
      <div className="container-page flex items-center justify-between py-3.5">
        <Link
          href="/"
          className="flex items-center gap-3 font-display font-semibold text-lg text-ink tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="w-10 h-10 rounded-xl bg-indigo text-white flex items-center justify-center text-base font-display font-bold shrink-0">
            SP
          </span>
          Sunrise Public School
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[0.93rem] font-medium transition-colors ${
                  active ? "text-indigo" : "text-ink/75 hover:text-indigo"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute left-4 right-4 -bottom-[1px] h-[2px] bg-marigold rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/admissions"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-marigold hover:bg-marigold-light transition-colors text-ink font-semibold text-sm px-5 py-2.5"
        >
          Apply Now
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-2xl text-indigo w-9 h-9 flex items-center justify-center"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/[0.06] bg-paper px-6 py-4 flex flex-col gap-1">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 text-[0.95rem] font-medium border-b border-ink/[0.05] last:border-0 ${
                  active ? "text-indigo" : "text-ink/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admissions"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex justify-center rounded-full bg-marigold text-ink font-semibold text-sm px-5 py-2.5"
          >
            Apply Now
          </Link>
        </nav>
      )}
    </header>
  );
}
