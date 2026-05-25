#!/bin/bash

echo "======================================"
echo "🔍 NESTFINDER ERROR ANALYSIS"
echo "======================================"
echo "Project: $(pwd)"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check Critical Files
echo "📂 CHECKING CRITICAL FILES..."
files=("package.json" "tsconfig.json" "next.config.js" "tailwind.config.js" "app/layout.tsx" "app/page.tsx")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file - MISSING"
    fi
done

# 2. Check package.json validity
echo ""
echo "📦 CHECKING package.json..."
if [ -f "package.json" ]; then
    if python3 -c "import json; json.load(open('package.json'))" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} package.json is valid JSON"
    else
        echo -e "${RED}❌${NC} package.json has syntax errors"
    fi
else
    echo -e "${RED}❌${NC} package.json not found"
fi

# 3. Check node_modules
echo ""
echo "📚 CHECKING DEPENDENCIES..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅${NC} node_modules exists"
    COUNT=$(ls node_modules | wc -l)
    echo "   📦 $COUNT packages installed"
else
    echo -e "${RED}❌${NC} node_modules missing - Run: npm install"
fi

# 4. Check Next.js build
echo ""
echo "🏗️ TESTING NEXT.JS BUILD..."
if [ -d "node_modules" ]; then
    BUILD_OUTPUT=$(npm run build 2>&1)
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅${NC} Build successful"
    else
        echo -e "${RED}❌${NC} Build failed"
        echo "$BUILD_OUTPUT" | grep -i "error" | head -5 | sed 's/^/   /'
    fi
else
    echo -e "${YELLOW}⚠️${NC} Skipping build test (dependencies not installed)"
fi

# 5. Check TypeScript errors
echo ""
echo "🔷 CHECKING TYPESCRIPT..."
if command -v npx &> /dev/null && [ -d "node_modules" ]; then
    TS_OUTPUT=$(npx tsc --noEmit 2>&1)
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅${NC} TypeScript check passed"
    else
        echo -e "${RED}❌${NC} TypeScript errors found:"
        echo "$TS_OUTPUT" | grep "error TS" | head -5 | sed 's/^/   /'
    fi
else
    echo -e "${YELLOW}⚠️${NC} TypeScript check skipped"
fi

# 6. Check for missing components
echo ""
echo "🧩 CHECKING COMPONENTS..."
required_components=("Button" "Card" "Input" "Navbar" "HeroSection" "PropertyCard")
for comp in "${required_components[@]}"; do
    if grep -r "export default.*$comp" components/ 2>/dev/null | grep -q "$comp"; then
        echo -e "${GREEN}✅${NC} $comp component found"
    else
        echo -e "${RED}❌${NC} $comp component missing"
    fi
done

# 7. Check port 3000
echo ""
echo "🌐 CHECKING PORT 3000..."
if command -v lsof &> /dev/null; then
    if lsof -i:3000 > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️${NC} Port 3000 is in use"
        echo "   Kill with: kill -9 \$(lsof -t -i:3000)"
    else
        echo -e "${GREEN}✅${NC} Port 3000 is available"
    fi
else
    echo -e "${YELLOW}⚠️${NC} lsof not installed"
fi

# 8. Check for common errors in code
echo ""
echo "🐛 CHECKING FOR COMMON ERRORS..."
# Check for missing imports
if grep -r "from '\.\./" app/ components/ 2>/dev/null | grep -v "from '\.\./\.\./" | head -3; then
    echo -e "${YELLOW}⚠️${NC} Possible incorrect import paths found"
fi

# Check for unused variables
if grep -r "const.*=.*useState" app/ components/ 2>/dev/null | grep -v "," | head -3; then
    echo -e "${YELLOW}⚠️${NC} Check for unused state variables"
fi

# 9. Summary
echo ""
echo "======================================"
echo "📊 SUMMARY"
echo "======================================"

# Count errors
ERROR_COUNT=$(find . -name "*.tsx" -o -name "*.ts" | xargs grep -l "error" 2>/dev/null | wc -l)
echo "Potential issues found: $ERROR_COUNT"

echo ""
echo "💡 RECOMMENDED ACTIONS:"
echo "   1. npm install"
echo "   2. rm -rf .next"
echo "   3. npm run dev"
echo ""

