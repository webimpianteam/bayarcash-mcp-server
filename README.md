# Bayarcash MCP Server 💳

Use AI to manage Bayarcash payments. Create payment links, check transactions, and integrate payment processing using natural language.

[![smithery badge](https://smithery.ai/badge/@khairulimran-97/bayarcash-mcp-server)](https://smithery.ai/server/@khairulimran-97/bayarcash-mcp-server)
[![npm version](https://badge.fury.io/js/@webimpian%2Fbayarcash-mcp-server.svg)](https://www.npmjs.com/package/@webimpian/bayarcash-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Install

**Smithery (Easiest):**
```bash
npx -y @smithery/cli install @khairulimran-97/bayarcash-mcp-server --client claude
```

**Manual Setup:**
Add to your config file (`~/.config/claude-code/mcp_settings.json`):
```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["/path/to/bayarcash-mcp-server/build/index.js"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_token",
        "BAYARCASH_API_SECRET_KEY": "your_secret",
        "BAYARCASH_SANDBOX": "true"
      }
    }
  }
}
```

Get your API credentials from https://console.bayar.cash → Settings → API

For detailed usage examples and workflows, see **[USAGE.md](USAGE.md)**.

## What You Can Do

Talk to your AI naturally. The AI will guide you through an intelligent workflow:

### Smart Payment Creation
```
"Create a payment for RM 100"
```
The AI will automatically:
1. Ask if you want to use the email from your last payment (if available)
2. Show your payment portals and ask which one to use
3. Show payment channels and ask which one to use
4. Ask if you want to include a phone number (optional)
5. Create the payment and store the payment intent ID

### Quick Payment Checks
```
"Check status of that payment"
"Show me the payment I just created"
```
The AI uses the stored payment intent ID to check status.

### Smart Transaction Filtering
```
"Show all transactions"
```
The AI will ask: "Filter by email from last payment: test@example.com?"

**More Examples:**
```
"Create payment for RM 50 with portal abc123 using FPX"
"List all successful FPX payments today"
"Find transactions for customer@example.com"
"What payment channels are available?"
"Show me FPX banks"
```

## Features

**8 Tools Available:**
- `create_payment_intent` - Create payment with guided workflow
- `get_payment_intent` - Get payment status by payment intent ID
- `get_transaction` - Get transaction by ID
- `get_transaction_by_order` - Find transaction by order number
- `list_transactions` - List transactions with smart filtering
- `get_portals` - List your payment portals
- `get_payment_channels` - List available payment channels (10 channels)
- `get_fpx_banks` - List FPX online banking banks

**Payment Channels (by ID):**
1. FPX - Online Banking (20+ banks)
2. DuitNow - QR payments
3. Boost - E-wallet
4. GrabPay - E-wallet
5. Touch 'n Go - E-wallet
6. ShopeePay - E-wallet
7. SPayLater - BNPL
8. Boost PayFlex - BNPL
9. QRIS - QR payments
10. NETS - Card payments

**Smart Features:**
- ✅ Guided payment creation workflow
- ✅ Auto-suggests email from last payment
- ✅ Auto-suggests filtering by last payment email
- ✅ Stores payment intent ID for quick status checks
- ✅ Sandbox & production environments
- ✅ API v3 support
- ✅ Paginated transaction lists with filters

## Configuration

**Environment Variables:**

| Variable | Required | Default |
|----------|----------|---------|
| `BAYARCASH_API_TOKEN` | Yes | - |
| `BAYARCASH_API_SECRET_KEY` | Yes | - |
| `BAYARCASH_SANDBOX` | No | `true` |
| `BAYARCASH_API_VERSION` | No | `v3` |

## Use Cases

**For Developers:**
```
"Help me integrate Bayarcash in my Laravel app"
"Create a test payment for RM 50"
"Show me payment channels for my portal"
```

**For Business:**
```
"Show all successful payments today"
"Find transactions for customer@example.com"
"What's the total revenue from FPX this week?"
```

## Troubleshooting

**Server not connecting?**
1. Restart your AI client completely
2. Verify API credentials at https://console.bayar.cash
3. Check config file path is absolute (not relative)
4. Run `npm run build` in server directory

**Authentication errors?**
- Ensure `BAYARCASH_SANDBOX` matches your account type
- Verify no extra spaces in API token/secret
- Try regenerating credentials

**Getting HTTP 500 errors?**
- Make sure `payment_channel` is specified when creating payments
- Use `get_payment_channels` to see available options
- FPX is the default if no channel specified

## Links

- **Smithery Marketplace:** https://smithery.ai/server/@khairulimran-97/bayarcash-mcp-server
- **Repository:** https://github.com/khairulimran-97/bayarcash-mcp-server
- **Bayarcash:** https://bayar.cash
- **MCP Docs:** https://modelcontextprotocol.io
- **Issues:** https://github.com/khairulimran-97/bayarcash-mcp-server/issues

## License

MIT License - See [LICENSE](LICENSE)
