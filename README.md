# Design + IT portfolio (React, Three.js, Vercel)

## Run locally
    npm install
    npm run dev

## Add your video
Copy your file to `public/hero.mp4` (H.264, muted, under ~8 MB). It plays on a curved 3D screen
that rotates with scroll and mouse. Without it, an animated placeholder shows.

## Deploy to Vercel
    git init && git add . && git commit -m "Portfolio"
    # create an empty repo on GitHub, then:
    git remote add origin https://github.com/YOU/portfolio.git
    git push -u origin main
Then open vercel.com/new, import the repo, keep the Vite defaults, and click Deploy.
(Or: `npm i -g vercel && vercel --prod`.)
