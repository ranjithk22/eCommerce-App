# Packages Used

========================================================================
## Package 1 - Tailwind CSS
npm install tailwindcss @tailwindcss/vite

=> Add => vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

=> Add =>  Import Tailwind CSS
Add an @import to your CSS file that imports Tailwind CSS.

=> Add => CSS
&#64;import "tailwindcss";

========================================================================