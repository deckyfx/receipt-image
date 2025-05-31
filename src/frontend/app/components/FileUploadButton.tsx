import { useRef } from "react";

interface FileUploadButtonProps {
  title?: string;
  onFileContent: (content: string) => void;
  onError: (error: string) => void;
  accept?: string;
  buttonText?: string;
  buttonClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
}

export default function FileUploadButton({
  title,
  onFileContent,
  onError,
  accept = ".json",
  buttonText = "Upload JSON File",
  buttonClassName = "w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2",
  containerClassName = "space-y-4",
  titleClassName = "text-lg font-semibold",
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file extension
    const acceptedExtensions = accept.split(",").map(ext => ext.trim());
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    
    if (!acceptedExtensions.some(ext => fileExtension === ext)) {
      onError(`Please upload a file with one of these extensions: ${accept}`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileContent(content);
    };
    reader.onerror = () => {
      onError("Failed to read file");
    };
    reader.readAsText(file);

    // Reset the input so the same file can be selected again
    event.target.value = "";
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const content = (
    <>
      <button
        onClick={triggerFileUpload}
        className={buttonClassName}
      >
        <span className="material-icons text-xl">upload</span>
        {buttonText}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );

  if (!title) {
    return content;
  }

  return (
    <div className={containerClassName}>
      <h3 className={titleClassName}>{title}</h3>
      {content}
    </div>
  );
}