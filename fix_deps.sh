#!/bin/bash

echo "📦 Installing missing dependencies..."

# Install lucide-react
npm install lucide-react

# Verify installation
if [ -d "node_modules/lucide-react" ]; then
    echo "✅ lucide-react installed successfully"
else
    echo "❌ Failed to install lucide-react"
    echo "Trying with legacy peer deps..."
    npm install lucide-react --legacy-peer-deps
fi

# Clear Next.js cache
echo "🧹 Clearing cache..."
rm -rf .next

# Start dev server
echo "🚀 Starting development server..."
npm run dev
