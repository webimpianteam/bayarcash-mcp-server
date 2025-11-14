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

## What You Can Do

Talk to your AI naturally:

**Create Payments:**
```
"Create a payment for RM 100 for order ORD-001"
"Generate payment link for john@example.com using FPX"
```

**Check Transactions:**
```
"Show all transactions today"
"Check status of order #ORD-12345"
"List all failed payments this week"
```

**Manage Setup:**
```
"What payment portals do I have?"
"Show available payment channels"
"List all FPX banks"
```

## Features

**10 Tools Available:**
- `create_payment_intent` - Create payment links with order details
- `get_payment_intent` - Get payment intent by order number
- `get_transaction` - Get transaction by ID
- `get_transaction_by_order` - Find transaction by order number
- `list_transactions` - List all transactions with filters
- `get_portals` - List your payment portals
- `get_payment_channels` - List available payment channels
- `get_fpx_banks` - List FPX online banking banks
- `verify_callback` - Verify webhook authenticity
- `create_fpx_direct_debit_enrollment` - Enroll FPX Direct Debit

**Payment Channels Supported:**
- FPX (Online Banking - 20+ banks)
- DuitNow (QR payments)
- E-Wallets (Boost, GrabPay, Touch 'n Go, ShopeePay)
- Cards (Credit/Debit)
- BNPL (Buy Now Pay Later)

**Built-in Features:**
- ✅ Sandbox & production environments
- ✅ Automatic checksum generation
- ✅ Webhook signature verification
- ✅ API v2 & v3 support
- ✅ Transaction filtering & pagination

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
"Verify this webhook callback: [paste data]"
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

- **Smithery:** https://server.smithery.ai/@khairulimran-97/bayarcash-mcp-server
- **Repository:** https://github.com/khairulimran-97/bayarcash-mcp-server
- **Bayarcash:** https://bayar.cash
- **MCP Docs:** https://modelcontextprotocol.io
- **Issues:** https://github.com/khairulimran-97/bayarcash-mcp-server/issues

## License

MIT License - See [LICENSE](LICENSE)
