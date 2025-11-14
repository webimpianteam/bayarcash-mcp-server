# Installation Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Bayarcash credentials:
```env
BAYARCASH_API_TOKEN=your_actual_api_token
BAYARCASH_API_SECRET_KEY=your_actual_secret_key
BAYARCASH_SANDBOX=true
BAYARCASH_API_VERSION=v3
```

### 3. Build the Server

```bash
npm run build
```

## AI Client Configuration

### Claude Desktop

**Config location:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Add this configuration:**

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": [
        "/Users/webimpian/Documents/mcp/bayarcash-mcp-server/build/index.js"
      ],
      "env": {
        "BAYARCASH_API_TOKEN": "your_api_token_here",
        "BAYARCASH_API_SECRET_KEY": "your_secret_key_here",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

**Important:** Replace the path with your actual absolute path to the build/index.js file.

To get the absolute path on macOS/Linux:
```bash
cd bayarcash-mcp-server
pwd
# Use the output + /build/index.js
```

### Cursor

**Option 1: Using Cursor Settings UI**
1. Open Cursor
2. Go to Settings > Features > MCP
3. Click "Add Server"
4. Configure as above

**Option 2: Manual Configuration**

Create/edit `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": [
        "/absolute/path/to/bayarcash-mcp-server/build/index.js"
      ],
      "env": {
        "BAYARCASH_API_TOKEN": "your_api_token_here",
        "BAYARCASH_API_SECRET_KEY": "your_secret_key_here",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

### ChatGPT Desktop

Add to ChatGPT Desktop MCP configuration:

```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "node",
      "args": [
        "/absolute/path/to/bayarcash-mcp-server/build/index.js"
      ],
      "env": {
        "BAYARCASH_API_TOKEN": "your_api_token_here",
        "BAYARCASH_API_SECRET_KEY": "your_secret_key_here",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

## Verification

### 1. Test the Build

```bash
npm start
```

You should see: `Bayarcash MCP server running on stdio`

Press Ctrl+C to stop.

### 2. Test with AI Client

After configuring your AI client, restart it and try:

```
Show me available payment portals from Bayarcash
```

If configured correctly, the AI will use the `get_portals` tool to fetch data from Bayarcash.

## Troubleshooting

### "Cannot find module" error

**Solution:** Make sure you've run `npm run build` first.

```bash
npm run build
```

### "BAYARCASH_API_TOKEN not found" error

**Solution:** Check your environment variables are set correctly in the MCP config.

### Server not showing in AI client

**Solutions:**
1. Restart your AI client completely
2. Check the absolute path is correct (use `pwd` to verify)
3. Ensure Node.js is installed and in PATH
4. Check the config file has valid JSON syntax

### Getting API errors

**Solutions:**
1. Verify your API credentials are correct
2. Check you're using the right API version (v2 or v3)
3. Ensure your Bayarcash account is active
4. Try with `BAYARCASH_SANDBOX=true` first

## Getting API Credentials

1. Log in to your Bayarcash account at [https://console.bayar.cash](https://console.bayar.cash)
2. Navigate to Settings > API
3. Copy your API Token
4. Copy your API Secret Key
5. Use these in your MCP configuration

## Updating

To update the server:

```bash
git pull  # if using git
npm install
npm run build
```

Then restart your AI client.

## Support

- **Bayarcash API Docs**: [https://bayar.cash](https://bayar.cash)
- **MCP Documentation**: [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
- **Issues**: Create an issue in the repository

## Security Notes

- Never commit your `.env` file or API credentials
- Always use sandbox mode for testing
- Use environment-specific credentials (dev vs production)
- Rotate API keys regularly
- Monitor your Bayarcash dashboard for unusual activity
