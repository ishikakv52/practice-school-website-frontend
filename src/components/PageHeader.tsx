import Image from "next/image";

export default function PageHeader({
  eyebrow,
  title,
  description,
  backgroundImage,
  size = "md",
}: {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage?: string;
  size?: "md" | "lg";
}) {
  return (
    <div className="relative overflow-hidden bg-indigo-deep text-white">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-indigo-deep/85" />
        </>
      )}
      <div className="absolute inset-0 ruled-bg opacity-[0.12]" />
      <div
        className={`container-page relative ${
          size === "lg" ? "py-32 md:py-44" : "py-20 md:py-24"
        }`}
      >
        <span className="inline-block text-marigold-light font-semibold text-sm mb-3">
          {eyebrow}
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 max-w-2xl">
          {title}
        </h1>
        <p className="text-white/75 text-lg max-w-xl">{description}</p>
      </div>
    </div>
  );
}
