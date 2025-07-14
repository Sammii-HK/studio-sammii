#!/bin/bash

# Start development servers for Studio Sammii
echo "🚀 Starting Studio Sammii Development Servers..."

# Kill any existing processes on ports 8000 and 9000
echo "🔄 Cleaning up existing processes..."
lsof -ti:8000,9000 | xargs kill -9 2>/dev/null || true
sleep 2

# Check if directories exist
if [ ! -d "studio-sammii-v2" ]; then
    echo "❌ Error: studio-sammii-v2 directory not found"
    exit 1
fi

if [ ! -d "studio-sammii-v2-storefront" ]; then
    echo "❌ Error: studio-sammii-v2-storefront directory not found"
    exit 1
fi

# Start the backend and frontend in parallel
echo "🏗️  Starting Medusa Backend on port 9000..."
echo "🌐 Starting Next.js Storefront on port 8000..."
echo ""
echo "Backend Admin: http://localhost:9000/app"
echo "Frontend Store: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Use concurrently to run both processes
npx concurrently \
  --names "BACKEND,FRONTEND" \
  --prefix-colors "blue,green" \
  "cd studio-sammii-v2 && npm run dev" \
  "cd studio-sammii-v2-storefront && npm run dev" 