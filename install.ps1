# Bayarcash MCP Server Installation Script for Windows
# PowerShell script for non-technical users

$ErrorActionPreference = "Stop"

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     Bayarcash MCP Server Installation Wizard              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

function Write-Success {
    param($Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Error-Custom {
    param($Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

function Write-Warning-Custom {
    param($Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

Write-Info "Detected platform: Windows"
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Success "Node.js $nodeVersion found"
} catch {
    Write-Error-Custom "Node.js is not installed!"
    Write-Host ""
    Write-Host "Please install Node.js first from: https://nodejs.org"
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Success "npm $npmVersion found"
} catch {
    Write-Error-Custom "npm is not installed!"
    exit 1
}

Write-Host ""

# Prompt for AI client
Write-Host "Which AI client do you want to configure?"
Write-Host "  1) Claude Desktop (Recommended)"
Write-Host "  2) Cursor"
Write-Host "  3) Skip configuration (I'll do it manually)"
Write-Host ""
$clientChoice = Read-Host "Enter your choice (1-3)"

# Prompt for credentials
Write-Host ""
Write-Info "Enter your Bayarcash API credentials"
Write-Warning-Custom "You can find these at: https://console.bayar.cash"
Write-Host ""

$apiToken = Read-Host "API Token"
$apiSecretKey = Read-Host "API Secret Key"

# Sandbox mode
Write-Host ""
$useSandbox = Read-Host "Use Sandbox mode? (recommended for testing) [Y/n]"
if ([string]::IsNullOrEmpty($useSandbox) -or $useSandbox -eq "Y" -or $useSandbox -eq "y") {
    $sandbox = "true"
} else {
    $sandbox = "false"
}

# API Version
Write-Host ""
$apiVersion = Read-Host "API Version (v2 or v3) [v3]"
if ([string]::IsNullOrEmpty($apiVersion)) {
    $apiVersion = "v3"
}

# Get absolute path
$scriptDir = $PSScriptRoot

Write-Host ""
Write-Info "Installing dependencies..."
npm install

Write-Host ""
Write-Info "Building the server..."
npm run build

Write-Success "Build completed!"
Write-Host ""

# Configure based on client choice
switch ($clientChoice) {
    "1" {
        # Claude Desktop
        $configDir = "$env:APPDATA\Claude"
        $configFile = "$configDir\claude_desktop_config.json"

        Write-Host ""
        Write-Info "Configuring Claude Desktop..."

        # Create directory if it doesn't exist
        if (!(Test-Path $configDir)) {
            New-Item -ItemType Directory -Path $configDir -Force | Out-Null
        }

        # Check if config exists
        if (Test-Path $configFile) {
            Write-Warning-Custom "Config file already exists at: $configFile"
            $backup = Read-Host "Backup existing config and create new one? [Y/n]"

            if ([string]::IsNullOrEmpty($backup) -or $backup -eq "Y" -or $backup -eq "y") {
                $backupFile = "$configFile.backup.$(Get-Date -Format 'yyyyMMdd_HHmmss')"
                Copy-Item $configFile $backupFile
                Write-Success "Backup created at: $backupFile"
            }
        }

        # Create config
        $buildPath = "$scriptDir\build\index.js" -replace '\\', '/'

        $config = @{
            mcpServers = @{
                bayarcash = @{
                    command = "node"
                    args = @($buildPath)
                    env = @{
                        BAYARCASH_API_TOKEN = $apiToken
                        BAYARCASH_API_SECRET_KEY = $apiSecretKey
                        BAYARCASH_SANDBOX = $sandbox
                        BAYARCASH_API_VERSION = $apiVersion
                    }
                }
            }
        }

        $config | ConvertTo-Json -Depth 10 | Set-Content $configFile

        Write-Success "Claude Desktop configured!"
        Write-Info "Config saved to: $configFile"
    }

    "2" {
        # Cursor
        $configDir = ".cursor"
        $configFile = "$configDir\mcp.json"

        Write-Host ""
        Write-Info "Creating Cursor configuration..."

        if (!(Test-Path $configDir)) {
            New-Item -ItemType Directory -Path $configDir -Force | Out-Null
        }

        $buildPath = "$scriptDir\build\index.js" -replace '\\', '/'

        $config = @{
            mcpServers = @{
                bayarcash = @{
                    command = "node"
                    args = @($buildPath)
                    env = @{
                        BAYARCASH_API_TOKEN = $apiToken
                        BAYARCASH_API_SECRET_KEY = $apiSecretKey
                        BAYARCASH_SANDBOX = $sandbox
                        BAYARCASH_API_VERSION = $apiVersion
                    }
                }
            }
        }

        $config | ConvertTo-Json -Depth 10 | Set-Content $configFile

        Write-Success "Cursor configuration created!"
        Write-Info "Config saved to: $configFile"
        Write-Warning-Custom "Copy this file to your project's .cursor directory"
    }

    "3" {
        Write-Info "Skipping automatic configuration"
        Write-Host ""
        Write-Host "Manual configuration:"
        Write-Host "  Command: node"
        Write-Host "  Args: ['$scriptDir\build\index.js']"
        Write-Host "  Environment variables:"
        Write-Host "    BAYARCASH_API_TOKEN=$apiToken"
        Write-Host "    BAYARCASH_API_SECRET_KEY=$apiSecretKey"
        Write-Host "    BAYARCASH_SANDBOX=$sandbox"
        Write-Host "    BAYARCASH_API_VERSION=$apiVersion"
    }
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                 Installation Complete! 🎉                 ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Success "Bayarcash MCP Server is ready to use!"
Write-Host ""
Write-Warning-Custom "Next steps:"
Write-Host "  1. Restart your AI client completely"
Write-Host "  2. Test with: 'Show me available payment portals from Bayarcash'"
Write-Host ""
Write-Info "For help, see README.md or USAGE.md"
Write-Host ""
