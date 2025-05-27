// app/components/FieldBox.tsx
import React from "react";

type Props = {
  label?: string;
  children: React.ReactNode;
};

export default function FieldBox({ label, children }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="bg-white border border-gray-300 rounded px-3 py-2 shadow-sm">
        {children}
      </div>
    </div>
  );
}
