# Frontend Style Guide - FeatherAI Documentation

This style guide defines the design system, coding standards, and best practices for the FeatherAI documentation frontend project.

## Design System

### Color Palette

**Background Colors:**
- Primary Background: `#0a0a0b`
- Secondary Background: `#1a1a1c`
- Tertiary Background: `#050506`

**Border Colors:**
- Primary Border: `#2a2a2c`

**Text Colors:**
- Primary Text: `#e5e5e7` (white text)
- Secondary Text: `#a0a0a3` (muted gray)
- White: `#ffffff`

**Accent Colors:**
- Primary Accent (Cyan): `#22c4e0`
- Secondary Accent (Pink): `#be3389`
- Tertiary Accent (Blue): `#0357c1`
- Quaternary Accent (Beige): `#dfa987`

**Gradient:**
- Main Gradient: `from-[#be3389] via-[#22c4e0] to-[#0357c1]`
- Background Gradient: `from-[#be3389]/10 to-[#0357c1]/10`
- Active State Gradient: `from-[#be3389]/20 to-[#0357c1]/20`

### Typography

**Font Families:**
- Body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
- Logo/Brand: `'Playfair Display', serif`
- Code: `'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace`

**Font Sizes:**
- Heading 1: `text-4xl` (36px)
- Heading 2: `text-3xl` (30px)
- Heading 3: `text-2xl` (24px)
- Body Large: `text-xl` (20px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Extra Small: `text-xs` (12px)

**Font Weights:**
- Bold: `font-bold` (700)
- Semibold: `font-semibold` (600)
- Medium: `font-medium` (500)
- Regular: `font-normal` (400)

### Spacing & Layout

**Container:**
- Max width for content: `max-w-4xl`
- Sidebar width: `w-64` (256px)
- Navbar height: `h-16` (64px)

**Padding:**
- Page padding: `px-8 py-8`
- Component padding: `px-4 py-2` to `px-6 py-4`
- Small padding: `px-2 py-1`

**Margins:**
- Section margin: `mb-12` (48px)
- Component margin: `mb-4` to `mb-6`
- Small margin: `mb-2` to `mb-3`

**Gaps:**
- Large gap: `gap-4` (16px)
- Medium gap: `gap-3` (12px)
- Small gap: `gap-2` (8px)

### Border Radius

- Large: `rounded-lg` (8px)
- Medium: `rounded` (4px)
- Small: `rounded-sm` (2px)
- Full: `rounded-full`

### Transitions

All interactive elements use: `transition-colors` or `transition-all duration-300`
Standard timing: `0.2s ease-in-out` or `duration-300`

## Component Patterns

### Buttons

**Primary Button:**
```jsx
<button className="px-3 py-2 text-[#a0a0a3] hover:text-[#e5e5e7] transition-colors">
  Button Text
</button>
```

**Accent Button:**
```jsx
<button className="px-4 py-2 bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg text-[#e5e5e7] hover:border-[#22c4e0] transition-colors">
  Button Text
</button>
```

### Links

**Navigation Link (Active):**
```jsx
<Link className="bg-gradient-to-r from-[#be3389]/20 to-[#0357c1]/20 text-[#22c4e0] border-l-2 border-[#22c4e0]">
  Link Text
</Link>
```

**Navigation Link (Inactive):**
```jsx
<Link className="text-[#a0a0a3] hover:text-[#e5e5e7] hover:bg-[#1a1a1c]">
  Link Text
</Link>
```

**Card Link:**
```jsx
<a className="block bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg p-4 transition-colors">
  <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">Title →</h3>
  <p className="text-sm text-[#a0a0a3]">Description</p>
</a>
```

### Code Blocks

Use the `CodeBlock` component for all code snippets:
```jsx
<CodeBlock
  code="your code here"
  language="python"
  filename="optional_filename.py"
/>
```

**Inline Code:**
```jsx
<code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">
  inline code
</code>
```

### Info Boxes

**Note/Info Box:**
```jsx
<div className="bg-[#0357c1]/10 border border-[#0357c1]/30 rounded-lg p-4">
  <p className="text-[#a0a0a3] text-sm">
    <strong className="text-[#22c4e0]">Note:</strong> Your message here
  </p>
</div>
```

### Lists

**Styled List:**
```jsx
<ul className="space-y-2 text-[#a0a0a3]">
  <li className="flex items-center gap-2">
    <span className="w-2 h-2 bg-[#22c4e0] rounded-full"></span>
    <strong className="text-white">Label:</strong> Description
  </li>
</ul>
```

### Page Headers

Always use the `PageHeader` component:
```jsx
<PageHeader
  title="Page Title"
  subtitle="Page subtitle or description"
/>
```

This renders:
- Title in `text-4xl font-bold text-white`
- Subtitle in `text-xl text-[#a0a0a3]`
- Gradient divider below

### Search Results

Search highlights use:
```css
mark.search-highlight {
  background-color: rgba(34, 196, 224, 0.3);
  color: #e5e5e7;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
}
```

## React & JSX Standards

### Component Structure

1. Imports first (React, third-party, local components, utilities)
2. Component definition
3. State and hooks
4. Event handlers
5. Effects
6. Return JSX

### File Naming

- Components: PascalCase (e.g., `CodeBlock.jsx`, `PageHeader.jsx`)
- Pages: PascalCase (e.g., `GettingStarted.jsx`)
- Utilities: camelCase (e.g., `search.js`)
- Data files: camelCase (e.g., `searchIndex.js`)

### Component Exports

Use default exports for components:
```jsx
export default function ComponentName() {
  // component code
}
```

### Props Destructuring

Destructure props in function parameters:
```jsx
export default function Component({ title, subtitle, children }) {
  // component code
}
```

## Accessibility

### ARIA Labels

Always include `aria-label` for icon-only buttons:
```jsx
<button aria-label="Toggle menu">
  <svg>...</svg>
</button>
```

### Semantic HTML

- Use semantic elements: `<nav>`, `<main>`, `<aside>`, `<section>`
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<button>` for actions, `<a>` for navigation

### Keyboard Navigation

- Support arrow key navigation in search results
- Support Enter key for selection
- Support Escape key to close modals/dropdowns

## Responsive Design

### Breakpoints

Use Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Mobile-First Approach

Write mobile styles first, then add larger breakpoint overrides:
```jsx
<div className="hidden md:flex lg:block">
  {/* Hidden on mobile, flex on tablet, block on desktop */}
</div>
```

### Sidebar Behavior

- Mobile: Overlay with backdrop, toggle with hamburger
- Desktop (lg+): Fixed sidebar, always visible

### Search Behavior

- Mobile: Collapsible search bar below navbar
- Desktop: Inline search in navbar

## State Management

### Local State

Use `useState` for component-local state:
```jsx
const [isOpen, setIsOpen] = useState(false);
```

### Session Storage

Use for temporary data like search terms:
```jsx
sessionStorage.setItem('searchTerm', term);
const term = sessionStorage.getItem('searchTerm');
sessionStorage.removeItem('searchTerm');
```

### URL State

Use React Router's `useLocation` and `useNavigate` for navigation state.

## Performance

### Code Splitting

Pages are automatically code-split via React Router.

### Image Optimization

- Use SVG for icons and logos
- Set explicit width/height attributes
- Use `loading="lazy"` for below-fold images

### Memoization

Extract stable components outside render to prevent recreation:
```jsx
// Good: Component defined outside
function SearchInput({ ... }) { }

export default function Navbar() {
  return <SearchInput ... />;
}
```

## Icons

### SVG Icons

Use inline SVG with consistent sizing:
- Small: `w-4 h-4`
- Medium: `w-5 h-5`
- Large: `w-6 h-6`

Standard stroke width: `strokeWidth={2}`

### Common Icons

- Search: Magnifying glass
- Menu: Three horizontal lines
- Arrow: Chevron right
- Copy: Overlapping squares
- Check: Checkmark
- External: Arrow pointing out

## Animation

### Hover Effects

All interactive elements should have hover states:
```jsx
hover:text-[#22c4e0]
hover:bg-[#1a1a1c]
hover:border-[#22c4e0]
```

### Transitions

Use consistent transition classes:
```jsx
transition-colors
transition-all duration-300
```

### Keyframe Animations

Define in `index.css` under `@layer components`:
```css
@keyframes highlight-pulse {
  0% { background-color: rgba(34, 196, 224, 0.6); }
  100% { background-color: rgba(34, 196, 224, 0.3); }
}
```

## Scrollbar Styling

Custom dark mode scrollbar:
```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #050506;
}

::-webkit-scrollbar-thumb {
  background: #2a2a2c;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0a0a3;
}
```

## Code Quality

### ESLint

Follow the project's ESLint configuration. Key rules:
- Use React 19 features
- Follow React Hooks rules
- Enable React Refresh for HMR

### Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multiline objects/arrays
- Keep lines under 100 characters when possible

### Comments

Add comments for:
- Complex logic
- Non-obvious behavior
- Workarounds or hacks
- Section dividers in long files

## Dependencies

### Core Dependencies

- React 19.2.0
- React Router DOM 7.9.6
- Tailwind CSS 4.1.17
- React Syntax Highlighter 16.1.0

### Build Tools

- Vite 7.2.4
- ESLint 9.39.1

## File Organization

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable components
├── data/           # Static data and search index
├── pages/          # Page components (routes)
├── utils/          # Utility functions
├── App.jsx         # Main app component with routes
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Best Practices

1. **Keep components small and focused** - Each component should do one thing well
2. **Use composition over inheritance** - Compose complex UIs from simple components
3. **Avoid prop drilling** - Use context or composition for deeply nested props
4. **Extract reusable logic** - Create custom hooks or utility functions
5. **Test interactivity** - Ensure all interactive elements work on mobile and desktop
6. **Optimize for dark mode** - All colors should work well in dark theme
7. **Maintain consistency** - Use existing patterns and components before creating new ones
8. **Document complex logic** - Add comments for non-obvious code
9. **Keep accessibility in mind** - Test with keyboard navigation and screen readers
10. **Performance matters** - Avoid unnecessary re-renders and optimize images
