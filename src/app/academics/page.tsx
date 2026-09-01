import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionTag from "@/components/SectionTag";

export const metadata: Metadata = {
  title: "Academics — Sunrise Public School",
};

const PROGRAMS = [
  {
    icon: "🧸",
    title: "Pre-Primary (Nursery – KG)",
    text: "Play-based learning focused on motor skills, language, and social development.",
  },
  {
    icon: "✏️",
    title: "Primary (Class I – V)",
    text: "Building strong foundations in language, math, and science through activity-based learning.",
  },
  {
    icon: "📘",
    title: "Middle School (Class VI – VIII)",
    text: "Broader subject exposure with project-based and collaborative learning methods.",
  },
  {
    icon: "🧪",
    title: "Secondary (Class IX – X)",
    text: "CBSE curriculum with strong lab work, guided by experienced subject teachers.",
  },
  {
    icon: "🎓",
    title: "Senior Secondary (Class XI – XII)",
    text: "Science, Commerce, and Humanities streams with career counselling support.",
  },
  {
    icon: "💻",
    title: "Digital Learning",
    text: "Smart classrooms and an online portal for assignments, grades, and resources.",
  },
];

const ACTIVITIES = [
  { icon: "⚽", title: "Sports" },
  { icon: "🎭", title: "Drama Club" },
  { icon: "🎼", title: "Music & Dance" },
  { icon: "🤖", title: "Robotics Club" },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Curriculum"
        title="Academics"
        description="A curriculum designed to challenge, inspire, and prepare students for the future."
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
                  <div className="text-3xl mb-4">{p.icon}</div>
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
                  <div className="text-3xl mb-3">{a.icon}</div>
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
