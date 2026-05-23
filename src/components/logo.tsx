import Link from 'next/link'

export default function Logo({ href = '/', light = false }: { href?: string; light?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <svg className={`w-6 h-6 ${light ? 'text-emerald-600' : 'text-emerald-400'} shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
      <span className="text-lg font-bold tracking-tight">
        <span className={light ? 'text-zinc-900' : 'text-white'}>Margin</span><span className={light ? 'text-emerald-600' : 'text-emerald-400'}>Log</span>
      </span>
    </Link>
  )
}
