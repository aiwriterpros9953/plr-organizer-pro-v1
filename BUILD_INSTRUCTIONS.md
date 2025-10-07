# PLR Organizer Pro - Build Instructions

## Prerequisites

Before building the Electron desktop application, you need:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **npm** or **yarn** package manager
3. **Git** - [Download](https://git-scm.com/)

### Platform-Specific Requirements

#### Windows
- Windows 10 or later
- No additional requirements

#### macOS
- macOS 10.14 (Mojave) or later
- Xcode Command Line Tools: `xcode-select --install`
- For code signing (optional):
  - Apple Developer Account
  - Valid Developer ID certificate

#### Linux
- Ubuntu 18.04+ / Fedora 32+ or equivalent
- Additional packages:
  ```bash
  sudo apt-get install -y libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2
  ```

## Icon Files

The app requires three icon formats in the `build/` directory:

1. **icon.png** - 512x512 or 1024x1024 PNG (for Linux)
2. **icon.ico** - Multi-resolution ICO file (for Windows)
3. **icon.icns** - Multi-resolution ICNS file (for macOS)

### Creating Icon Files

#### From PNG to ICO (Windows):
Use online tools like [icoconvert.com](https://icoconvert.com/) or:
```bash
# Using ImageMagick
convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico
```

#### From PNG to ICNS (macOS):
```bash
# Create iconset directory
mkdir icon.iconset

# Create required sizes
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png

# Convert to ICNS
iconutil -c icns icon.iconset -o build/icon.icns

# Clean up
rm -rf icon.iconset
```

Or use online tools like [cloudconvert.com](https://cloudconvert.com/png-to-icns)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/smarthome9953/plr-organizer-pro-v1.git
cd plr-organizer-pro-v1
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Development

Run the app in development mode:

```bash
npm run electron:dev
# or
yarn electron:dev
```

This will:
1. Start the Vite dev server
2. Compile Electron TypeScript files
3. Launch the Electron app with hot-reload

## Building for Production

### Build for Current Platform

```bash
npm run electron:build
# or
yarn electron:build
```

### Build for Specific Platforms

**Windows:**
```bash
npm run electron:build:win
```

**macOS:**
```bash
npm run electron:build:mac
```

**Linux:**
```bash
npm run electron:build:linux
```

### Build for All Platforms

```bash
npm run electron:build:all
```

⚠️ **Note:** Building for macOS requires a Mac. Building for other platforms from different OSes may have limitations.

## Output

Built applications will be in `dist-electron-output/`:

- **Windows**: 
  - `PLR Organizer Pro-Setup-{version}.exe` (installer)
  - `PLR Organizer Pro-Portable-{version}.exe` (portable)
  
- **macOS**: 
  - `PLR Organizer Pro-{version}-x64.dmg` (Intel)
  - `PLR Organizer Pro-{version}-arm64.dmg` (Apple Silicon)
  - `PLR Organizer Pro-{version}-x64.zip`
  - `PLR Organizer Pro-{version}-arm64.zip`
  
- **Linux**: 
  - `PLR Organizer Pro-{version}.AppImage`
  - `PLR Organizer Pro-{version}.deb`
  - `PLR Organizer Pro-{version}.rpm`

## Publishing Releases

### GitHub Releases (Recommended)

1. **Create a GitHub Release:**
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Tag version (e.g., `v1.0.0`)
   - Add release notes
   - Upload the built installers

2. **Automatic Updates:**
   - The app checks for updates via GitHub releases
   - Configured in `electron-builder.json` publish section
   - Users get automatic update notifications

### Manual Distribution

Upload installers to your own server and update download links in:
- `src/pages/DownloadApp.tsx` (download links)

## Code Signing (Production)

### Windows

1. Get a code signing certificate from a CA (DigiCert, Sectigo, etc.)
2. Set environment variables:
```bash
set CSC_LINK=path/to/certificate.pfx
set CSC_KEY_PASSWORD=your-certificate-password
```

### macOS

1. Get Apple Developer ID certificate
2. Set environment variables:
```bash
export CSC_LINK=path/to/certificate.p12
export CSC_KEY_PASSWORD=your-certificate-password
export APPLE_ID=your-apple-id@email.com
export APPLE_ID_PASSWORD=app-specific-password
```

3. For notarization, configure `build/notarize.js`

### Linux

No code signing required, but you can sign packages:
```bash
dpkg-sig --sign builder your-package.deb
```

## Troubleshooting

### Build Fails with "Cannot find module"

```bash
# Clean and reinstall
rm -rf node_modules dist dist-electron dist-electron-output
npm install
```

### Windows: "electron-builder.exe is not recognized"

```bash
# Install electron-builder globally
npm install -g electron-builder
```

### macOS: "App is damaged and can't be opened"

User needs to run:
```bash
xattr -cr "/Applications/PLR Organizer Pro.app"
```

Or distribute via signed DMG with notarization.

### Linux: AppImage won't run

```bash
# Make executable
chmod +x "PLR Organizer Pro-1.0.0.AppImage"
```

## Environment Variables

Create `.env` file in root:

```env
# Supabase (if using)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key

# GitHub (for auto-updates)
GH_TOKEN=your-github-token

# Code Signing (optional)
CSC_LINK=path/to/cert
CSC_KEY_PASSWORD=password
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build Electron App

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm install
      
      - name: Build Electron app
        run: npm run electron:build
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: dist-electron-output/*
```

## Support

For issues or questions:
- Email: support@plrorganizerpro.com
- GitHub Issues: https://github.com/smarthome9953/plr-organizer-pro-v1/issues

## License

Proprietary - All rights reserved
