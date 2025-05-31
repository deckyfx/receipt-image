# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a receipt image generator that creates monospace-styled receipt images from various components (text, headings, dividers, QR codes, barcodes, etc.). It uses Bun as the runtime, React for the frontend, and Puppeteer for HTML-to-image conversion.

## Essential Commands

```bash
# Install dependencies
bun install

# Run development server (port 3000, includes HMR)
bun dev
```

## Architecture

The project is a monolithic application with tightly integrated frontend and backend:

- **Backend**: Bun server (src/index.ts) with API routes:
  - `/api/generate` - Generates single receipt elements
  - `/api/parse` - Batch processes receipt data from JSON
  
- **Frontend**: React SPA (src/frontend/) with:
  - Component forms for each receipt element type
  - Zustand store for state management
  - Real-time preview of generated receipts

- **Core Logic**: 
  - `ReceiptBuilder` (src/ReceiptBuilder.ts) - Fluent API for constructing receipt HTML
  - `ImageGenerator` (src/ImageGenerator.tsx) - Puppeteer-based HTML to image conversion

## Key Technical Details

- **No build step**: Bun handles TypeScript transpilation on-the-fly
- **Styling**: Tailwind CSS with bun-plugin-tailwind
- **Type System**: Discriminated unions for receipt components (see src/types/index.tsx)
- **Path Aliases**: @src, @frontend, @react configured in tsconfig.json

## Receipt Component Types

The system supports: text, heading, divider, columns, image, qrcode, barcode. Each type has its own form component in src/frontend/app/components/ and corresponding type definition.

## Development Notes

- Frontend changes hot reload automatically
- Backend changes restart the server (with --hot flag)
- All receipt rendering uses monospace fonts for authentic receipt appearance
- Images are returned as base64-encoded PNGs