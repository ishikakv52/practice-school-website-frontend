import Link from "next/link";
import Reveal from "@/components/Reveal";
import Mark from "@/components/Mark";
import SectionTag from "@/components/SectionTag";
import SchoolIllustration from "@/components/SchoolIllustration";

const STATS = [
  { number: "1500+", label: "Students" },
  { number: "80+", label: "Expert Teachers" },
  { number: "25+", label: "Years of Excellence" },
  { number: "98%", label: "Board Result" },
];

const FEATURES = [
  {
    icon: "📚",
    title: "Academic Excellence",
    text: "CBSE-aligned curriculum with experienced faculty and consistently strong board results.",
    color: "bg-indigo",
  },
  {
    icon: "🎨",
    title: "Co-curricular Activities",
    text: "Art, music, dance and sports programs to nurture creativity and confidence.",
    color: "bg-marigold",
  },
  {
    icon: "🔬",
    title: "Modern Labs",
    text: "Fully-equipped science, computer, and robotics labs for hands-on learning.",
    color: "bg-teal",
  },
  {
    icon: "🏆",
    title: "Sports Facilities",
    text: "Dedicated grounds and coaches for cricket, football, athletics, and more.",
    color: "bg-coral",
  },
  {
    icon: "🚌",
    title: "Safe Transport",
    text: "GPS-tracked buses covering all major routes with trained attendants.",
    color: "bg-indigo-soft",
  },
  {
    icon: "🤝",
    title: "Value Education",
    text: "A curriculum that builds character, empathy, and responsible citizenship.",
    color: "bg-marigold",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The teachers genuinely care about every child's growth. My daughter has blossomed in confidence since joining.",
    name: "Ritu Sharma",
    role: "Parent, Class V",
    rotate: "-rotate-1",
  },
  {
    quote:
      "Excellent facilities and a great balance between academics and extracurriculars. Highly recommend.",
    name: "Amit Verma",
    role: "Parent, Class IX",
    rotate: "rotate-1",
  },
  {
    quote:
      "From admissions to daily communication, everything is smooth and transparent. A wonderful school community.",
    name: "Priya Nair",
    role: "Parent, Nursery",
    rotate: "-rotate-1",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-indigo-deep text-white">
        <div className="absolute inset-0 ruled-bg opacity-[0.1]" />
        <div className="container-page relative grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center pt-16 pb-16 md:pt-24 md:pb-20">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              ✨ Admissions open for 2026-27
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] tracking-tight mb-6">
              Empowering minds,
              <br />
              building{" "}
              <span className="text-marigold-light">
                <Mark>brighter futures</Mark>
              </span>
            </h1>
            <p className="text-white/80 text-lg max-w-md mb-9">
              Sunrise Public School offers a nurturing environment where
              every child discovers their potential — academically,
              creatively, and personally.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-marigold hover:bg-marigold-light transition-colors text-ink font-semibold px-7 py-3.5"
              >
                Apply for Admission →
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 hover:bg-white/10 transition-colors text-white font-semibold px-7 py-3.5"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div>
            <SchoolIllustration />
          </div>
        </div>
      </section>

      {/* Stats — report-card style row */}
      <section className="bg-white border-y border-ink/[0.06]">
        <Reveal>
          <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/[0.08] py-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-2">
                <div className="font-display font-bold text-3xl md:text-4xl text-indigo">
                  {s.number}
                </div>
                <div className="text-muted text-sm font-medium mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Why choose us */}
      <section className="py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>Why Sunrise</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Why choose us
            </h2>
            <p className="text-muted text-lg">
              A well-rounded education built on strong values and modern
              learning.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="h-full bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] overflow-hidden flex">
                  <div className={`w-1.5 ${f.color}`} />
                  <div className="p-7">
                    <div className="text-3xl mb-4">{f.icon}</div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {f.title}
                    </h3>
                    <p className="text-muted text-[0.95rem]">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionTag>Our Legacy</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-[2.1rem] tracking-tight mb-4">
              A legacy of excellence since 2000
            </h2>
            <p className="text-muted mb-6">
              Sunrise Public School has been shaping young minds for over two
              decades. Our mission is to provide a holistic education that
              balances academics, life-skills, and values.
            </p>
            <ul className="space-y-4">
              {[
                "Experienced and caring faculty",
                "Smart classrooms with digital learning",
                "Strong focus on individual growth",
                "Vibrant campus life and clubs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-md bg-marigold text-ink flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="aspect-4/3 rounded-2xl bg-gradient-to-br from-indigo/10 to-teal/10 flex items-center justify-center text-7xl shadow-[var(--shadow-sm)]">
              🏫
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials — pinned notes */}
      <section className="py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>Testimonials</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
              What parents say
            </h2>
            <p className="text-muted text-lg">
              Real feedback from our school community.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 pt-4">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div
                  className={`relative bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-7 ${t.rotate} hover:rotate-0 transition-transform`}
                >
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-coral border-4 border-paper" />
                  <div className="text-marigold mb-3 tracking-widest text-sm">
                    ★★★★★
                  </div>
                  <p className="italic text-[0.97rem] mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo text-white flex items-center justify-center font-semibold shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <strong className="block text-sm">{t.name}</strong>
                      <span className="text-muted text-xs">{t.role}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-24">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-indigo-deep text-white text-center px-8 py-14 md:py-16">
              <div className="absolute inset-0 ruled-bg opacity-[0.1]" />
              <div className="relative">
                <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
                  Ready to join Sunrise?
                </h2>
                <p className="text-white/75 max-w-md mx-auto mb-8">
                  Admissions for the 2026-27 academic year are now open. Give
                  your child the start they deserve.
                </p>
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-marigold hover:bg-marigold-light transition-colors text-ink font-semibold px-7 py-3.5"
                >
                  Start Your Application →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
