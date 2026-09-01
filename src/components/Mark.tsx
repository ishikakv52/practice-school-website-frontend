export default function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="mark-underline">
      {children}
      <svg viewBox="0 0 200 14" preserveAspectRatio="none" fill="none">
        <path
          d="M2 9.5C40 4 90 2 100 5.5C112 9.5 160 11 198 6"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
