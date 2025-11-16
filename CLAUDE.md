# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Installation and Setup
```bash
npm install --legacy-peer-deps  # Required flag for this project
```

### Running the Application
```bash
npm run android                 # Run Android app
npm run ios                     # Run iOS app (after pod install)
npm run ios:pod-install         # Install iOS CocoaPods dependencies
npm start                       # Start Metro bundler
```

### Development Tools
```bash
npm run lint                    # Run ESLint
npm run format                  # Format code with Prettier
npm run typecheck               # Run TypeScript type checking
npm test                        # Run Jest tests
```

### Platform-Specific Commands
```bash
npm run android:clean           # Clean Android build
npm run ios:clean               # Clean iOS build and pods
npm run android:devices         # List Android devices
npm run ios:devices             # List iOS devices
```

### Build System Refresh
```bash
npm run refresh                 # Clean and refresh entire project
npm run refresh:watchman        # Clear Watchman cache
npm run refresh:modules         # Refresh module linking
npm run refresh:start           # Restart Metro with cache clear
```

## Optional Module System Architecture

This project uses a unique modular architecture where feature screens can be dynamically enabled/disabled. The system consists of:

### Module Configuration
- `modules.json`: Central registry defining all available modules
- `scripts/modules-setup.js`: CLI tool for managing module states
- `src/types/optional-modules.d.ts`: TypeScript declarations for optional modules

### Module Types
1. **Screen Modules**: Complete feature screens (Chat AI, Redux Examples, Skia Accelerometer)
2. **Core Components**: Shared utilities (error-boundary, logger, redux-store, safe-area-view)

### Module Management Commands
```bash
npm run modules:setup           # Interactive module configuration
npm run modules:status          # Check which modules are enabled
npm run modules:enable <name>   # Enable specific module
npm run modules:disable <name>  # Disable specific module
npm run modules:enable-all      # Enable all modules
npm run modules:disable-all     # Disable all modules
```

### Module Implementation Pattern
- Each optional screen uses a lazy loading pattern with `*-screen-opt.tsx` files
- Failed module imports gracefully fallback to `NotFoundScreen`
- Modules are physically located in `./modules/` directory as separate npm packages
- When enabled, modules are locally linked via `npm install <path>` 
- The `SuspenseScreen` HOC handles loading states and error boundaries

### Example Module Structure
```
modules/
├── chat-ai-screen/          # AI chat with ExecuTorch
├── redux-screen/            # Redux examples and patterns
├── skia-accelerometer-screen/ # Graphics with device sensors
└── core/                    # Shared components
    ├── error-boundary/
    ├── logger/
    └── safe-area-view/
```

## Technology Stack

- **React Native 0.79.5** with Expo modules support
- **Navigation**: React Navigation v6 (stack + bottom tabs)
- **State Management**: Redux Toolkit with persistence
- **Graphics**: React Native Skia for advanced animations
- **UI**: React Native Paper + React Native Reanimated
- **Performance**: Flash List for optimized lists
- **AI**: ExecuTorch for on-device inference (optional module)

## Development Workflow

1. Always install dependencies with `--legacy-peer-deps` flag
2. Run `npm run ios:pod-install` after enabling modules with native dependencies
3. Use module management commands to enable only needed features during development
4. The project uses patch-package for dependency modifications
5. Metro bundler cache issues can be resolved with refresh commands

## Architecture Deep Dive

### Metro Module Resolution System
- `metro.config.js`: Custom resolver intercepts missing modules and falls back to `NotFoundScreen`
- Enables graceful degradation when optional modules aren't linked
- Supports additional asset extensions (`.pte`, `.bin`) for AI model files

### Provider Stack Pattern
App.tsx implements a layered provider structure:
```
ErrorBoundary → Redux Provider → PersistGate → PaperProvider → SafeAreaProvider → Navigation
```

### Optional Screen Implementation Pattern
Each optional screen follows this lazy loading pattern:
```typescript
const Screen = lazy(() =>
  import('module-name').catch(() => ({
    default: () => <NotFoundScreen moduleName="module-name" />
  }))
);
```

### Redux Store Architecture
- Custom enhancers for validation and debugging
- Schema validation using TV4 for runtime action validation
- Redux persistence with automatic state rehydration
- Located in modular package: `modules/stores/redux-store/`

## Key Files to Understand

- `App.tsx`: Provider composition and app initialization
- `metro.config.js`: Custom module resolver enabling optional modules
- `src/tabs/examples-list-tab.tsx`: Main navigation structure for feature screens
- `src/screens/*-screen-opt.tsx`: Optional screen wrapper implementations
- `src/types/optional-modules.d.ts`: TypeScript declarations for dynamic modules
- `scripts/modules-setup.js`: Module linking/unlinking logic with npm local packages