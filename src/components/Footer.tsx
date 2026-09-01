import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-indigo-deep text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 font-display font-semibold text-lg text-white mb-4">
            <span className="w-10 h-10 rounded-xl bg-marigold text-ink flex items-center justify-center text-base font-display font-bold">
              SP
            </span>
            Sunrise Public School
          </div>
          <p className="text-sm max-w-xs">
            Nurturing excellence, building character, and inspiring lifelong
            learners since 2000.
          </p>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-marigold-light">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/academics" className="hover:text-marigold-light">
                Academics
              </Link>
            </li>
            <li>
              <Link href="/admissions" className="hover:text-marigold-light">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-marigold-light">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-4">
            Contact
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>123 Education Road, New Delhi</li>
            <li>+91 98765 43210</li>
            <li>info@sunrisepublicschool.edu</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © 2026 Sunrise Public School. All rights reserved.
      </div>
    </footer>
  );
}
