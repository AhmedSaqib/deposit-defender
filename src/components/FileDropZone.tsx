"use client";

import { useRef } from "react";

interface FileDropZoneProps {
  label: string;
  hint?: string;
  files: File[];
  onChange: (files: File[]) => void;
  id: string;
}

export function FileDropZone({ label, hint, files, onChange, id }: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-500 -mt-1">{hint}</p>}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onChange(Array.from(e.target.files ?? []))}
        />
        {files.length === 0 ? (
          <>
            <p className="text-gray-500 text-sm">Click to select photos</p>
            <p className="text-gray-400 text-xs mt-1">JPEG, PNG, WEBP — multiple allowed</p>
          </>
        ) : (
          <div className="text-left">
            <p className="text-sm font-medium text-blue-700 mb-2">
              {files.length} photo{files.length !== 1 ? "s" : ""} selected
            </p>
            <ul className="text-xs text-gray-600 space-y-0.5 max-h-24 overflow-y-auto">
              {files.map((f, i) => (
                <li key={i} className="truncate">{f.name}</li>
              ))}
            </ul>
            <p className="text-xs text-blue-500 mt-2 underline">Click to change</p>
          </div>
        )}
      </div>
    </div>
  );
}
