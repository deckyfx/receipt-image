// app/components/TextInput.tsx
import FieldBox from "./FieldBox";

type TextInputProps = {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  title?: string;
  name: string;
};

export default function TextInput({
  value,
  onChange,
  placeholder = "",
  title,
  name,
}: TextInputProps) {
  return (
    <FieldBox label={title}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </FieldBox>
  );
}
