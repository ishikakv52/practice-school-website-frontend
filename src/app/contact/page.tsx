import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Sunrise Public School",
};

const DETAILS = [
  {
    icon: "📍",
    title: "Address",
    text: "123 Education Road, Sector 12, New Delhi, India - 110001",
  },
  {
    icon: "📞",
    title: "Phone",
    text: "+91 98765 43210  |  +91 11 4567 8900",
  },
  {
    icon: "✉️",
    title: "Email",
    text: "info@sunrisepublicschool.edu",
  },
  {
    icon: "🕐",
    title: "Office Hours",
    text: "Monday – Saturday: 8:00 AM – 3:30 PM",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact us"
        description="We'd love to hear from you. Reach out with any questions."
      />

      <section className="py-20 md:py-24">
        <div className="container-page grid md:grid-cols-2 gap-12">
          <Reveal className="space-y-4">
            {DETAILS.map((d) => (
              <div
                key={d.title}
                className="flex items-start gap-4 bg-white rounded-xl border border-ink/[0.05] shadow-[var(--shadow-sm)] p-6 hover:translate-x-1 transition-transform"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo/10 to-teal/10 flex items-center justify-center text-xl shrink-0">
                  {d.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">
                    {d.title}
                  </h3>
                  <p className="text-muted text-sm">{d.text}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="container-page">
          <Reveal>
            <div className="aspect-[16/6] rounded-2xl bg-gradient-to-br from-indigo/10 to-marigold/10 flex items-center justify-center text-muted text-lg gap-2 shadow-[var(--shadow-sm)]">
              🗺️ Map placeholder — embed Google Maps here
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
