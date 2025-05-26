// Props for PreviewComponent
interface PreviewComponentProps {
  backgroundColor: string;
  text: string;
}

export default function PreviewComponent({ backgroundColor, text }: PreviewComponentProps) {
  const previewStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
  };

  return (
    // Preview panel container adjusted for top-left alignment
    <div
      className="w-full h-full text-left box-border text-black" /* Removed flex-related centering classes and added text-left */
      style={previewStyle}
    >
      <h3 className="text-3xl font-bold break-words">{text}</h3>
    </div>
  );
};
