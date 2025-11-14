# Using Bayarcash MCP with Claude Code

This guide shows you how to use the Bayarcash MCP Server with Claude Code to build better integrations without reading documentation.

## What is Claude Code?

Claude Code is the AI assistant you're using right now in your terminal. It can use MCP servers to access real data and tools while helping you code.

## Why Use MCP with Claude Code?

### Without MCP:
```
You: "Help me integrate Bayarcash in Laravel"
Claude Code: *Uses generic documentation*
             *Creates generic code*
             *Makes assumptions about your setup*
```

### With MCP:
```
You: "Help me integrate Bayarcash in Laravel"
Claude Code: *Checks YOUR actual Bayarcash account via MCP*
             *Sees YOUR portals and channels*
             *Tests in YOUR sandbox*
             *Creates code specific to YOUR setup*
```

## Installation

### Step 1: Install the MCP Server

Follow the [EASY_INSTALL.md](EASY_INSTALL.md) guide to install the server first.

### Step 2: Configure Claude Code

Add to your Claude Code config file:

**Location:** `~/.config/claude-code/config.json` (or similar based on your OS)

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": ["/absolute/path/to/bayarcash-mcp-server/build/index.js"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_api_token_here",
        "BAYARCASH_API_SECRET_KEY": "your_api_secret_key_here",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

**Important:** Replace `/absolute/path/to/bayarcash-mcp-server/` with your actual path.

To get the path:
```bash
cd bayarcash-mcp-server
pwd
# Use the output + /build/index.js
```

### Step 3: Restart Claude Code

Restart your terminal or Claude Code session completely.

### Step 4: Test It

In your conversation with Claude Code, ask:
```
Can you check what Bayarcash portals are available?
```

If it works, Claude Code will use MCP to fetch your real portal data!

## How to Use

### Example 1: Building a Laravel Integration

**You:**
```
I want to integrate Bayarcash into my Laravel app.
Can you check what payment channels I have available first?
```

**Claude Code:**
- Uses MCP to check your portals
- Sees you have FPX, DuitNow, and Boost enabled
- Creates Laravel code specifically for those channels
- No guesswork!

### Example 2: Creating Test Payments

**You:**
```
Create a test payment for RM 10 in my sandbox so I can test my webhook
```

**Claude Code:**
- Uses MCP to create actual payment in your sandbox
- Returns the payment URL and order number
- You can immediately test your webhook handler

### Example 3: Debugging Issues

**You:**
```
Check the status of order #ORD-12345, my webhook didn't fire
```

**Claude Code:**
- Uses MCP to get transaction details
- Shows you the actual status
- Helps diagnose the issue

### Example 4: Building Payment Forms

**You:**
```
Show me all available payment channels and create a Laravel Blade form
component for selecting them
```

**Claude Code:**
- Uses MCP to get your actual channels
- Creates Blade component with your real channel list
- No hardcoded values!

## Common Commands

### Check Your Account Setup
```
Show me my Bayarcash account setup:
- What portals do I have?
- What payment channels are enabled?
- What's my API version?
```

### Create Test Data
```
Create 5 test payments in sandbox mode so I can test my integration
```

### Monitor Transactions
```
Show me all transactions from today
List any failed payments
```

### Verify Webhooks
```
I received this webhook callback: [paste data]
Can you verify if it's valid?
```

### Generate Integration Code
```
Create a complete Laravel payment controller with:
- Payment creation
- Webhook handling
- Transaction status checking
Use my actual Bayarcash portals and channels
```

## Benefits for Laravel Development

### 1. Real Data, Not Assumptions

**Without MCP:**
```php
// Claude guesses common channels
$channels = ['fpx', 'card', 'ewallet'];
```

**With MCP:**
```php
// Claude uses YOUR actual channels
$channels = ['fpx', 'duitnow', 'boost', 'grabpay'];
```

### 2. Instant Testing

**You:**
```
Test if the payment intent creation is working
```

**Claude Code:**
- Creates actual test payment via MCP
- Verifies it was created
- Shows you the response

### 3. Smart Debugging

**You:**
```
My webhook handler isn't working for order #ABC-123
```

**Claude Code:**
- Checks transaction status via MCP
- Shows you what Bayarcash sent
- Helps identify the issue

### 4. Documentation-Free Development

You don't need to:
- ❌ Read Bayarcash API docs
- ❌ Look up portal keys
- ❌ Check channel codes
- ❌ Remember API endpoints

Claude Code gets everything from your account automatically!

## Advanced Usage

### Custom Queries

**You:**
```
Show me all FPX transactions over RM 100 from the last 7 days
```

Claude Code uses MCP to filter and analyze your data.

### Automated Reports

