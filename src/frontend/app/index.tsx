/**
 * Main Application Component - Root React component for the receipt image generator.
 * 
 * This file exports the top-level App component that serves as the entry point
 * for the React component tree. It acts as a simple wrapper that delegates to
 * the Main page component, providing a clean separation between application
 * initialization and the main user interface.
 * 
 * @fileoverview Root React component wrapper
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import Main from "@react/page/Main";

/**
 * Root Application Component.
 * 
 * This component serves as the top-level component in the React component tree.
 * It provides a clean separation between the application entry point and the
 * main user interface logic by delegating directly to the Main page component.
 * 
 * The component is intentionally minimal to allow for future expansion of
 * application-level concerns such as:
 * - Error boundaries
 * - Global context providers
 * - Authentication wrappers
 * - Theme providers
 * 
 * @returns The rendered Main page component
 * 
 * @example
 * ```tsx
 * // Used in the frontend entry point
 * root.render(<App />);
 * ```
 */
export default function App() {
  // Delegate to the Main page component which contains the actual application UI
  return <Main />;
}
