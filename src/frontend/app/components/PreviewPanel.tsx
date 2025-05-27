import { useEditorStore } from "@react/store/useEditorStore";

export default function PreviewPanel() {
  const { images, removeImage, width } = useEditorStore();

  return (
    <div
      style={{ width }}
      className="p-0 overflow-y-auto border-l border border-red-300 rounded"
    >
      {images.map((img, idx) => (
        <img
          key={idx}
          src={`data:image/png;base64,${img}`}
          className="w-full cursor-pointer"
          alt={`Generated preview ${idx + 1}`}
          onClick={() => removeImage(idx)}
        />
      ))}
    </div>
  );
}
