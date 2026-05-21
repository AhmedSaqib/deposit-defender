'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Upload, Info, Download, X, AlertTriangle, CheckCircle } from 'lucide-react'
import { parseCSV, TEMPLATE_HEADERS, TEMPLATE_EXAMPLE, PLATFORM_OPTIONS, CATEGORY_OPTIONS, type ImportRow } from '@/lib/csv-import'
import { importSales } from '@/lib/actions'
import { PLATFORMS, type Platform } from '@/lib/platform-fees'

const SCHEMA_INFO = `Required columns (any order, flexible naming):
• item_name   — "item", "name", "title", "product"
• sale_price  — "price", "sold price", "amount"
• sale_date   — "date", "sold date" (YYYY-MM-DD)

Optional columns:
• cost_of_goods — "cost", "cogs", "paid"
• shipping_cost — "shipping", "postage"
• platform      — ${PLATFORM_OPTIONS}
• category      — ${CATEGORY_OPTIONS}
• notes         — "notes", "comments"

Unrecognised columns are ignored. Missing optional fields default to 0 / "Other" / "other".`

function downloadTemplate() {
  const csv = `${TEMPLATE_HEADERS}\n${TEMPLATE_EXAMPLE}`
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'marginlog-import-template.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function ImportForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [rows, setRows] = useState<ImportRow[]>([])
  const [warnings, setWarnings] = useState<string[]>([])
  const [fileName, setFileName] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleFile(file: File) {
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a .csv file.')
      return
    }
    setFileName(file.name)
    setError('')
    const reader = new FileReader()
    reader.onload = e => {
      const text = e.target?.result as string
      const result = parseCSV(text)
      setRows(result.rows)
      setWarnings(result.warnings)
    }
    reader.readAsText(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  async function handleImport() {
    if (!rows.length) return
    setLoading(true)
    setError('')
    try {
      await importSales(rows)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed.')
      setLoading(false)
    }
  }

  const previewRows = rows.slice(0, 5)

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Import sales</h1>
          <p className="text-zinc-500 text-sm mt-1">Upload a CSV — column names are detected automatically.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Template
          </button>
          <button
            onClick={() => setShowInfo(v => !v)}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-2 rounded-lg transition-colors"
          >
            <Info className="w-4 h-4" /> Schema
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 relative">
          <button onClick={() => setShowInfo(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-semibold text-white mb-3">Accepted column names</h3>
          <pre className="text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed">{SCHEMA_INFO}</pre>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-zinc-700 hover:border-emerald-500 rounded-2xl p-12 text-center cursor-pointer transition-colors group"
      >
        <Upload className="w-8 h-8 text-zinc-600 group-hover:text-emerald-400 mx-auto mb-3 transition-colors" />
        {fileName ? (
          <p className="text-white font-medium">{fileName}</p>
        ) : (
          <>
            <p className="text-zinc-400 text-sm">Drop your CSV here or <span className="text-emerald-400">browse</span></p>
            <p className="text-zinc-600 text-xs mt-1">CSV exports from eBay, Poshmark, Mercari, and other resale platforms only</p>
          </>
        )}
        <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />
      </div>

      {warnings.length > 0 && (
        <div className="space-y-1">
          {warnings.map((w, i) => (
            <div key={i} className="flex items-center gap-2 text-amber-400 text-xs">
              <AlertTriangle className="w-3 h-3 shrink-0" /> {w}
            </div>
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <>
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            {rows.length} sale{rows.length !== 1 ? 's' : ''} ready to import
            {rows.length > 5 && <span className="text-zinc-500">— showing first 5 below</span>}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500">
                    <th className="text-left px-4 py-3 font-medium">Item</th>
                    <th className="text-left px-4 py-3 font-medium">Platform</th>
                    <th className="text-left px-4 py-3 font-medium">Date</th>
                    <th className="text-right px-4 py-3 font-medium">Sale price</th>
                    <th className="text-right px-4 py-3 font-medium">COGS</th>
                    <th className="text-right px-4 py-3 font-medium">Shipping</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 last:border-0">
                      <td className="px-4 py-2.5 text-white">{row.item_name}</td>
                      <td className="px-4 py-2.5 text-zinc-400">{PLATFORMS[row.platform as Platform]?.name ?? row.platform}</td>
                      <td className="px-4 py-2.5 text-zinc-400">{row.sale_date}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">${row.sale_price.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-400">${row.cost_of_goods.toFixed(2)}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-400">${row.shipping_cost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleImport}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Importing...' : `Import ${rows.length} sale${rows.length !== 1 ? 's' : ''}`}
            </button>
            <Link href="/sales" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
              Cancel
            </Link>
          </div>
        </>
      )}
    </main>
  )
}
