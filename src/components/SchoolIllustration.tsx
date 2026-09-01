export default function SchoolIllustration() {
  return (
    <svg
      viewBox="0 0 460 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[420px] mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
    >
      <defs>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6b95a" />
          <stop offset="100%" stopColor="#e8952c" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e7e3fb" />
        </linearGradient>
      </defs>

      <ellipse cx="230" cy="380" rx="170" ry="20" fill="#000" opacity="0.12" />
      <rect x="40" y="150" width="380" height="210" rx="18" fill="url(#wallGrad)" />
      <polygon points="230,40 420,150 40,150" fill="url(#roofGrad)" />
      <rect x="205" y="60" width="26" height="46" fill="#e8952c" />
      <rect x="231" y="20" width="4" height="46" fill="#241c4d" />
      <polygon points="235,22 275,32 235,42" fill="#e1583f" />

      <rect x="205" y="255" width="50" height="105" rx="6" fill="#3f3184" />
      <circle cx="244" cy="308" r="3.5" fill="#f6b95a" />

      <rect x="80" y="190" width="60" height="55" rx="8" fill="#0f9c8e" />
      <rect x="90" y="200" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="112" y="200" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="90" y="222" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="112" y="222" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />

      <rect x="80" y="270" width="60" height="55" rx="8" fill="#6a5acd" />
      <rect x="90" y="280" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="112" y="280" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="90" y="302" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="112" y="302" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />

      <rect x="320" y="190" width="60" height="55" rx="8" fill="#e1583f" />
      <rect x="330" y="200" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="352" y="200" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="330" y="222" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="352" y="222" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />

      <rect x="320" y="270" width="60" height="55" rx="8" fill="#e8952c" />
      <rect x="330" y="280" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="352" y="280" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="330" y="302" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="352" y="302" width="18" height="18" rx="3" fill="#fff" opacity="0.85" />

      <g transform="translate(300,90) rotate(-12)">
        <polygon points="0,10 46,-6 92,10 46,26" fill="#241c4d" />
        <rect x="40" y="10" width="12" height="26" rx="3" fill="#171331" />
        <circle cx="46" cy="36" r="5" fill="#f6b95a" />
      </g>

      <g transform="translate(30,80) rotate(10)">
        <rect x="0" y="0" width="54" height="38" rx="5" fill="#0f9c8e" />
        <rect x="4" y="5" width="46" height="28" rx="3" fill="#fff" opacity="0.9" />
        <line x1="27" y1="5" x2="27" y2="33" stroke="#0f9c8e" strokeWidth="2" />
      </g>
    </svg>
  );
}
