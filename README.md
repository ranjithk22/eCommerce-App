# Packages Used

# Tailwind
npm install tailwindcss @tailwindcss/vite

vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

Import Tailwind CSS
Add an @import to your CSS file that imports Tailwind CSS.

CSS
@import "tailwindcss";