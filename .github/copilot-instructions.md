# AutomationApp - Copilot Instructions

## Project Overview
Modern Angular application (v20+) with SSR support, using latest features: standalone components, signals, zoneless change detection, and new control flow syntax.

## Architecture & Key Patterns

### Standalone Components & Modern Angular
- **All components are standalone** - no NgModules, explicit imports in component decorators
- **Zoneless change detection** configured in [app.config.ts](src/app/app.config.ts) - use signals for reactive state
- **New control flow syntax** - use `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`
- **Functional interceptors** - use `HttpInterceptorFn` pattern like [auth.interceptor.ts](src/app/core/interceptors/auth.interceptor.ts)

### State Management with Signals
Services use Angular signals for reactive state management (see [AuthService](src/app/core/services/auth.service.ts)):
```typescript
private currentUserSignal = signal<User | null>(null);
readonly currentUser = computed(() => this.currentUserSignal());
```

### Routing & Lazy Loading
- Feature modules use `loadChildren` with dynamic imports to `.routes.ts` files
- Routes defined in separate files: `feature-name.routes.ts`
- Components lazy loaded with `loadComponent` for error pages

### Component Architecture
- **Shared components** follow variant/size pattern - see [ButtonComponent](src/app/shared/components/button/button.component.ts)
- **Barrel exports** throughout - import from index files (`./core`, `./shared`)
- **OnPush change detection** as default strategy
- **Composition pattern** for complex pages like [LandingPageComponent](src/app/features/landing/landing-page.component.ts)

### HTTP & Interceptors Chain
Configured interceptors in [app.config.ts](src/app/app.config.ts): `authInterceptor` → `errorInterceptor` → `loadingInterceptor`
- **Token refresh pattern** with BehaviorSubject for concurrent requests
- **Skip URL patterns** for public endpoints in auth interceptor

## Development Workflow
- **Start dev server**: `npm start` (uses `ng serve`)
- **Build**: `npm run build` 
- **SSR build**: `npm run serve:ssr:automation-app`
- **Testing**: `npm test` (Karma)

## Key Conventions
- **Component selectors**: `app-` prefix
- **File structure**: component files include `.component.ts`, template inline for simple components
- **Styling**: SCSS with shared variables in `src/styles/`
- **Models**: TypeScript interfaces in `core/models/`
- **Barrel exports**: Always export from `index.ts` files for clean imports
