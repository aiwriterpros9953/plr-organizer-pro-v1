#!/bin/bash
# Icon Generation Script for PLR Organizer Pro
# Run this on macOS/Linux to generate all icon formats

echo "PLR Organizer Pro - Icon Generator"
echo "===================================="
echo ""

if [ ! -f "build/icon.png" ]; then
    echo "Error: build/icon.png not found!"
    exit 1
fi

echo "Generating icons..."

# Windows
if command -v convert &> /dev/null; then
    convert build/icon.png -define icon:auto-resize=256,128,96,64,48,32,16 build/icon.ico
    echo "✓ icon.ico created"
fi

# macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    mkdir -p build/icon.iconset
    sips -z 16 16     build/icon.png --out build/icon.iconset/icon_16x16.png > /dev/null 2>&1
    sips -z 32 32     build/icon.png --out build/icon.iconset/icon_16x16@2x.png > /dev/null 2>&1
    sips -z 32 32     build/icon.png --out build/icon.iconset/icon_32x32.png > /dev/null 2>&1
    sips -z 64 64     build/icon.png --out build/icon.iconset/icon_32x32@2x.png > /dev/null 2>&1
    sips -z 128 128   build/icon.png --out build/icon.iconset/icon_128x128.png > /dev/null 2>&1
    sips -z 256 256   build/icon.png --out build/icon.iconset/icon_128x128@2x.png > /dev/null 2>&1
    sips -z 256 256   build/icon.png --out build/icon.iconset/icon_256x256.png > /dev/null 2>&1
    sips -z 512 512   build/icon.png --out build/icon.iconset/icon_256x256@2x.png > /dev/null 2>&1
    sips -z 512 512   build/icon.png --out build/icon.iconset/icon_512x512.png > /dev/null 2>&1
    sips -z 1024 1024 build/icon.png --out build/icon.iconset/icon_512x512@2x.png > /dev/null 2>&1
    iconutil -c icns build/icon.iconset -o build/icon.icns
    rm -rf build/icon.iconset
    echo "✓ icon.icns created"
fi

echo "Done!"
