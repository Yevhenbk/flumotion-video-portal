/**
 * COMPONENTS - Atomic Design System
 * 
 * Complete component library organized following Atomic Design methodology.
 * This creates a scalable, maintainable, and consistent design system.
 * 
 * Atomic Design Hierarchy:
 * - Atoms: Basic building blocks (buttons, inputs, icons)
 * - Molecules: Simple combinations of atoms  
 * - Organisms: Complex combinations with specific purposes
 * - Templates: Page-level layouts combining organisms
 * - Pages: Complete interface instances with real content
 * 
 * Design Principles:
 * - Reusability: Components work in multiple contexts
 * - Composability: Higher-level components built from lower-level ones
 * - Consistency: Shared design patterns and behaviors
 * - Maintainability: Clear separation of concerns and responsibilities
 */

// ATOMS - Basic building blocks
export * from './atoms';

// MOLECULES - Simple combinations of atoms
export * from './molecules';

// ORGANISMS - Complex UI sections
export * from './organisms';

// Atomic design refactored components - maintain original design
// Main application component now available as organism
export { default as VideoPortalAtomic } from './organisms/VideoPortalAtomic';