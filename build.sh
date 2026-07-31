#!/bin/bash
# 合并构建脚本：构建 React + Vue 版本并合并到 dist/
# 用于 Gitee Pages 单仓库部署两个版本
set -e

echo "🧹 Cleaning..."
rm -rf dist

echo "⚛  Building React version..."
cd react
npm install --silent
npx vite build --outDir ../dist/react --base /react/
cd ..

echo "💚 Building Vue version..."
cd vue
npm install --silent
npx vite build --outDir ../dist/vue --base /vue/
cd ..

echo "📄 Copying landing page..."
cp index.html dist/

echo ""
echo "✅ Build complete! Structure:"
echo "   dist/"
echo "   ├── index.html        (landing page)"
echo "   ├── react/            (React version)"
echo "   └── vue/              (Vue version)"
echo ""
echo "🚀 Deploy: push dist/ to pages branch"
