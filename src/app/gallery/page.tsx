import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery — Nexa Hub School",
};

const ITEMS = [
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789188658/ChatGPT_Image_Sep_10_2026_05_28_04_PM.png",
    label: "Campus",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202602/Screenshot_2026-09-12_at_2.08.32_PM.png",
    label: "Science Lab",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202603/Screenshot_2026-09-12_at_2.08.42_PM.png",
    label: "Library",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202604/Screenshot_2026-09-12_at_2.09.06_PM.png",
    label: "Art Class",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202604/Screenshot_2026-09-12_at_2.09.12_PM.png",
    label: "Sports Day",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789197089/Screenshot_2026-09-12_at_12.40.59_PM.png",
    label: "Drama Club",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789197089/Screenshot_2026-09-12_at_12.41.07_PM.png",
    label: "Music",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202723/Screenshot_2026-09-12_at_2.14.36_PM.png",
    label: "Annual Awards",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202722/Screenshot_2026-09-12_at_2.14.44_PM.png",
    label: "Eco Club",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202722/Screenshot_2026-09-12_at_2.14.51_PM.png",
    label: "Computer Lab",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202720/Screenshot_2026-09-12_at_2.14.57_PM.png",
    label: "Annual Day",
  },
  {
    image:
      "https://res.cloudinary.com/n6ej76pq/image/upload/v1789202721/Screenshot_2026-09-12_at_2.15.05_PM.png",
    label: "Graduation",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Campus Life"
        title="Gallery"
        description="Glimpses of campus life, events, and celebrations."
        backgroundImage="https://res.cloudinary.com/n6ej76pq/image/upload/v1789192936/ChatGPT_Image_Sep_12_2026_11_32_04_AM.png"
      />

      <section className="py-20 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={(i % 4) * 60}>
                <div className="flex flex-col gap-2.5">
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:scale-[1.03] transition-transform">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-center text-sm font-semibold">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
