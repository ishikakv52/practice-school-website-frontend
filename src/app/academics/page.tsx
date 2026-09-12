import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionTag from "@/components/SectionTag";

export const metadata: Metadata = {
  title: "Academics — Nexa Hub School",
};

const PROGRAMS = [
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789195621/Screenshot_2026-09-12_at_12.16.20_PM.png",
    title: "Pre-Primary (Nursery – KG)",
    text: "Play-based learning focused on motor skills, language, and social development.",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789195621/Screenshot_2026-09-12_at_12.16.25_PM.png",
    title: "Primary (Class I – V)",
    text: "Building strong foundations in language, math, and science through activity-based learning.",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789195620/Screenshot_2026-09-12_at_12.16.30_PM.png",
    title: "Middle School (Class VI – VIII)",
    text: "Broader subject exposure with project-based and collaborative learning methods.",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789195620/Screenshot_2026-09-12_at_12.16.34_PM.png",
    title: "Secondary (Class IX – X)",
    text: "CBSE curriculum with strong lab work, guided by experienced subject teachers.",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789195621/Screenshot_2026-09-12_at_12.16.39_PM.png",
    title: "Senior Secondary (Class XI – XII)",
    text: "Science, Commerce, and Humanities streams with career counselling support.",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789195619/Screenshot_2026-09-12_at_12.16.44_PM.png",
    title: "Digital Learning",
    text: "Smart classrooms and an online portal for assignments, grades, and resources.",
  },
];

const ACTIVITIES = [
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789197090/Screenshot_2026-09-12_at_12.40.51_PM.png",
    title: "Sports",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789197089/Screenshot_2026-09-12_at_12.40.59_PM.png",
    title: "Drama Club",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789197089/Screenshot_2026-09-12_at_12.41.07_PM.png",
    title: "Music & Dance",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789197089/Screenshot_2026-09-12_at_12.41.13_PM.png",
    title: "Robotics Club",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Curriculum"
        title="Academics"
        description="A curriculum designed to challenge, inspire, and prepare students for the future."
        backgroundImage="https://res.cloudinary.com/n6ej76pq/image/upload/v1789192936/ChatGPT_Image_Sep_12_2026_11_32_04_AM.png"
        size="lg"
      />

      <section className="py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>Curriculum</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Our programs
            </h2>
            <p className="text-muted text-lg">
              From early years to senior secondary, tailored for every stage.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="h-full bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-7">
                  <div className="relative w-14 h-14 mb-4">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted text-[0.95rem]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>Activities</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Beyond the classroom
            </h2>
            <p className="text-muted text-lg">
              Clubs, sports, and activities that build well-rounded
              individuals.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ACTIVITIES.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="bg-paper rounded-2xl border border-ink/[0.05] p-7 text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-sm">
                    {a.title}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
