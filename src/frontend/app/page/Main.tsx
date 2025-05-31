/**
 * @fileoverview Main Layout Page Component
 * 
 * This file contains the Main component which serves as the root layout for the receipt
 * generator application. It orchestrates the overall application structure by combining
 * the ControlPanel and PreviewPanel in a horizontal split-screen layout that fills the
 * entire viewport height.
 * 
 * 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import ControlPanel from "@react/page/ControlPanel";
import PreviewPanel from "@react/page/PreviewPanel";

/**
 * Main Layout Component
 * 
 * The Main component provides the primary layout structure for the receipt generator
 * application. It implements a two-panel horizontal layout where the ControlPanel
 * occupies the left side for configuration controls, and the PreviewPanel occupies
 * the right side for displaying generated receipt images.
 * 
 * Layout features:
 * - Full viewport height (h-screen)
 * - Horizontal flexbox layout
 * - ControlPanel on the left for controls and forms
 * - PreviewPanel on the right for image preview and management
 * 
 * @returns {JSX.Element} The main application layout with control and preview panels
 * 
 * @example
 * ```tsx
 * // Used as the root component in the application
 * function App() {
 *   return <Main />;
 * }
 * ```
 */
export default function Main() {
  return (
    <div className="flex h-screen">
      {/* Left panel: Configuration controls and component forms */}
      <ControlPanel />
      
      {/* Right panel: Preview of generated receipt images */}
      <PreviewPanel />
    </div>
  );
}
