// app/components/TextInput.tsx
import FieldBox from "./FieldBox";

type NumberInputProps = {
  value?: number;
  onChange?: (val: string) => void;
  placeholder?: string;
  title?: string;
  name?: string;
  min?: number;
  max?: number;
};

export default function NumberInput({
  value,
  onChange,
  placeholder = "",
  title,
  name,
  min,
  max,
}: NumberInputProps) {
  return (
    <FieldBox label={title}>
      <input
        type="number"
        name={name}
        min={min}
        max={max}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </FieldBox>
  );
}
