import type { ComponentType } from "@src/types";

type Props = {
  component?: ComponentType;
  disabled?: boolean;
  onAdd?: () => void;
};

export default function AddButton({ component, disabled, onAdd }: Props) {
  return (
    <button
      onClick={onAdd}
      disabled={disabled}
      className={`
        w-full py-2 rounded
        text-white
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }
      `}
    >
      {`ADD ${component?.toLocaleUpperCase()}`}
    </button>
  );
}
