#!/bin/bash

echo "=========================================="
echo "NestFinder - Complete Setup Script"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📦 Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

# Check if Python is installed
echo ""
echo "🐍 Checking Python installation..."
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✅ Python version: $(python3 --version)${NC}"
else
    echo -e "${RED}❌ Python not found. Please install Python 3.9+${NC}"
    exit 1
fi

# Install Node.js dependencies
echo ""
echo "📦 Installing Node.js dependencies..."
npm install

# Install Python dependencies if venv exists
echo ""
echo "🐍 Installing Python dependencies..."
if [ -d "venv" ]; then
    source venv/bin/activate
    pip install -r requirements.txt
    echo -e "${GREEN}✅ Python dependencies installed in venv${NC}"
else
    echo -e "${YELLOW}⚠️ No venv found. Creating one...${NC}"
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    echo -e "${GREEN}✅ Created venv and installed dependencies${NC}"
fi

# Create .env.local if not exists
echo ""
echo "🔧 Creating environment files..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'ENV'
# MongoDB Connection
MONGODB_URI=mongodb://admin:NestFinder2024@localhost:27017/nestfinder?authSource=admin

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# JWT
JWT_SECRET=your-jwt-secret-key

# Admin Credentials
ADMIN_EMAIL=admin@nestfinder.com
ADMIN_PASSWORD=Admin@2024

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
ENV
    echo -e "${GREEN}✅ Created .env.local file${NC}"
else
    echo -e "${YELLOW}⚠️ .env.local already exists${NC}"
fi

# Create necessary directories
echo ""
echo "📁 Creating necessary directories..."
mkdir -p app/admin/properties app/admin/users app/admin/bookings app/admin/revenue app/admin/settings
mkdir -p components/admin components/common components/home components/property
mkdir -p lib/models lib/mongodb
mkdir -p scripts
mkdir -p public/images
mkdir -p logs

echo -e "${GREEN}✅ All directories created${NC}"

# Build the application
echo ""
echo "🏗️ Building Next.js application..."
npm run build

# Seed the database if MongoDB is running
echo ""
echo "💾 Checking MongoDB connection..."
if docker ps | grep -q mongodb; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
    echo "Seeding database..."
    npm run seed
else
    echo -e "${YELLOW}⚠️ MongoDB not running. Start it with: docker start mongodb${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "Admin Login:"
echo "  URL: http://localhost:3000/admin"
echo "  Email: admin@nestfinder.com"
echo "  Password: Admin@2024"
echo ""
echo "Customer Login:"
echo "  URL: http://localhost:3000/login"
echo ""
