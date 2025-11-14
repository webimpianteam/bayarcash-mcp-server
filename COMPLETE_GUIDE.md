# Bayarcash MCP Server - Complete Guide

## Table of Contents

1. [What is This?](#what-is-this)
2. [Who is This For?](#who-is-this-for)
3. [Installation Options](#installation-options)
4. [Quick Links](#quick-links)
5. [Getting Started](#getting-started)
6. [Publishing](#publishing)
7. [Support](#support)

---

## What is This?

**Bayarcash MCP Server** connects your AI assistant (Claude, ChatGPT, Cursor) to the Bayarcash payment gateway. This means you can:

- Create payments by talking to your AI
- Check transaction status with natural language
- List transactions and filter them
- Verify payment callbacks
- Manage FPX direct debit
- And more!

**Example:** Instead of using the Bayarcash dashboard, just tell Claude:
```
"Create a payment for RM 100 for order #12345"
```

---

## Who is This For?

### ✅ Perfect For:
- **Merchants** using Bayarcash who want AI automation
- **Developers** building payment integrations
- **Business owners** who prefer talking to AI over using dashboards
- **Accountants** tracking transactions
- **Anyone** processing payments through Bayarcash

### ❌ Not Needed If:
- You don't use Bayarcash
- You prefer manual dashboard access
- You don't use AI assistants

---

## Installation Options

We offer **FIVE** ways to install, from super easy to advanced:

### 1️⃣ Desktop Extension (.mcpb) - EASIEST!
**Status:** 🔜 Coming Soon
**Time:** 10 seconds
**Difficulty:** ⭐

Just double-click to install. No terminal, no configuration files.

👉 [Learn More](INSTALLATION_COMPARISON.md#method-4-desktop-extension-mcpb-)

---

### 2️⃣ Smithery Marketplace
**Status:** 🔜 Coming Soon
**Time:** 30 seconds
**Difficulty:** ⭐

```bash
smithery install bayarcash-mcp-server
```

One command, visual interface for setup.

👉 [Learn More](INSTALLATION_COMPARISON.md#method-3-smithery-)

---

### 3️⃣ Automated Installer - RECOMMENDED FOR NOW
**Status:** ✅ Available Now
**Time:** 2 minutes
**Difficulty:** ⭐

Interactive wizard that asks questions and sets everything up.

**Mac/Linux:**
```bash
git clone https://github.com/webimpian/bayarcash-mcp-server.git
cd bayarcash-mcp-server
./install.sh
```

**Windows:**
```powershell
git clone https://github.com/webimpian/bayarcash-mcp-server.git
cd bayarcash-mcp-server
.\install.ps1
```

👉 **Best for beginners!** See [EASY_INSTALL.md](EASY_INSTALL.md)

---

### 4️⃣ NPX - For Developers
**Status:** ⚠️ Requires NPM Publish
**Time:** 1 minute
**Difficulty:** ⭐⭐

No download needed. Add to your AI config:

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

👉 [Learn More](INSTALLATION_COMPARISON.md#method-2-npx-)

---

### 5️⃣ Manual Installation - Advanced
**Status:** ✅ Available Now
**Time:** 5 minutes
**Difficulty:** ⭐⭐⭐

Full control, manual setup. For developers who want to customize.

👉 [Learn More](INSTALL.md)

---

## Quick Links

### 📚 Documentation

| Document | Purpose | For Who |
|----------|---------|---------|
| [EASY_INSTALL.md](EASY_INSTALL.md) | Step-by-step beginner guide | Non-technical users |
| [QUICK_START.md](QUICK_START.md) | 5-minute setup | Everyone |
| [INSTALL.md](INSTALL.md) | Detailed installation | Technical users |
| [USAGE.md](USAGE.md) | How to use the server | All users |
| [INSTALLATION_COMPARISON.md](INSTALLATION_COMPARISON.md) | Compare all methods | Choosing a method |
| [PUBLISHING.md](PUBLISHING.md) | Publish to marketplaces | Maintainers |
| [README.md](README.md) | Main documentation | Everyone |

### 🔧 Files

| File | Purpose |
|------|---------|
| `install.sh` | Mac/Linux automated installer |
| `install.ps1` | Windows automated installer |
| `.env.example` | Environment variables template |
| `package.json` | NPM package configuration |
| `src/index.ts` | Main MCP server code |
| `src/bayarcash-client.ts` | Bayarcash API client |

---

## Getting Started

### Prerequisites

1. **Node.js** - Download from https://nodejs.org
2. **Bayarcash Account** - Sign up at https://bayar.cash
3. **AI Assistant** - Claude Desktop, Cursor, or ChatGPT Desktop

### Get API Credentials

1. Log in to https://console.bayar.cash
2. Go to **Settings** → **API**
3. Copy your **API Token** and **API Secret Key**

### Choose Installation Method

Not sure which method? Use this flowchart:

```
Are you technical?
├─ No → Use Automated Installer (install.sh/install.ps1)
│
└─ Yes → Do you want automatic updates?
    ├─ Yes → Use NPX (once published)
    └─ No → Use Manual Installation
```

### After Installation

1. **Restart your AI client** completely
2. **Test it** by asking: `"Show me available payment portals from Bayarcash"`
3. **Start using it!** See [USAGE.md](USAGE.md) for examples

---

## What Can You Do?

Once installed, you can talk to your AI assistant naturally:

### Create Payments
```
Create a payment intent for RM 150, order number ORD-001,
customer email: john@example.com, name: John Tan,
description: Product purchase
```

### Check Transactions
```
Show me all successful transactions from today
Get the status of order ORD-001
List all FPX transactions
```

### Get Information
```
What payment channels are available?
Show me all FPX banks
List my payment portals
```

### Verify Callbacks
```
Verify this webhook callback: [paste data]
```

See [USAGE.md](USAGE.md) for 50+ more examples!

---

## Publishing

Want to make this available to more users? You can publish to:

### 📦 NPM
Users can install with `npx` without downloading.

👉 See [PUBLISHING.md](PUBLISHING.md#publishing-to-npm)

### 🏪 Smithery Marketplace
Listed in the official MCP marketplace.

👉 See [PUBLISHING.md](PUBLISHING.md#publishing-to-smithery)

### 🖱️ Desktop Extensions
One-click installation for Claude Desktop.

👉 See [PUBLISHING.md](PUBLISHING.md#publishing-desktop-extension-mcpb)

### 🐙 GitHub MCP Registry
Official GitHub registry for MCP servers.

👉 See [PUBLISHING.md](PUBLISHING.md#github-mcp-registry)

---

## Architecture

### How It Works

```
┌─────────────────┐
│   AI Assistant  │ (Claude, ChatGPT, Cursor)
│   (Client)      │
└────────┬────────┘
         │ MCP Protocol
         │
┌────────▼────────┐
│  Bayarcash MCP  │ (This Server)
│     Server      │
└────────┬────────┘
         │ HTTPS/REST
         │
┌────────▼────────┐
│  Bayarcash API  │ (Payment Gateway)
│   (v2 or v3)    │
└─────────────────┘
```

### Components

1. **MCP Server** (`src/index.ts`)
   - Handles tool calls from AI
   - Provides resources
   - Manages communication

2. **Bayarcash Client** (`src/bayarcash-client.ts`)
   - Wraps Bayarcash API
   - Handles authentication
   - Generates checksums

3. **Configuration**
   - Environment variables
   - AI client config files
   - Sandbox/production modes

---

## Features

### ✅ 10 Tools Available

1. `create_payment_intent` - Create payments
2. `get_payment_intent` - Get payment details
3. `get_transaction` - Get transaction by ID
4. `get_transaction_by_order` - Get by order number
5. `list_transactions` - Filter transactions
6. `get_portals` - List payment portals
7. `get_payment_channels` - Get payment methods
8. `get_fpx_banks` - List FPX banks
9. `verify_callback` - Verify webhooks
10. `create_fpx_direct_debit_enrollment` - Direct debit

### ✅ 3 Resources Available

1. `bayarcash://portals` - Portal data
2. `bayarcash://channels` - Channel data
3. `bayarcash://fpx-banks` - Bank data

### ✅ Payment Channels Supported

- FPX Online Banking
- FPX Direct Debit
- DuitNow
- E-wallets (Boost, GrabPay, ShopeePay, TouchNGo)
- Credit Cards
- International (Alipay, WeChat Pay)
- Manual Bank Transfers
- And 13 more...

---

## Security

### 🔒 Best Practices

- ✅ Always use sandbox mode for testing
- ✅ Never commit credentials to Git
- ✅ Rotate API keys regularly
- ✅ Use environment-specific keys
- ✅ Monitor your Bayarcash dashboard
- ✅ Verify all callbacks with checksums

### 🔐 How We Secure

- API credentials stored in environment variables
- Automatic checksum generation
- HTTPS-only communication
- Webhook verification built-in
- Sandbox mode by default

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Server not connecting | Restart AI client completely |
| API errors | Check credentials are correct |
| "Command not found" | Install Node.js |
| Wrong path error | Use absolute paths in config |
| Sandbox vs production | Set `BAYARCASH_SANDBOX` correctly |

👉 See full troubleshooting in [EASY_INSTALL.md](EASY_INSTALL.md#troubleshooting)

---

## Support

### 📖 Documentation
- All docs in this repository
- Start with [EASY_INSTALL.md](EASY_INSTALL.md)

### 🐛 Found a Bug?
- Open an issue on GitHub
- Include error messages
- Describe what you expected vs what happened

### 💡 Feature Request?
- Open an issue on GitHub
- Describe the feature
- Explain your use case

### ❓ Questions?
- Check documentation first
- Search existing GitHub issues
- Open a new issue if needed

### 🏢 Bayarcash Support
- API documentation: https://bayar.cash
- Account issues: Contact Bayarcash directly

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See [PUBLISHING.md](PUBLISHING.md) for development setup.

---

## Roadmap

### ✅ Available Now
- Core MCP server
- All Bayarcash API v2/v3 features
- Automated installers
- Comprehensive documentation

### 🔜 Coming Soon
- NPM package publication
- Smithery marketplace listing
- Desktop Extension (.mcpb)
- GitHub MCP Registry
- Docker container
- Homebrew formula (Mac)

### 💡 Future Ideas
- Transaction webhooks (real-time)
- Recurring payment automation
- Multi-portal support
- Analytics and reporting
- Refund management
- Dispute handling

Vote for features by opening issues on GitHub!

---

## License

MIT License - See [LICENSE](LICENSE)

Free to use, modify, and distribute.

---

## Credits

**Created by:** Webimpian
**Based on:** [Bayarcash PHP SDK](https://github.com/webimpian/bayarcash-php-sdk)
**Powered by:** [Model Context Protocol](https://modelcontextprotocol.io)

---

## Quick Reference Card

### Installation Commands

```bash
# Automated (Mac/Linux)
./install.sh

# Automated (Windows)
.\install.ps1

# NPX (once published)
npx -y @webimpian/bayarcash-mcp-server

# Smithery (coming soon)
smithery install bayarcash-mcp-server
```

### Config Files Locations

```
Claude Desktop (Mac):
~/Library/Application Support/Claude/claude_desktop_config.json

Claude Desktop (Windows):
%APPDATA%\Claude\claude_desktop_config.json

Cursor:
.cursor/mcp.json
```

### Environment Variables

```env
BAYARCASH_API_TOKEN=your_token
BAYARCASH_API_SECRET_KEY=your_secret
BAYARCASH_SANDBOX=true
BAYARCASH_API_VERSION=v3
```

---

**Ready to get started?** → [EASY_INSTALL.md](EASY_INSTALL.md)

**Questions?** → [Open an issue](https://github.com/webimpian/bayarcash-mcp-server/issues)

**Happy automating!** 🚀
