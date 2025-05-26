import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AlignmentSelector } from "./AlignmentSelector";
import { FieldBox } from "./FieldBox";

type HeadingData = {
  text?: string;
  size?: string;
  align?: "left" | "center" | "right";
};

type Props = {
  onAdd?: () => void;
};

export const HeadingForm = forwardRef(({ onAdd }: Props, ref) => {
  const [data, setData] = useState<HeadingData>({
    text: "",
    size: "h1",
    align: "left",
  });

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  const sliderValue = 7 - parseInt(data.size?.slice(1) || "1");

  const canAdd = !data.text ? false : data.text.trim().length > 0;

  return (
    <div className="space-y-4">
      <FieldBox label="Heading Text">
        <input
          type="text"
          placeholder="Heading Text"
          value={data.text || ""}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </FieldBox>

      <FieldBox label="Size (H1 - H6)">
        <input
          type="range"
          min={1}
          max={6}
          value={sliderValue}
          onChange={(e) =>
            setData({ ...data, size: `h${7 - parseInt(e.target.value)}` })
          }
          className="w-full"
        />
        <div className="text-xs mt-1 text-gray-600">
          {data.size?.toUpperCase() || "H1"}
        </div>
      </FieldBox>

      <FieldBox label="Alignment">
        <AlignmentSelector
          align={data.align || "left"}
          onChange={(align) =>
            setData({ ...data, align: align as "left" | "center" | "right" })
          }
        />
      </FieldBox>

      <button
        onClick={onAdd}
        disabled={!canAdd}
        className={`mt-4 px-4 py-2 rounded ${
          canAdd
            ? "bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"
            : "bg-gray-400 cursor-not-allowed text-gray-700"
        }`}
      >
        Add
      </button>
    </div>
  );
});
