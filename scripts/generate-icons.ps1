# PLR Organizer Pro - Icon Generator (Windows PowerShell)
# This script helps generate icons on Windows

Write-Host "PLR Organizer Pro - Icon Generator" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if icon.png exists
if (-not (Test-Path "build\icon.png")) {
    Write-Host "Error: build\icon.png not found!" -ForegroundColor Red
    Write-Host "Please place a 1024x1024 PNG icon in the build\ directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "Source icon found: build\icon.png" -ForegroundColor Green
Write-Host ""

# Check for ImageMagick
$hasMagick = $null -ne (Get-Command convert -ErrorAction SilentlyContinue) -or 
             $null -ne (Get-Command magick -ErrorAction SilentlyContinue)

if ($hasMagick) {
    Write-Host "Creating Windows icon (icon.ico)..." -ForegroundColor Yellow
    
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        magick convert build\icon.png -define icon:auto-resize=256,128,96,64,48,32,16 build\icon.ico
    } else {
        convert build\icon.png -define icon:auto-resize=256,128,96,64,48,32,16 build\icon.ico
    }
    
    if (Test-Path "build\icon.ico") {
        Write-Host "✓ icon.ico created successfully!" -ForegroundColor Green
    }
} else {
    Write-Host "ImageMagick not found." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please install ImageMagick or use an online converter:" -ForegroundColor White
    Write-Host "  1. Go to: https://icoconvert.com/" -ForegroundColor Cyan
    Write-Host "  2. Upload build\icon.png" -ForegroundColor Cyan
    Write-Host "  3. Download as icon.ico" -ForegroundColor Cyan
    Write-Host "  4. Place in build\ directory" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To install ImageMagick:" -ForegroundColor White
    Write-Host "  Download from: https://imagemagick.org/script/download.php#windows" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "For macOS icon (.icns):" -ForegroundColor Yellow
Write-Host "  1. Go to: https://cloudconvert.com/png-to-icns" -ForegroundColor Cyan
Write-Host "  2. Upload build\icon.png" -ForegroundColor Cyan
Write-Host "  3. Download as icon.icns" -ForegroundColor Cyan
Write-Host "  4. Place in build\ directory" -ForegroundColor Cyan

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Current icon files:" -ForegroundColor White
Write-Host ""

$icons = @{
    "icon.png"  = "Linux"
    "icon.ico"  = "Windows"
    "icon.icns" = "macOS"
}

foreach ($icon in $icons.Keys) {
    $path = "build\$icon"
    $status = if (Test-Path $path) { "✓" } else { "✗" }
    $color = if (Test-Path $path) { "Green" } else { "Red" }
    Write-Host "  [$status] $icon ($($icons[$icon]))" -ForegroundColor $color
}

Write-Host ""
if ((Test-Path "build\icon.png") -and (Test-Path "build\icon.ico") -and (Test-Path "build\icon.icns")) {
    Write-Host "All icons ready! You can now build your Electron app." -ForegroundColor Green
} else {
    Write-Host "Some icons are missing. Please generate them before building." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"
