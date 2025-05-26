type Props = {
  images: string[];
  setImages: (images: string[]) => void;
  width: number;
};

export default function PreviewPanel({ images, setImages, width }: Props) {
  return (
    <div style={{ width }} className="p-4 overflow-y-auto border-l">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative"
          onClick={() => setImages(images.filter((_, i) => i !== idx))}
        >
          <img
            src={`data:image/png;base64,${img}`}
            alt={`Preview ${idx}`}
            className="w-full rounded shadow"
          />
        </div>
      ))}
    </div>
  );
}
