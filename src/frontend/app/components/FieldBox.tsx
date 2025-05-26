// src/forms/common/FieldBox.tsx
import React from 'react';

type Props = {
  label: string;
  children: React.ReactNode;
};

export function FieldBox({ label, children }: Props) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold text-gray-700">{label}</div>
      <div className="border rounded p-2 bg-white shadow-sm">
        {children}
      </div>
    </div>
  );
}
