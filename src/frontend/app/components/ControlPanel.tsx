// src/ControlPanel.tsx
import React, { useRef } from 'react';

type ControlPanelProps = {
  selected: string;
  setSelected: (type: string) => void;
  formOptions: Record<string, React.ForwardRefExoticComponent<any>>;
  handleAdd: (data: any) => void;
  width: number;
  setWidth: (width: number) => void;
};

export default function ControlPanel({
  selected,
  setSelected,
  formOptions,
  handleAdd,
  width,
  setWidth,
}: ControlPanelProps) {
  const formRef = useRef<any>(null);

  const FormComponent = selected ? formOptions[selected] : null;

  return (
    <div className="flex flex-col w-full p-4 space-y-6 bg-gray-50 border-r border-gray-300">
      {/* Selection */}
      <div>
        <label className="block mb-1 font-semibold">Add Element</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select...</option>
          {Object.keys(formOptions).map((key) => (
            <option key={key} value={key}>
              Add {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Width Slider */}
      <div>
        <label className="block mb-1 font-semibold">Preview Width: {width}px</label>
        <input
          type="range"
          min={100}
          max={600}
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Dynamic Form */}
      <div className="flex-grow overflow-auto">
        {FormComponent ? (
          <FormComponent 
            ref={formRef} 
            onAdd={() => {
              if (!formRef.current) return;
              const data = formRef.current.getData();
              handleAdd(data);
            }} 
          />) : <div>Select an element to add.</div>}
      </div>
    </div>
  );
}