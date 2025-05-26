# Packages Used


========================================================================

## Package 1 - Redux
npm install @reduxjs/toolkit react-redux

========================================================================
## Package 2 - Tailwind CSS
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

## Package 3 - Axios
npm install axios

========================================================================

## Package 4 - React Router Dom
npm install react-router-dom

========================================================================


## JWT used from 

https://fakeapi.platzi.com/en/rest/auth-jwt/
{
  "email": "john@mail.com",
  "password": "changeme"
}

========================================================================

