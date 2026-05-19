export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#1d4ed8" />
      {/* House shape */}
      <path d="M20 9L8 19H12V30H28V19H32L20 9Z" fill="white" />
      {/* Checkmark inside house body */}
      <path
        d="M14 24L18 28L26 20"
        stroke="#1d4ed8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const iconClass =
    size === "lg" ? "w-11 h-11" : size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const textClass =
    size === "lg"
      ? "text-2xl font-bold tracking-tight"
      : size === "sm"
      ? "text-base font-bold"
      : "text-lg font-bold";

  return (
    <div className="flex items-center gap-2.5">
      <LogoMark className={iconClass} />
      <span className={textClass}>
        <span className="text-gray-900">RentProof</span>
        <span className="text-blue-600">.ai</span>
      </span>
    </div>
  );
}
