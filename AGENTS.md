# AGENTS.md - Development Guidelines for fgbyte-portfolio

## Build & Development Commands
- **Development**: `astro dev` (or `astro dev --host` for network access)
- **Build**: `astro check && astro build`
- **Preview**: `astro preview` (or `astro preview:network`)
- **Lint**: `eslint .` (fix with `eslint . --fix`)

## Code Style Guidelines

### TypeScript & Imports
- Use strict TypeScript with path aliases: `@/*` maps to `src/*`
- Single quotes for strings, semicolons as needed
- Interface names: PascalCase (e.g., `Site`, `Page`)
- Type names: PascalCase (e.g., `Links`, `Socials`)

### Components
- SolidJS signals pattern: `const [state, setState] = createSignal(initialValue)`
- Default export for main components
- Props: Use proper typing instead of `any` (avoid `props: any`)
- Component naming: PascalCase (e.g., `CounterButton`, `ArrowCard`)

### Formatting & Linting
- Use Biome for formatting and linting
- No unused variables (warn level)
- No unused imports
- No non-null assertions preferred
- Use button type attribute (accessibility)

### File Structure
- Components: `src/components/` (`.tsx` for SolidJS, `.astro` for Astro)
- Content: `src/content/` with collections in subdirectories
- Layouts: `src/layouts/` (`.astro` files)
- Pages: `src/pages/` (`.astro` files)
- Styles: `src/styles/global.css`
- Utils: `src/lib/utils.ts`

### Testing
- No test framework currently configured
- For single test runs: Not applicable (add testing framework if needed)