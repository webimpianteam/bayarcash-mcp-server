# Bayarcash MCP Server

A Model Context Protocol (MCP) server for Bayarcash payment gateway integration. This server enables AI assistants like Claude, ChatGPT, and Cursor to interact with the Bayarcash API for payment processing, transaction management, and payment gateway operations.

[![npm version](https://badge.fury.io/js/@webimpian%2Fbayarcash-mcp-server.svg)](https://www.npmjs.com/package/@webimpian/bayarcash-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

**For Non-Technical Users:** See [EASY_INSTALL.md](EASY_INSTALL.md) for a step-by-step guide with pictures!

**For Developers:** Choose your preferred installation method below.

## Features

### Tools
- **create_payment_intent** - Create new payment intents
- **get_payment_intent** - Retrieve payment intent details
- **get_transaction** - Get transaction by ID
- **get_transaction_by_order** - Get transaction by order number
- **list_transactions** - List transactions with filters (status, channel, email, etc.)
- **get_portals** - List available payment portals
- **get_payment_channels** - Get payment channels for portals
- **get_fpx_banks** - List FPX banks for online banking
- **verify_callback** - Verify webhook callback data
- **create_fpx_direct_debit_enrollment** - Create FPX Direct Debit enrollment

### Resources
- **bayarcash://portals** - Available payment portals
- **bayarcash://channels** - Payment channels
- **bayarcash://fpx-banks** - FPX banks list

## Installation Methods

### Method 1: Automated Installer (Easiest!)

**Mac/Linux:**
```bash
git clone https://github.com/khairulimran-97/bayarcash-mcp-server.git
cd bayarcash-mcp-server
./install.sh
```

**Windows:**
```powershell
git clone https://github.com/khairulimran-97/bayarcash-mcp-server.git
cd bayarcash-mcp-server
.\install.ps1
```

The installer wizard will:
- Install all dependencies
- Build the server
- Configure your AI client automatically
- Guide you through setup step-by-step

### Method 2: NPX (No Download Required!)

If published to NPM, configure your AI client with:

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "npx",
      "args": ["-y", "@webimpian/bayarcash-mcp-server"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_token",
        "BAYARCASH_API_SECRET_KEY": "your_secret",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

### Method 3: Smithery (Coming Soon)

```bash
smithery install bayarcash-mcp-server
```

### Method 4: Manual Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bayarcash-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Bayarcash credentials:
```bash
cp .env.example .env
```

4. Edit `.env` and add your credentials:
```env
BAYARCASH_API_TOKEN=your_api_token_here
BAYARCASH_API_SECRET_KEY=your_api_secret_key_here
BAYARCASH_SANDBOX=true
BAYARCASH_API_VERSION=v3
```

5. Build the project:
```bash
npm run build
```

## Configuration

### For Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["/absolute/path/to/bayarcash-mcp-server/build/index.js"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_api_token",
        "BAYARCASH_API_SECRET_KEY": "your_api_secret_key",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

### For Cursor

Add to Cursor settings (`.cursor/mcp.json` or through Settings UI):

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["/absolute/path/to/bayarcash-mcp-server/build/index.js"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_api_token",
        "BAYARCASH_API_SECRET_KEY": "your_api_secret_key",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

### For Other MCP Clients

Follow your client's documentation for adding MCP servers. You'll need:
- **Command**: `node`
- **Args**: `["/absolute/path/to/bayarcash-mcp-server/build/index.js"]`
- **Environment variables**: See `.env.example`

## Usage Examples

### Create a Payment Intent

```
Create a payment intent for order #12345, amount RM 100.50,
payer email: customer@example.com, name: John Doe,
description: Product Purchase, portal key: your_portal_key
```

### List Transactions

```
List all successful transactions from today
```

### Get FPX Banks

```
Show me the list of available FPX banks for online banking
```

### Verify Webhook Callback

```
Verify this callback data with checksum: [callback data]
```

## API Version Support

This server supports both Bayarcash API v2 and v3. Set the version using the `BAYARCASH_API_VERSION` environment variable.

## Payment Channels Supported

- FPX Online Banking
- FPX Direct Debit
- DuitNow
- E-wallets (Boost, GrabPay, ShopeePay, TouchNGo)
- International (Alipay, WeChat Pay)
- Credit Cards
- Manual Bank Transfers
- And more...

## Security

- API credentials are never exposed to the AI client
- All communication uses secure HTTPS
- Checksums are automatically generated for payment intents
- Callback verification ensures webhook authenticity
- Sandbox mode enabled by default for testing

## Development

### Build
```bash
npm run build
```

### Run
```bash
npm start
```

### Development Mode
```bash
npm run dev
```

## Troubleshooting

### Server not connecting
1. Check that all environment variables are set correctly
2. Verify the absolute path in your MCP config
3. Ensure Node.js is installed and accessible
4. Check the build folder exists after running `npm run build`

### API errors
1. Verify your API credentials are correct
2. Check if you're using the correct API version (v2 or v3)
3. Ensure you're not hitting rate limits
4. Check Bayarcash API status

### Sandbox vs Production
- Set `BAYARCASH_SANDBOX=true` for testing
- Set `BAYARCASH_SANDBOX=false` for production
- Always test thoroughly in sandbox before going live

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For Bayarcash API documentation and support, visit [Bayarcash Documentation](https://bayar.cash)

## Related Projects

- [Bayarcash PHP SDK](https://github.com/webimpian/bayarcash-php-sdk)
- [Model Context Protocol](https://modelcontextprotocol.io/)
