import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionTag from "@/components/SectionTag";

export const metadata: Metadata = {
  title: "About Us — Nexa Hub School",
};

const LEADERSHIP = [
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789194299/Screenshot_2026-09-12_at_11.54.17_AM.png",
    name: "Dr. Anjali Mehra",
    role: "Principal — 20+ years in education leadership",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789194293/Screenshot_2026-09-12_at_11.54.24_AM.png",
    name: "Mr. Rajesh Kumar",
    role: "Vice Principal — Academics & Curriculum",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789194294/Screenshot_2026-09-12_at_11.54.30_AM.png",
    name: "Mrs. Sunita Rao",
    role: "Head of Administration",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Since 2000"
        title="About our school"
        description="Our story, mission, and the people who make it happen."
      />

      <section className="py-20 md:py-24">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionTag>Since 2000</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-[2.1rem] tracking-tight mb-4">
              Our story
            </h2>
            <p className="text-muted mb-4">
              Founded in 2000, Nexa Hub School began with a simple
              vision: to create a learning environment where every child
              feels valued and inspired to reach their full potential. Over
              25 years, we have grown into a community of 1500+ students,
              guided by 80+ dedicated educators.
            </p>
            <p className="text-muted">
              We believe education goes beyond textbooks — it&apos;s about
              building confidence, curiosity, and character that lasts a
              lifetime.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-teal/10 to-marigold/10 shadow-[var(--shadow-sm)]">
              <Image
                src="https://res.cloudinary.com/n6ej76pq/image/upload/v1789192936/ChatGPT_Image_Sep_12_2026_11_32_04_AM.png"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>Purpose</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
              Our mission &amp; vision
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="h-full bg-paper rounded-2xl p-8 border border-ink/[0.05]">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Mission
                </h3>
                <p className="text-muted">
                  To provide quality, value-based education that nurtures
                  intellectual, emotional, and physical growth in every
                  student, preparing them to be responsible global citizens.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full bg-paper rounded-2xl p-8 border border-ink/[0.05]">
                <div className="text-3xl mb-4">🌟</div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Vision
                </h3>
                <p className="text-muted">
                  To be a leading institution recognized for academic
                  excellence, innovation in teaching, and a supportive
                  community that empowers lifelong learners.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>Our Team</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Meet our leadership
            </h2>
            <p className="text-muted text-lg">
              Guiding our school with experience and vision.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <div className="h-full bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-8 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-marigold/20">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1">
                    {p.name}
                  </h3>
                  <p className="text-muted text-sm">{p.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
