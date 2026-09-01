import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery — Sunrise Public School",
};

const ITEMS = [
  { icon: "🏫", label: "Campus" },
  { icon: "🔬", label: "Science Lab" },
  { icon: "📚", label: "Library" },
  { icon: "🎨", label: "Art Class" },
  { icon: "⚽", label: "Sports Day" },
  { icon: "🎭", label: "Drama Club" },
  { icon: "🎼", label: "Music" },
  { icon: "🏆", label: "Annual Awards" },
  { icon: "🌱", label: "Eco Club" },
  { icon: "💻", label: "Computer Lab" },
  { icon: "🎉", label: "Annual Day" },
  { icon: "👩‍🎓", label: "Graduation" },
];

const TILE_GRADIENTS = [
  "from-indigo/15 to-teal/15",
  "from-marigold/15 to-coral/15",
  "from-teal/15 to-indigo/15",
  "from-coral/15 to-marigold/15",
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Campus Life"
        title="Gallery"
        description="Glimpses of campus life, events, and celebrations."
      />

      <section className="py-20 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={(i % 4) * 60}>
                <div className="flex flex-col gap-2.5">
                  <div
                    className={`aspect-4/3 rounded-2xl bg-gradient-to-br ${
                      TILE_GRADIENTS[i % TILE_GRADIENTS.length]
                    } flex items-center justify-center text-4xl shadow-[var(--shadow-sm)] hover:scale-[1.03] transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-center text-sm font-semibold">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-muted text-sm mt-8">
            Note: swap each tile for an actual photo to showcase your school.
          </p>
        </div>
      </section>
    </>
  );
}
