// app/components/CheckboxGroup.tsx
import FieldBox from "./FieldBox";

type CheckboxGroupProps = {
  selections: readonly string[]; // e.g. ["italic", "underline"]
  data: Record<string, boolean>; // e.g. { italic: true, underline: false }
  onChange: (change: Record<string, boolean>) => void;
  title?: string;
};

export default function CheckboxGroup({
  selections,
  data,
  onChange,
  title,
}: CheckboxGroupProps) {
  return (
    <FieldBox label={title}>
      <div className="flex space-x-4">
        {selections.map((name) => (
          <label key={name} className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={!!data[name]}
              onChange={(e) => onChange({ [name]: e.target.checked })}
            />
            <span className="text-sm capitalize">{name}</span>
          </label>
        ))}
      </div>
    </FieldBox>
  );
}
