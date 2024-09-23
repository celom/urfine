# Urfine Project

## Project Overview

This project is a monorepo-based application using Next.js for the frontend and various modern web technologies. It's structured using Nx as a build system and workspace management tool.

## Project Composition

The project is composed of two main parts:

1. **Apps**: Contains the main application(s)

   - `assessment`: The primary Next.js application

2. **Libs**: Shared libraries and components
   - `components`: Reusable React components
   - `utils`: Utility functions and helpers

## Features

- Next.js-based web application
- Monorepo structure using Nx
- Shared component library
- TypeScript support
- Tailwind CSS for styling
- Authentication (NextAuth.js)
- Form handling with react-hook-form
- State management with Zustand
- API integrations

## Project Organization

```
.
├── apps
│   └── assessment (Main Next.js application)
│       ├── actions
│       ├── app
│       ├── common
│       ├── components
│       ├── public
│       ├── specs
│       ├── store
│       └── utils
├── libs
│   ├── components (Shared React components)
│   └── utils (Shared utility functions)
```

## Technology Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**:
  - Custom components
  - Shadcn UI wrappers
  - Radix UI primitives
- **Form Handling**: react-hook-form
- **Authentication**: NextAuth.js
- **Development Tools**:
  - Nx (Monorepo management)
  - ESLint (Linting)
  - Prettier (Code formatting)
  - Jest (Testing)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```
3. Run the development server:
   ```
   bun run dev
   ```

## Available Scripts

- `bun dev`: Start the development server
- `bun nx test <project-name>`: Run tests for specific project
- `bun nx run-many -t test`: Run tests for all project
- `bun nx lint lint <project-name>`: Lint the codebase for specific project
- `bun nx run-many -t lint`: Lint the codebase for all project

## Project Structure

- `apps/assessment`: Main Next.js application

  - `app`: Next.js app directory
  - `components`: Application-specific components
  - `common`: Shared types and utilities
  - `store`: Zustand store definitions
  - `actions`: Server actions (Next.js 14 feature)
  - `api`: API routes

- `libs/components`: Shared React components library
- `libs/utils`: Shared utility functions

## License

This project is licensed under the MIT License.
