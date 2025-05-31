import ControlPanel from "@react/page/ControlPanel";
import PreviewPanel from "@react/page/PreviewPanel";

export default function Main() {
  return (
    <div className="flex h-screen">
      <ControlPanel />
      <PreviewPanel />
    </div>
  );
}
