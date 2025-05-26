// src/Main.tsx
import { useState } from "react";
import ControlPanel from "./ControlPanel";
import PreviewPanel from "./PreviewPanel";
import { HeadingForm } from "./HeadingForm";
import { TextForm } from "./TextForm";

const formOptions = {
  heading: HeadingForm,
  text: TextForm,
};

type ElementType = keyof typeof formOptions;

type ResponsePayload = {
  status: "ok";
  image: string;
};

export default function Main() {
  const [selected, setSelected] = useState<ElementType | "">("heading");
  const [images, setImages] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(320);

  const handleAdd = async (formData: any) => {
    if (!selected) return;

    const payload = { type: selected, data: formData, width };
    // Optional: console.log('Sending payload:', payload);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const { image } = (await res.json()) as ResponsePayload;
    if (image) setImages((imgs) => [...imgs, image]);
  };

  function setSelectedProxy(type: string) {
    setSelected(type as ElementType);
  }

  return (
    <div className="flex h-screen">
      <ControlPanel
        selected={selected}
        setSelected={setSelectedProxy}
        formOptions={formOptions}
        handleAdd={handleAdd}
        width={width}
        setWidth={setWidth}
      />
      <PreviewPanel images={images} setImages={setImages} width={width} />
    </div>
  );
}
