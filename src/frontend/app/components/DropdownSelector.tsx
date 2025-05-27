// app/components/DropdownSelector.tsx
import FieldBox from "./FieldBox";

type DropdownSelectorProps<T extends string | number> = {
  value?: T | "";
  onChange?: (val: T) => void;
  selections: readonly T[];
  title?: string;
  name: string;
  placeholder?: string;
};

export default function DropdownSelector<T extends string | number>({
  value,
  onChange,
  selections,
  title,
  name,
  placeholder = "-- Select --",
}: DropdownSelectorProps<T>) {
  return (
    <FieldBox label={title}>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value as T)}
        className="w-full border rounded p-2"
      >
        <option value="">{placeholder}</option>
        {selections.map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {String(opt).toLocaleUpperCase()}
          </option>
        ))}
      </select>
    </FieldBox>
  );
}
