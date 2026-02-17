# Angular Project - Copilot Instructions

## Project Overview
This is an enterprise-grade Angular application following industry-standard architecture patterns.

## Project Structure
```
src/
├── app/
│   ├── core/                 # Singleton services, guards, interceptors
│   │   ├── services/         # Application-wide services
│   │   ├── guards/           # Route guards
│   │   ├── interceptors/     # HTTP interceptors
│   │   ├── models/           # TypeScript interfaces and models
│   │   └── core.module.ts
│   ├── shared/               # Reusable components, directives, pipes
│   │   ├── components/       # Shared UI components
│   │   ├── directives/       # Custom directives
│   │   ├── pipes/            # Custom pipes
│   │   └── shared.module.ts
│   ├── layout/               # Application layout components
│   │   ├── header/
│   │   ├── footer/
│   │   ├── sidebar/
│   │   └── layout.module.ts
│   ├── features/             # Feature modules (lazy loaded)
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── ...
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _base.scss
│   └── styles.scss
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

## Coding Standards
- Use standalone components (Angular 17+)
- Implement lazy loading for feature modules
- Follow single responsibility principle
- Use TypeScript strict mode
- Implement proper error handling
- Use reactive forms for complex forms
- Follow BEM naming convention for CSS

## Component Guidelines
- Each feature should have multiple focused components
- Smart (container) vs Dumb (presentational) component pattern
- Use OnPush change detection where possible
- Implement proper lifecycle hooks

## Service Guidelines
- Services should be providedIn: 'root' for singletons
- Use proper error handling with RxJS operators
- Implement loading states
- Use TypeScript interfaces for API responses
