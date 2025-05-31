# 🧾 Receipt Image Generator

> Transform your data into authentic-looking digital receipts with pixel-perfect precision

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat&logo=bun&logoColor=white)](https://bun.sh)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ Features

### 🎯 Core Capabilities
- **Real-time Preview** - See your receipt design update instantly as you type
- **Monospace Authenticity** - Pixel-perfect monospace font rendering for that genuine receipt feel
- **Batch Processing** - Generate multiple receipts from JSON data in milliseconds
- **High-Quality Output** - Export receipts as crisp PNG images with customizable dimensions

### 🛠️ Component Library
- **📝 Text Elements** - Regular text, bold, italic, underline with full styling control
- **📰 Headings** - Six heading levels (H1-H6) for hierarchical content
- **➖ Dividers** - Multiple styles: solid, dashed, dotted, double lines, and ASCII art
- **📊 Multi-Column Layouts** - Create complex receipt layouts with flexible column grids
- **🖼️ Images** - Embed logos and graphics with size and alignment control
- **📱 QR Codes** - Generate QR codes on-the-fly for URLs, payment info, or any data
- **📊 Barcodes** - Support for multiple formats: CODE128, CODE39, EAN13, UPC, and more

### 🚀 Developer Experience
- **Zero Build Step** - Powered by Bun's native TypeScript support
- **Hot Module Replacement** - Instant feedback during development
- **Type-Safe** - Full TypeScript coverage with discriminated unions
- **Modern Stack** - React 19, Zustand state management, Tailwind CSS

## 🏃‍♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/receipt-image.git
cd receipt-image

# Install dependencies
bun install

# Start development server
bun dev

# Open http://localhost:3000
```

## 🔧 Usage

### Interactive Mode
Navigate to `http://localhost:3000` to use the visual receipt builder with real-time preview.

### API Mode

#### Generate Single Element
```bash
POST /api/generate
Content-Type: application/json

{
  "type": "text",
  "content": "Thank you for your purchase!",
  "bold": true,
  "alignment": "center"
}
```

#### Batch Processing
```bash
POST /api/parse
Content-Type: application/json

{
  "width": 400,
  "components": [
    { "type": "heading", "level": 1, "content": "STORE NAME" },
    { "type": "divider", "style": "double" },
    { "type": "text", "content": "123 Main St" },
    { "type": "qrcode", "content": "https://example.com" }
  ]
}
```

## 🎨 Examples

### Simple Receipt
```json
{
  "width": 300,
  "components": [
    { "type": "text", "content": "COFFEE SHOP", "bold": true, "alignment": "center" },
    { "type": "divider" },
    { "type": "columns", "columns": [
      { "content": "Cappuccino", "width": 70 },
      { "content": "$4.50", "width": 30, "alignment": "right" }
    ]},
    { "type": "divider", "style": "dashed" },
    { "type": "text", "content": "TOTAL: $4.50", "bold": true }
  ]
}
```

## 🏗️ Architecture

```
receipt-image/
├── src/
│   ├── index.ts              # Bun server
│   ├── ReceiptBuilder.ts     # Core receipt generation
│   ├── ImageGenerator.tsx    # HTML to image conversion
│   └── frontend/            
│       └── app/             # React components
└── package.json
```

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Receipt Image Generator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh) - The fast all-in-one JavaScript runtime
- UI powered by [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Image generation via [Puppeteer](https://pptr.dev/)
- State management with [Zustand](https://github.com/pmndrs/zustand)

---

<p align="center">Made with ❤️ and ☕</p>