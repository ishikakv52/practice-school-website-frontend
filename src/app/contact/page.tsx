import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Nexa Hub School",
};

const DETAILS = [
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202918/Screenshot_2026-09-12_at_2.17.06_PM.png",
    title: "Address",
    text: "123 Education Road, Sector 12, New Delhi, India - 110001",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202857/Screenshot_2026-09-12_at_2.17.13_PM.png",
    title: "Phone",
    text: "+91 98765 43210  |  +91 11 4567 8900",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202856/Screenshot_2026-09-12_at_2.17.18_PM.png",
    title: "Email",
    text: "info@nexahubschool.edu",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202855/Screenshot_2026-09-12_at_2.17.23_PM.png",
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
        backgroundImage="https://res.cloudinary.com/n6ej76pq/image/upload/v1789192936/ChatGPT_Image_Sep_12_2026_11_32_04_AM.png"
      />

      <section className="py-20 md:py-24">
        <div className="container-page grid md:grid-cols-2 gap-12">
          <Reveal className="space-y-4">
            {DETAILS.map((d) => (
              <div
                key={d.title}
                className="flex items-start gap-4 bg-white rounded-xl border border-ink/[0.05] shadow-[var(--shadow-sm)] p-6 hover:translate-x-1 transition-transform"
              >
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    className="object-cover"
                  />
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

          <ContactForm />
        </div>
      </section>
    </>
  );
}
