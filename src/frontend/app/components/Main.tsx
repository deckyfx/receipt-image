import ControlPanel from "./ControlPanel";
import PreviewPanel from "./PreviewPanel";

export default function Main() {
  return (
    <div className="flex h-screen">
      <ControlPanel />
      <PreviewPanel />
    </div>
  );
}
