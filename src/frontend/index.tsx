/**
 * Frontend Application Entry Point - React DOM initialization and startup logic.
 * 
 * This file serves as the main entry point for the React frontend application.
 * It handles DOM readiness detection, React root creation, and application
 * mounting to ensure proper initialization regardless of when the script loads.
 * 
 * @fileoverview React application initialization and DOM mounting
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import { createRoot } from "react-dom/client";

import App from "./app";

/**
 * Initializes and starts the React application.
 * 
 * This function:
 * 1. Locates the root DOM element for React mounting
 * 2. Creates a React 18 concurrent root
 * 3. Renders the main App component
 * 
 * The function assumes the existence of a DOM element with id="root"
 * as defined in the HTML template.
 */
function start() {
  // Find the root DOM element where React will mount
  // The non-null assertion (!) is safe because the HTML template guarantees this element exists
  const domNode = document.getElementById("root")!;
  
  // Create a React 18 concurrent root for improved performance and features
  const root = createRoot(domNode);
  
  // Render the main application component
  root.render(<App />);
}

// Handle different document ready states to ensure proper initialization timing
if (document.readyState === "loading") {
  // Document is still loading, wait for DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", start);
} else {
  // Document is already loaded (interactive or complete state), start immediately
  start();
}