**You:**
```
Generate a daily summary of:
- Total successful payments
- Failed payment reasons
- Most used payment channel
```

### Integration Testing

**You:**
```
Create 10 test payments with different channels and statuses,
then verify my Laravel app handles each correctly
```

### Code Generation

**You:**
```
Create a complete payment flow:
1. Form to collect customer details
2. Create payment intent
3. Redirect to Bayarcash
4. Handle callback
5. Show success/failure

Use my actual portal settings and channels
```

## Workflow Example

### Day 1: Starting New Feature

**You:**
```
I need to add ShopeePay support. Do I have it enabled?
```

**Claude Code:**
*Uses MCP* "Yes! ShopeePay is enabled on your 'main' portal. Here's how to implement it..."

### Day 2: Testing

**You:**
```
Create a test ShopeePay payment for RM 50
```

**Claude Code:**
*Uses MCP* "Created! Order #TEST-001. Here's the payment URL to test..."

### Day 3: Production

**You:**
```
Check if any real ShopeePay payments came through today
```

**Claude Code:**
*Uses MCP* "Yes, 12 ShopeePay transactions today, all successful. Total: RM 1,234.56"

## Troubleshooting

### MCP Not Working

**Check if configured:**
```
Can you access my Bayarcash account?
```

If Claude Code says "I don't have access to MCP tools", the server isn't configured.

**Solution:** Follow [EASY_INSTALL.md](EASY_INSTALL.md) again.

### Wrong Data Returned

**Issue:** Claude Code shows wrong portal data.

**Cause:** Using wrong API credentials or environment.

**Solution:** Check your config file has correct:
- `BAYARCASH_API_TOKEN`
- `BAYARCASH_API_SECRET_KEY`
- `BAYARCASH_SANDBOX` (true for testing, false for production)

### Permission Errors

**Issue:** "Permission denied" when running MCP server.

**Solution:**
```bash
chmod +x install.sh
npm run build
```

## Tips & Best Practices

### 1. Use Sandbox First

Always set `BAYARCASH_SANDBOX: "true"` when developing:
```
Use sandbox mode to test creating a payment
```

### 2. Be Specific

**Better:**
```
Create a payment intent for order #ORD-001, RM 100,
email: test@example.com, using my main portal
```

**Not:**
```
Create a payment
```

### 3. Ask for Verification

```
Create the payment, then verify it was created successfully
```

### 4. Request Explanations

```
Show me the payment channels, and explain which ones are best
for Malaysian users
```

### 5. Generate Documentation

```
Based on my Bayarcash setup, create documentation for my team
on how to process payments
```

## Real-World Examples

### Building a Subscription System

**You:**
```
I'm building a subscription system.
1. Check if I have FPX Direct Debit enabled
2. If yes, show me how to implement recurring payments
3. Create test enrollment for testing
```

**Claude Code:**
- Checks via MCP
- Confirms you have direct debit
- Creates implementation guide
- Creates test enrollment

### Customer Support Tool

**You:**
```
Create a Laravel command that takes an order number and shows:
- Payment status
- Payment method used
- Transaction date
- Any error messages
Use MCP to fetch real data
```

**Claude Code:**
- Creates artisan command
- Integrates MCP data fetching
- Handles errors
- Returns formatted output

### Payment Analytics

**You:**
```
Create a dashboard showing:
- Today's revenue by channel
- Success rate by channel
- Most popular payment methods
Fetch real data from my account
```

**Claude Code:**
- Uses MCP to get transaction data
- Analyzes by channel
- Creates Laravel dashboard
- Adds charts

## Next Steps

1. **Install the MCP server** - [EASY_INSTALL.md](EASY_INSTALL.md)
2. **Configure Claude Code** - Follow Step 2 above
3. **Start building** - Ask Claude Code to help you!

## Getting Help

**MCP Server Issues:**
- See [EASY_INSTALL.md](EASY_INSTALL.md#troubleshooting)
- Check [GitHub Issues](https://github.com/khairulimran-97/bayarcash-mcp-server/issues)

**Laravel Integration Help:**
- Ask Claude Code: "How do I integrate Bayarcash in Laravel?"
- Claude Code will use MCP to help you!

**Bayarcash API Issues:**
- Visit https://bayar.cash
- Contact Bayarcash support

## Summary

With MCP + Claude Code, you can:
- ✅ Build Laravel integrations without reading docs
- ✅ Test with your real account data
- ✅ Debug issues faster
- ✅ Generate code specific to your setup
- ✅ Monitor transactions via conversation
- ✅ Create test data easily

**Ready to start?** Ask Claude Code:
```
Help me integrate Bayarcash into my Laravel app.
Check my account setup first.
```

Happy coding! 🚀
