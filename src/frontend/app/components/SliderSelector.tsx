// app/components/SliderSelector.tsx
import FieldBox from "./FieldBox";

type SliderSelectorProps = {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  title?: string;
  name: string;
  unit?: string;
  reverse?: boolean;
};

export default function SliderSelector({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  title,
  name,
  unit = "",
  reverse = false,
}: SliderSelectorProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = parseInt(e.target.value);
    const val = reverse ? max - raw + min : raw;
    onChange(val);
  }

  return (
    <FieldBox label={title}>
      <input
        type="range"
        name={name}
        className="w-full"
        min={min}
        max={max}
        step={step}
        value={reverse ? max - value + min : value}
        onChange={handleChange}
      />
      <div className="text-sm text-gray-500 mt-1">
        {value}
        {unit}
      </div>
    </FieldBox>
  );
}
