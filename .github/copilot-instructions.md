# GitHub Copilot Instructions

## Project Overview

This is a Next.js web application for tracking boulder problems at climbing gyms. The app manages boulder routes, including grades, setters, sectors, and statistics.

## Technology Stack

- **Framework**: Next.js 16 with TypeScript
- **UI Library**: React 19
- **Styling**: styled-components
- **Data Management**: Avers (custom data framework)
- **Visualization**: D3.js
- **Build Tools**: Next.js with Turbopack

## Code Structure

- `pages/` - Next.js page components (using Pages Router)
- `src/Views/Components/` - Reusable React components
- `src/storage.ts` - Data models (Account, Boulder)
- `src/app.ts` - Application state management
- `src/Materials/` - Design system (colors, typefaces)
- `static/gym/${NEXT_PUBLIC_GYM}/` - Gym-specific configuration files

## Coding Standards

### TypeScript

- Use strict TypeScript settings
- Prefer explicit types over implicit `any`
- No unused locals or parameters (enforced by tsconfig)

### React & Next.js

- Use functional components with hooks
- Components are in `.tsx` files
- Use styled-components for styling
- Pages use `getInitialProps` pattern (Pages Router)
- Use Next.js Link component for navigation with `legacyBehavior` prop

### Styling

- Use styled-components for all component styling
- Follow existing typeface system in `src/Materials/Typefaces.ts`
- Use color system defined in `src/Materials/Colors.ts`
- Print width: 120 characters (configured in .prettierrc)

### Data Models

- Models are defined using Avers framework
- Use `Avers.definePrimitive()` to define model properties
- Models: Account (user data) and Boulder (route data)

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server
npm run build     # Build for production
```

## Project-Specific Guidelines

1. **Boulder Data**: Each boulder has setter(s), sector, grade, gradeNr, setDate, and optional name
2. **Grades**: Use the config-based grade system, colors are defined per-gym configuration
3. **Sectors**: Use `config.prettyPrintSector()` for display
4. **Accounts**: Three roles: user, setter, admin
5. **Editable Pattern**: Use `Avers.Editable<T>` wrapper for objects that can be modified
6. **Environment Config**: Access gym config via `useEnv()` hook

## Common Patterns

### Component Structure
```typescript
export interface ComponentProps {
  // Props definition
}

export const Component = ({ prop }: ComponentProps) => {
  // Component implementation using hooks
  return <StyledComponent>...</StyledComponent>;
};

const StyledComponent = styled.div`
  // Styles
`;
```

### Accessing Data
```typescript
const { app, config } = useEnv();
const boulderE: Avers.Editable<Boulder> = ...;
const { content } = boulderE; // Access boulder data
```

## Code Quality

- Biome linter is configured but many rules are disabled (see biome.json)
- Focus on maintaining existing code patterns and consistency
- Ensure TypeScript compilation succeeds without errors
- Test changes with `npm run build` before committing

## Important Notes

- This is a gym-specific app - configuration varies by `NEXT_PUBLIC_GYM` environment variable
- Gym logos and sector images are copyrighted by respective gyms
- Code is MIT licensed
- The app is deployed to Vercel
