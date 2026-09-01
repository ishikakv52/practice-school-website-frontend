export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-indigo font-semibold text-sm mb-3">
      <span className="w-1.5 h-1.5 rounded-full bg-marigold" />
      {children}
    </span>
  );
}
