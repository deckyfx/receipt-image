import { useEditorStore } from "@react/store/useEditorStore";

export default function PreviewPanel() {
  const { images, removeImage, width, clearAll } = useEditorStore();

  return (
    <div className="flex flex-col h-full">
      {images.length > 0 && (
        <div className="p-2 border-b flex justify-end">
          <button
            onClick={clearAll}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer flex items-center gap-2 text-sm"
          >
            <span className="material-icons text-lg">delete_sweep</span>
            Clear All
          </button>
        </div>
      )}
      
      <div
        style={{ width }}
        className="p-0 overflow-y-auto border-l border border-red-300 rounded flex-1"
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative group">
            <img
              src={`data:image/png;base64,${img}`}
              className="w-full"
              alt={`Generated preview ${idx + 1}`}
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700"
            >
              <span className="material-icons text-xl">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
