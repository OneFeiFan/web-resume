#!/bin/bash
# Combined build: React at /, Vue at /vue/
set -e
rm -rf dist

echo "⚛ Building React..."
cd react && npm install --silent && npx vite build --outDir ../dist --base / && cd ..

echo "💚 Building Vue..."
cd vue && npm install --silent && npx vite build --outDir ../dist/vue --base /vue/ && cd ..

echo "✅ dist/ ready: React at /, Vue at /vue/"
