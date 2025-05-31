/**
 * Main server entry point for the Receipt Image Generator application.
 * 
 * This file configures and starts a Bun server with:
 * - Frontend static file serving
 * - API routes for receipt generation
 * - Hot Module Reloading for development
 * 
 * @fileoverview Main server configuration and startup
 * @author Receipt Image Generator Team
 * @version 1.0.0
 * @since 2024-12-31
 * 
 * CHANGE LOG:
 * - 2024-12-31: Added comprehensive TSDoc documentation and inline comments (Documentation Enhancement)
 */

import frontend from "./frontend/index.html";
import GenerateRoute from "./GenerateRoute";
import ParseRoute from "./ParseRoute";

// Server configuration: Use environment PORT or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Starts the Bun server with configured routes and development settings.
 * 
 * The server provides:
 * - Static frontend serving at root path
 * - API endpoint for single receipt element generation
 * - API endpoint for batch receipt processing
 * - Hot Module Reloading during development
 * - Console log forwarding from browser to terminal
 */
Bun.serve({
  port: Number(PORT),
  
  // Development configuration for enhanced developer experience
  development: {
    // Enable Hot Module Reloading for automatic updates during development
    hmr: true,

    // Echo console logs from the browser to the terminal for debugging
    console: true,
  },

  // Route configuration (requires Bun v1.2.3+)
  routes: {
    // Serve the React frontend application at the root path
    "/": frontend,
    
    // API endpoint for generating individual receipt elements
    "/api/generate": GenerateRoute,
    
    // API endpoint for batch processing receipt data from JSON
    "/api/parse": ParseRoute,
  },

  /**
   * Fallback handler for unmatched routes.
   * Required for Bun versions < 1.2.3
   * 
   * @param req - The incoming HTTP request
   * @returns A 404 Not Found response for unmatched routes
   */
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

// Log server startup confirmation with the configured port
console.log(`Server running at ${PORT}`);
