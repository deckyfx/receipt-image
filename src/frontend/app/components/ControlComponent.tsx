import { useState, type ChangeEvent } from "react";

// Props for ControlComponent
interface ControlComponentProps {
  onColorChange: (color: string) => void;
  onTextChange: (text: string) => void;
}

export default function ControlComponent({
  onColorChange,
  onTextChange,
}: ControlComponentProps) {
 const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [previewText, setPreviewText] = useState<string>('Hello, Preview!');

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newColor: string = e.target.value;
    setBackgroundColor(newColor);
    onColorChange(newColor);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newText: string = e.target.value;
    setPreviewText(newText);
    onTextChange(newText);
  };

  return (
    // Control panel container adjusted for top-left alignment
    <div className="w-full p-6 rounded-lg bg-white shadow-lg text-left"> {/* Removed max-w-md and changed text-center to text-left */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Control Panel</h2>
      <div className="mb-4 text-left">
        <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700 mb-1">
          Background Color:
        </label>
        <input
          type="color"
          id="bgColor"
          value={backgroundColor}
          onChange={handleColorChange}
          className="w-full h-10 p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4 text-left">
        <label htmlFor="previewText" className="block text-sm font-medium text-gray-700 mb-1">
          Preview Text:
        </label>
        <input
          type="text"
          id="previewText"
          value={previewText}
          onChange={handleTextChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};
