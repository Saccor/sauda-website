# Lib

## Files
- **utils.ts**
  - **Imports:** [clsx, type ClassValue from clsx, twMerge from tailwind-merge]
  - **Exports:** [cn]
  - **LOC:** 20

- **social-media.ts**
  - **LOC:** 309
  - **Note:** Large utility file for social media functionality

- **error-handling.ts**
  - **LOC:** 53
  - **Note:** Error handling utilities

## Directories
- **utils/** - Utility functions
- **supabase/** - Supabase client and utilities
- **shopify/** - Shopify integration
- **cart/** - Shopping cart functionality

## Unused or Over-complex
- **social-media.ts** is > 50 LOC (309 lines)
- No unused imports detected
- No functions with > 5 parameters found

## Summary
- Total files: 3
- Total directories: 4
- Potential cleanup items: 1 (social-media.ts could be split into smaller modules) 