import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { AlignmentSelector } from './AlignmentSelector';
import { FieldBox } from './FieldBox';

type TextData = {
  text?: string;
  align?: 'left' | 'center' | 'right';
  thickness?: 'normal' | 'bolder' | 'lighter';
  italic?: boolean;
  underline?: boolean;
};

type Props = {
  onAdd?: () => void;
};

export const TextForm = forwardRef(({ onAdd }: Props, ref) => {
  const [data, setData] = useState<TextData>({
    text: '',
    align: 'left',
    thickness: 'normal',
    italic: false,
    underline: false,
  });

  const canAdd = !data.text ? false : data.text.trim().length > 0;


  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  return (
    <div className="space-y-4">
      <FieldBox label="Text Content">
        <input
          type="text"
          placeholder="Enter text"
          value={data.text || ''}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </FieldBox>

      <FieldBox label="Alignment">
        <AlignmentSelector
          align={data.align || 'left'}
          onChange={(align) => {
            setData({ 
              ...data, 
              align: align as 'left' | 'center' | 'right'
            })
          }}
        />
      </FieldBox>

      <FieldBox label="Thickness">
        <div className="flex space-x-4">
          {['normal', 'bolder', 'lighter'].map((t) => (
            <label key={t} className="flex items-center space-x-1">
              <input
                type="radio"
                name="thickness"
                value={t}
                checked={data.thickness === t}
                onChange={() => setData({ ...data, thickness: t as TextData['thickness'] })}
              />
              <span className="capitalize text-sm">{t}</span>
            </label>
          ))}
        </div>
      </FieldBox>

      <FieldBox label="Styles">
        <div className="flex space-x-4">
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={data.italic}
              onChange={(e) => setData({ ...data, italic: e.target.checked })}
            />
            <span className="text-sm">Italic</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={data.underline}
              onChange={(e) => setData({ ...data, underline: e.target.checked })}
            />
            <span className="text-sm">Underline</span>
          </label>
        </div>
      </FieldBox>

      

      <button
        onClick={onAdd}
        disabled={!canAdd}
        className={`mt-4 px-4 py-2 rounded ${
            canAdd ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer text-white' : 'bg-gray-400 cursor-not-allowed text-gray-700'
          }`}
        >
        Add
      </button>
    </div>
  );
});