#!/bin/bash
# Combined build: React at /, Vue at /vue/
set -e
rm -rf dist

echo "⚛ Building React..."
cd react && npm install --silent && npx vite build --outDir ../dist/react && cd ..

echo "💚 Building Vue..."
cd vue && npm install --silent && npx vite build --outDir ../dist/vue && cd ..

# Preserve root landing page
cp index.html dist/

echo "✅ dist/ ready: Landing at /, React at /react/, Vue at /vue/"
