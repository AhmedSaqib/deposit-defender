import Link from "next/link";
import { LogoMark } from "@/components/Logo";

interface InnerHeaderProps {
  title: string;
  subtitle?: string;
  maxWidth?: "max-w-2xl" | "max-w-3xl";
}

export function InnerHeader({ title, subtitle, maxWidth = "max-w-2xl" }: InnerHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className={`${maxWidth} mx-auto px-4 py-3.5 flex items-center gap-3`}>
        <Link href="/" className="flex items-center gap-2 shrink-0 group" aria-label="Back to MoveProof.ai">
          <LogoMark className="w-8 h-8" />
          <span className="hidden sm:block text-sm font-bold">
            <span className="text-gray-800 group-hover:text-gray-900 transition-colors">MoveProof</span>
            <span className="text-blue-600">.ai</span>
          </span>
        </Link>
        <div className="h-6 w-px bg-gray-200 shrink-0" />
        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-gray-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        <Link
          href="/"
          className="shrink-0 text-xs text-gray-400 hover:text-gray-700 transition-colors"
        >
          ← Home
        </Link>
      </div>
    </header>
  );
}
