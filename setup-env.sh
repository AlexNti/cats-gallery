echo "Cat Lovers Gallery Environment Setup"
echo "=================================="

if [ -f ".env.local" ]; then
    echo ".env.local file already exists. Skipping setup."
    exit 0
fi

NEXT_PUBLIC_API_URL="https://api.thecatapi.com"
NEXT_PUBLIC_API_VERSION="v1"

echo "Setting up environment variables..."

echo "Please enter your Cat API key:"
echo "You can get a free API key from: https://thecatapi.com/"
read -p "NEXT_PUBLIC_API_KEY: " NEXT_PUBLIC_API_KEY

if [ -z "$NEXT_PUBLIC_API_KEY" ]; then
    echo "Error: API key cannot be empty!"
    exit 1
fi

cat > .env.local << EOF
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
NEXT_PUBLIC_API_VERSION=${NEXT_PUBLIC_API_VERSION}
NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}
EOF

echo ".env.local file created successfully!"
echo "You can now run: npm run dev" 