# Quick Start Guide

## 5-Minute Setup

### Step 1: Install (30 seconds)
```bash
cd bayarcash-mcp-server
npm install
```

### Step 2: Build (15 seconds)
```bash
npm run build
```

### Step 3: Configure Your AI Client (2 minutes)

Get your absolute path:
```bash
pwd
# Copy the output
```

#### For Claude Desktop

Edit: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["/YOUR_PATH_HERE/bayarcash-mcp-server/build/index.js"],
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

#### For Cursor

Settings > Features > MCP or edit `.cursor/mcp.json` (same format as above)

### Step 4: Restart Your AI Client (30 seconds)

Close and reopen Claude Desktop or Cursor completely.

### Step 5: Test (1 minute)

Ask your AI:
```
Show me available payment portals from Bayarcash
```

If it works, you'll see portal data!

## First Payment

Try this:
```
Create a payment intent:
- Order: TEST-001
- Amount: RM 10.00
- Email: test@example.com
- Name: Test User
- Description: Test payment
- Portal: [your_portal_key]
```

## Common Commands

| What you want | Ask the AI |
|--------------|------------|
| List portals | "Show me all payment portals" |
| List channels | "What payment channels are available?" |
| FPX banks | "List all FPX banks" |
| Create payment | "Create a payment for RM 50..." |
| Check transaction | "Get transaction for order XYZ-123" |
| List transactions | "Show all successful transactions" |

## Need Help?

- **Full docs**: See [README.md](README.md)
- **Usage examples**: See [USAGE.md](USAGE.md)
- **Installation guide**: See [INSTALL.md](INSTALL.md)
- **Bayarcash API**: https://bayar.cash

## Troubleshooting

**Server not working?**
1. Did you run `npm run build`?
2. Is the path absolute (starts with `/`)?
3. Did you restart the AI client?
4. Are your API credentials correct?

**Still stuck?**
Check [INSTALL.md](INSTALL.md#troubleshooting) for detailed solutions.

## What's Next?

1. Test in sandbox mode first (`BAYARCASH_SANDBOX=true`)
2. Try creating real payments
3. Set up webhook verification
4. Go live with `BAYARCASH_SANDBOX=false`

---

**Remember:** Always use sandbox for testing!
