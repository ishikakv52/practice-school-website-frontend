import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionTag from "@/components/SectionTag";
import AdmissionForm from "@/components/AdmissionForm";

export const metadata: Metadata = {
  title: "Admissions — Sunrise Public School",
};

const STEPS = [
  {
    icon: "📝",
    title: "Apply Online",
    text: "Fill out the form below with student details.",
  },
  {
    icon: "📄",
    title: "Document Verification",
    text: "Submit required documents for review.",
  },
  {
    icon: "🗣️",
    title: "Interaction",
    text: "A short interaction with the student and parents.",
  },
  {
    icon: "✅",
    title: "Confirmation",
    text: "Receive admission confirmation and fee details.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="2026-27 Intake"
        title="Admissions"
        description="Join the Sunrise family — admissions open for the 2026-27 academic year."
      />

      <section className="py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>How It Works</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Admission process
            </h2>
            <p className="text-muted text-lg">
              A simple, transparent process in four steps.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="relative h-full bg-white rounded-2xl shadow-[var(--shadow-sm)] border border-ink/[0.05] p-7 text-center">
                  <div className="w-8 h-8 rounded-full bg-indigo text-white flex items-center justify-center font-display font-bold text-sm mx-auto mb-4">
                    {i + 1}
                  </div>
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-display font-semibold text-[1.02rem] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted text-sm">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionTag>Get Started</SectionTag>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3">
              Apply now
            </h2>
            <p className="text-muted text-lg">
              Fill in the details below and our admissions team will reach
              out.
            </p>
          </Reveal>
          <Reveal>
            <AdmissionForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
