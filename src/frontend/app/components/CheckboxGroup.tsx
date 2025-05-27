// app/components/CheckboxGroup.tsx
import FieldBox from "./FieldBox";

type CheckboxGroupProps = {
  selections?: readonly string[]; // e.g. ["italic", "underline"]
  names?: readonly string[];
  data?: Record<string, boolean>; // e.g. { italic: true, underline: false }
  onChange?: (change: Record<string, boolean>) => void;
  title?: string;
};

export default function CheckboxGroup({
  selections = [],
  names = [],
  data = {},
  onChange,
  title,
}: CheckboxGroupProps) {
  return (
    <FieldBox label={title}>
      <div className="flex space-x-4">
        {selections.map((selection, index) => (
          <label key={selection} className="flex items-center space-x-1">
            <input
              type="checkbox"
              name={names[index]}
              checked={!!data[selection]}
              onChange={(e) => onChange?.({ [selection]: e.target.checked })}
            />
            <span className="text-sm capitalize">{selection}</span>
          </label>
        ))}
      </div>
    </FieldBox>
  );
}
