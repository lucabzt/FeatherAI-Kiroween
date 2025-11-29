# FeatherAI Documentation Website

A static documentation website for FeatherAI - The lightest Agentic AI Framework you'll ever see.

## Features

- 🎨 **Dark Mode Only** - Beautiful dark theme with custom color scheme
- 📱 **Responsive Design** - Mobile-friendly with collapsible sidebar
- 🔍 **Search Bar** - Quick navigation through documentation
- 💻 **Syntax Highlighting** - Code examples with copy functionality
- 🚀 **Fast & Lightweight** - Built with Vite and React

## Color Scheme

- **Pink**: `#be3389`
- **Blue**: `#0357c1`
- **Secondary Blue**: `#22c4e0`
- **Orange/Brown**: `#dfa987`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend-docs/
├── public/              # Static assets (SVG logos, icons)
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   └── CodeBlock.jsx
│   ├── pages/          # Page components
│   │   ├── GettingStarted.jsx
│   │   ├── SystemInstructions.jsx
│   │   ├── ToolCalling.jsx
│   │   ├── StructuredOutput.jsx
│   │   ├── Multimodal.jsx
│   │   ├── Async.jsx
│   │   ├── Examples.jsx
│   │   └── FeaturedProjects.jsx
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
└── package.json

```

## Pages

### Fully Built Pages
- **Getting Started** - Installation, quick start, and basic configuration
- **System Instructions** - Guide to system instructions with `load_instructions_from_file()`
- **Examples** - Real-world example combining multiple features

### Mock Pages (Coming Soon)
- Tool Calling
- Structured Output
- Multimodal
- Asynchronous Execution
- Featured Projects (with Piatto Cooks and Mentora Kiro)

## Technologies

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Syntax Highlighter** - Code syntax highlighting

## Contributing

Feel free to contribute by adding more documentation pages or improving existing ones!

## License

Part of the FeatherAI project.
