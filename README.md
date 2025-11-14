# Bayarcash MCP Server 💳

**Let AI assistants manage your Bayarcash payments!** This MCP server connects Claude, ChatGPT, and Cursor directly to the Bayarcash payment gateway API. Create payments, check transactions, and integrate payment processing using natural language.

[![npm version](https://badge.fury.io/js/@webimpian%2Fbayarcash-mcp-server.svg)](https://www.npmjs.com/package/@webimpian/bayarcash-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Install

### Option 1: Smithery (Easiest)

Install instantly via Smithery marketplace:

```bash
npx -y @smithery/cli install @khairulimran-97/bayarcash-mcp-server --client claude
```

You'll be prompted for:
- **API Token** - Get from https://console.bayar.cash
- **API Secret Key** - Found in Settings → API
- **Sandbox Mode** - Use `true` for testing, `false` for production
- **API Version** - Choose `v3` (recommended) or `v2`

### Option 2: Automated Script

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

### Option 3: Manual Configuration

Add to your Claude Code config (`~/.config/claude-code/mcp_settings.json` or similar):

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["/absolute/path/to/bayarcash-mcp-server/build/index.js"],
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

## Configuration

### Get API Credentials
1. Go to https://console.bayar.cash
2. Navigate to Settings → API
3. Copy your API Token and Secret Key

### Config File Locations

**Claude Desktop:**
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Cursor:** `.cursor/mcp.json`

## 💬 What Can You Do?

Once installed, simply chat with your AI assistant:

### Create Payments
```
"First check available payment channels, then create a payment intent for RM 100.50 for order #ORD-001 using FPX"
"Generate a payment link for customer john@example.com using DuitNow"
"Create a payment with Boost for RM 50"
```

### Check Transactions
```
"Show me all transactions from today"
"Get status of order #ORD-12345"
"List all failed payments this week"
"Show transactions paid via FPX"
```

### Explore Your Setup
```
"What payment portals do I have?"
"List all available payment channels"
"Show me FPX banks"
```

### Verify Webhooks
```
"Verify this webhook callback: [paste callback data]"
```

### Test Payments
```
"Create a test payment for RM 10 in sandbox"
```

## ✨ Features

### 10 Powerful Tools

| Tool | Description |
|------|-------------|
| `create_payment_intent` | Create new payment intents with order details |
| `get_payment_intent` | Retrieve payment intent by order number |
| `get_transaction` | Get transaction details by ID |
| `get_transaction_by_order` | Find transaction using order number |
| `list_transactions` | List all transactions with filters (status, channel, email, etc.) |
| `get_portals` | Get your available payment portals |
| `get_payment_channels` | List supported payment channels |
| `get_fpx_banks` | Get FPX online banking banks list |
| `verify_callback` | Verify webhook callback authenticity |
| `create_fpx_direct_debit_enrollment` | Enroll customers in FPX Direct Debit |

### 3 Data Resources

- **Portals** (`bayarcash://portals`) - Your payment portal configurations
- **Channels** (`bayarcash://channels`) - Available payment methods
- **FPX Banks** (`bayarcash://fpx-banks`) - Malaysian online banking options

### Payment Channels Supported

- **FPX** - Online banking (20+ banks)
- **DuitNow** - QR payments
- **E-Wallets** - Boost, GrabPay, Touch 'n Go, ShopeePay
- **Cards** - Credit/Debit cards
- **BNPL** - Buy Now Pay Later options

### Built-in Features

- ✅ API v2 and v3 support
- ✅ Sandbox and production environments
- ✅ Automatic checksum generation for security
- ✅ Webhook signature verification
- ✅ Pagination for transaction lists
- ✅ Multiple filter options (status, channel, email, date range)

## 🎯 Use Cases

### For Developers

**Build Payment Integrations Faster:**
```
"Help me integrate Bayarcash in my Laravel app. Check my portal setup first."
```
The AI will:
- Access YOUR real Bayarcash account
- See YOUR actual portals and payment channels
- Generate code specific to YOUR setup
- No manual documentation reading needed

**Test Payment Flows:**
```
"Create a test payment for RM 50 with order number TEST-001"
"Check if the webhook callback is valid: [paste JSON]"
"List all sandbox transactions from yesterday"
```

**Debug Payment Issues:**
```
"Why did order #ORD-789 fail?"
"Show me all failed FPX transactions today"
"Check the status of transaction ID abc123"
```

### For Business Owners

**Monitor Payments:**
```
"How many successful payments did we receive today?"
"Show me all Boost wallet payments this week"
"List pending transactions"
```

**Analyze Revenue:**
```
"What's our total revenue from FPX this month?"
"Which payment channel is most popular?"
"Show me all transactions above RM 1000"
```

**Customer Support:**
```
"Find all transactions for customer email john@example.com"
"Check payment status for order #12345"
"Get transaction details for reference number XYZ789"
```

### For QA Teams

**Automated Testing:**
```
"Create 5 test payments with different amounts"
"Verify this webhook payload matches our checksum"
"Test all available payment channels"
```

## 🔧 Configuration Details

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BAYARCASH_API_TOKEN` | ✅ Yes | - | Your API token from console.bayar.cash |
| `BAYARCASH_API_SECRET_KEY` | ✅ Yes | - | Your API secret key for checksums |
| `BAYARCASH_SANDBOX` | ❌ No | `true` | Use sandbox mode (`true`) or production (`false`) |
| `BAYARCASH_API_VERSION` | ❌ No | `v3` | API version: `v3` (recommended) or `v2` |

### API Endpoints

The server automatically selects the correct endpoint:

**Sandbox:**
- v2: `https://console.bayarcash-sandbox.com/api/v2`
- v3: `https://api.console.bayarcash-sandbox.com/v3`

**Production:**
- v2: `https://console.bayar.cash/api/v2`
- v3: `https://api.console.bayar.cash/v3`

## Manual Installation

See [INSTALL.md](INSTALL.md) for detailed manual setup instructions.

## Development Usage

See [USAGE.md](USAGE.md) for examples of all available tools and commands.

## 🔍 Example Workflows

### Complete Payment Integration Flow

1. **Check Your Setup:**
   ```
   "What payment portals and channels do I have available?"
   ```

2. **Create Test Payment:**
   ```
   "Create a payment intent for RM 99.99, order number TEST-001,
   email test@example.com, name Test User, description 'Test Order'"
   ```

3. **Verify Transaction:**
   ```
   "Check status of order TEST-001"
   ```

4. **Verify Webhook:**
   ```
   "Verify this callback data: {callback_json} with checksum: abc123..."
   ```

### Monthly Revenue Report

```
"List all successful transactions from this month, group by payment channel,
and calculate total revenue"
```

The AI will use the MCP tools to fetch and analyze your real transaction data.

## ❓ Troubleshooting

### Server Not Connecting

**Symptom:** AI assistant says "MCP server not available"

**Solutions:**
1. Completely quit and restart your AI client (not just reload)
2. Check config file exists in correct location
3. Verify file paths are absolute (not relative)
4. Run `npm run build` in the server directory
5. Check MCP logs for errors

### Authentication Errors

**Symptom:** "401 Unauthorized" or "Invalid API token"

**Solutions:**
1. Verify credentials at https://console.bayar.cash
2. Check `BAYARCASH_SANDBOX` matches your account type
3. Ensure no extra spaces in API token/secret
4. Try regenerating API credentials

### Wrong Data Returned

**Symptom:** No transactions showing or wrong environment

**Solutions:**
1. Check `BAYARCASH_SANDBOX` setting:
   - `true` = sandbox/test environment
   - `false` = production environment
2. Verify `BAYARCASH_API_VERSION` (v2 or v3)
3. Confirm you're looking at the correct console dashboard

### Tool Errors

**Symptom:** "Tool execution failed" or "Invalid parameters"

**Solutions:**
1. Check required fields are provided
2. Verify order numbers are unique
3. Ensure amounts are positive numbers
4. Check email format is valid

## 🤝 Support & Contributing

**Get Help:**
- 📖 Check [USAGE.md](USAGE.md) for detailed examples
- 🐛 Report issues: https://github.com/khairulimran-97/bayarcash-mcp-server/issues
- 💬 Bayarcash support: https://bayar.cash

**Contributing:**
Pull requests welcome! Please ensure:
- Code follows existing patterns
- All tools have proper Zod validation
- Descriptions are clear and helpful
- Changes are tested in both sandbox and production

## 📜 License

MIT License - See [LICENSE](LICENSE)

## 🔗 Links

- **Smithery:** https://server.smithery.ai/@khairulimran-97/bayarcash-mcp-server
- **Repository:** https://github.com/khairulimran-97/bayarcash-mcp-server
- **NPM:** https://www.npmjs.com/package/@webimpian/bayarcash-mcp-server
- **Bayarcash:** https://bayar.cash
- **MCP Protocol:** https://modelcontextprotocol.io

---

**Made with ❤️ for the Bayarcash community**

*Note: This is an unofficial community project. For official Bayarcash support, visit https://bayar.cash*
