import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const CONTACT_ITEMS = [
  {
    text: "123 Education Road, New Delhi",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    text: "+91 98765 43210",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M6.6 10.8c1.2 2.5 3.1 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1 .4 2.2.6 3.4.6.6 0 1 .4 1 1V19.5c0 .6-.4 1-1 1C10.6 20.5 3.5 13.4 3.5 4.9c0-.6.4-1 1-1H8c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.4.1.4 0 .8-.3 1L6.6 10.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "info@nexahubschool.edu",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-indigo-deep text-white/70">
      <div className="h-1 bg-gradient-to-r from-marigold via-coral to-indigo" />

      <div className="container-page grid gap-14 md:gap-10 pt-24 pb-20 md:pt-28 md:pb-24 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="flex items-center gap-3 font-display font-semibold text-lg text-white mb-5"
          >
            <Image
              src="https://res.cloudinary.com/n6ej76pq/image/upload/v1789192309/Screenshot_2026-09-12_at_11.21.44_AM.png"
              alt="Nexa Hub School logo"
              width={44}
              height={44}
              className="rounded-xl object-contain shrink-0"
            />
            Nexa Hub School
          </Link>
          <p className="text-sm max-w-xs leading-relaxed">
            Nurturing excellence, building character, and inspiring lifelong
            learners since 2000.
          </p>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-6 text-[0.95rem] tracking-wide uppercase">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-marigold-light"
                >
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-6 text-[0.95rem] tracking-wide uppercase">
            Contact
          </h4>
          <ul className="space-y-5 text-sm">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.text} className="flex items-start gap-3.5">
                <span className="mt-0.5 text-marigold-light shrink-0">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-7">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 Nexa Hub School. All rights reserved.</p>
          <p>Made with care for our students and families.</p>
        </div>
      </div>
    </footer>
  );
}
