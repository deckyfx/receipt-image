// src/forms/common/AlignmentSelector.tsx
import React from 'react';

type Props = {
  align: string;
  onChange: (val: string) => void;
};

export function AlignmentSelector({ align, onChange }: Props) {
  return (
    <div className="flex gap-4">
      {['left', 'center', 'right'].map((opt) => (
        <label key={opt} className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name="alignment"
            value={opt}
            checked={align === opt}
            onChange={() => onChange(opt)}
          />
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </label>
      ))}
    </div>
  );
}
