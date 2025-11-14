#!/bin/bash

# Bayarcash MCP Server Installation Script
# This script automates the installation for non-technical users

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Bayarcash MCP Server Installation Wizard              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Detect OS
OS="$(uname -s)"
case "$OS" in
    Linux*)     PLATFORM=Linux;;
    Darwin*)    PLATFORM=Mac;;
    CYGWIN*)    PLATFORM=Windows;;
    MINGW*)     PLATFORM=Windows;;
    *)          PLATFORM="UNKNOWN:${OS}"
esac

print_info "Detected platform: $PLATFORM"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "  Mac: brew install node"
    echo "  Windows: Download from https://nodejs.org"
    echo "  Linux: Use your package manager (apt, yum, etc.)"
    exit 1
fi

print_success "Node.js $(node --version) found"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed!"
    exit 1
fi

print_success "npm $(npm --version) found"
echo ""

# Prompt for AI client
echo "Which AI client do you want to configure?"
echo "  1) Claude Desktop (Recommended)"
echo "  2) Cursor"
echo "  3) Skip configuration (I'll do it manually)"
echo ""
read -p "Enter your choice (1-3): " CLIENT_CHOICE

# Prompt for credentials
echo ""
print_info "Enter your Bayarcash API credentials"
print_warning "You can find these at: https://console.bayar.cash"
echo ""

read -p "API Token: " API_TOKEN
read -p "API Secret Key: " API_SECRET_KEY

# Sandbox mode
echo ""
read -p "Use Sandbox mode? (recommended for testing) [Y/n]: " USE_SANDBOX
USE_SANDBOX=${USE_SANDBOX:-Y}

if [[ "$USE_SANDBOX" =~ ^[Yy]$ ]]; then
    SANDBOX="true"
else
    SANDBOX="false"
fi

# API Version
echo ""
read -p "API Version (v2 or v3) [v3]: " API_VERSION
API_VERSION=${API_VERSION:-v3}

# Get absolute path
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo ""
print_info "Installing dependencies..."
npm install

echo ""
print_info "Building the server..."
npm run build

print_success "Build completed!"
echo ""

# Configure based on client choice
case $CLIENT_CHOICE in
    1)
        # Claude Desktop
        if [ "$PLATFORM" = "Mac" ]; then
            CONFIG_DIR="$HOME/Library/Application Support/Claude"
        elif [ "$PLATFORM" = "Linux" ]; then
            CONFIG_DIR="$HOME/.config/Claude"
        else
            print_warning "Windows path may vary. Default: %APPDATA%/Claude"
            CONFIG_DIR="$APPDATA/Claude"
        fi

        CONFIG_FILE="$CONFIG_DIR/claude_desktop_config.json"

        echo ""
        print_info "Configuring Claude Desktop..."

        # Create directory if it doesn't exist
        mkdir -p "$CONFIG_DIR"

        # Check if config exists
        if [ -f "$CONFIG_FILE" ]; then
            print_warning "Config file already exists at: $CONFIG_FILE"
            read -p "Backup existing config and create new one? [Y/n]: " BACKUP
            BACKUP=${BACKUP:-Y}

            if [[ "$BACKUP" =~ ^[Yy]$ ]]; then
                cp "$CONFIG_FILE" "$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
                print_success "Backup created"
            fi
        fi

        # Create config
        cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["$SCRIPT_DIR/build/index.js"],
      "env": {
        "BAYARCASH_API_TOKEN": "$API_TOKEN",
        "BAYARCASH_API_SECRET_KEY": "$API_SECRET_KEY",
        "BAYARCASH_SANDBOX": "$SANDBOX",
        "BAYARCASH_API_VERSION": "$API_VERSION"
      }
    }
  }
}
EOF

        print_success "Claude Desktop configured!"
        print_info "Config saved to: $CONFIG_FILE"
        ;;

    2)
        # Cursor
        CONFIG_FILE=".cursor/mcp.json"

        echo ""
        print_info "Creating Cursor configuration..."

        mkdir -p .cursor

        cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["$SCRIPT_DIR/build/index.js"],
      "env": {
        "BAYARCASH_API_TOKEN": "$API_TOKEN",
        "BAYARCASH_API_SECRET_KEY": "$API_SECRET_KEY",
        "BAYARCASH_SANDBOX": "$SANDBOX",
        "BAYARCASH_API_VERSION": "$API_VERSION"
      }
    }
  }
}
EOF

        print_success "Cursor configuration created!"
        print_info "Config saved to: $CONFIG_FILE"
        print_warning "Copy this file to your project's .cursor directory"
        ;;

    3)
        print_info "Skipping automatic configuration"
        echo ""
        echo "Manual configuration:"
        echo "  Command: node"
        echo "  Args: [\"$SCRIPT_DIR/build/index.js\"]"
        echo "  Environment variables:"
        echo "    BAYARCASH_API_TOKEN=$API_TOKEN"
        echo "    BAYARCASH_API_SECRET_KEY=$API_SECRET_KEY"
        echo "    BAYARCASH_SANDBOX=$SANDBOX"
        echo "    BAYARCASH_API_VERSION=$API_VERSION"
        ;;
esac

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                 Installation Complete! 🎉                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
print_success "Bayarcash MCP Server is ready to use!"
echo ""
print_warning "Next steps:"
echo "  1. Restart your AI client completely"
echo "  2. Test with: 'Show me available payment portals from Bayarcash'"
echo ""
print_info "For help, see README.md or USAGE.md"
echo ""
