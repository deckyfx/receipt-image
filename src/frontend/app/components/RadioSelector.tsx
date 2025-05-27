import FieldBox from "./FieldBox";

type RadioSelectorProps<T extends string | number> = {
  value?: T;
  onChange?: (val: T) => void;
  selections: readonly T[];
  title?: string;
  name: string;
};

export default function RadioSelector<T extends string | number>({
  value,
  onChange,
  selections,
  title,
  name,
}: RadioSelectorProps<T>) {
  return (
    <FieldBox label={title}>
      <div className="space-x-4">
        {selections.map((opt) => (
          <label
            key={String(opt)}
            className="inline-flex items-center space-x-1"
          >
            <input
              type="radio"
              name={name}
              value={String(opt)}
              checked={value === opt}
              onChange={() => onChange?.(opt)}
            />
            <span className="capitalize">{String(opt)}</span>
          </label>
        ))}
      </div>
    </FieldBox>
  );
}
