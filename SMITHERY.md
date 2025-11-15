# Smithery Marketplace

## For Users: Installing from Smithery

Once published, installation is super easy:

### Install to Claude Desktop

```bash
npx -y @smithery/cli install @webimpian/bayarcash-mcp-server --client claude
```

### Install to Claude Code

```bash
npx -y @smithery/cli install @webimpian/bayarcash-mcp-server --client claude-code
```

### Install to Cursor

```bash
npx -y @smithery/cli install @webimpian/bayarcash-mcp-server --client cursor
```

Smithery will:
1. Download the MCP server
2. Configure your AI client automatically
3. Prompt for your Bayarcash API credentials
4. Set everything up - done!

## For Developers: Publishing to Smithery

### 1. Install Smithery CLI

```bash
npm install -D @smithery/cli
```

### 2. Create Account

Go to https://smithery.ai and create an account.

### 3. Login

```bash
npx @smithery/cli login
```

### 4. Test Locally

```bash
npm run smithery:dev
```

This opens an interactive playground to test your MCP server.

### 5. Publish

```bash
npx @smithery/cli publish
```

Follow the prompts to publish your server to the marketplace.

## Configuration

The `smithery.yaml` file includes:

```yaml
name: bayarcash-mcp-server
displayName: Bayarcash Payment Gateway
description: MCP server for Bayarcash integration
category: payments
tags: [payments, bayarcash, fpx, malaysia]

configSchema:
  properties:
    apiToken:
      type: string
      title: API Token
      required: true
    apiSecretKey:
      type: string
      title: API Secret Key
      secret: true
      required: true
    useSandbox:
      type: boolean
      default: true
    apiVersion:
      type: string
      enum: [v2, v3]
      default: v3
```

This creates a nice UI for users to enter their credentials!

## After Publishing

Your server will appear on:
- https://smithery.ai/server/@webimpian/bayarcash-mcp-server
- Smithery marketplace
- Search results in Smithery CLI

Users can discover and install with one command!

## Benefits of Smithery

**For Users:**
- ✅ One-line installation
- ✅ Automatic configuration
- ✅ Visual credential input
- ✅ Works with all AI clients
- ✅ Automatic updates

**For Developers:**
- ✅ Built-in testing playground
- ✅ Automatic deployment
- ✅ Version management
- ✅ User analytics
- ✅ Easy discovery

## Requirements

- Node.js installed
- Smithery account (free)
- `smithery.yaml` configuration (included)
- Built TypeScript code

## Support

- **Smithery Docs:** https://smithery.ai/docs
- **GitHub Issues:** https://github.com/webimpianteam/bayarcash-mcp-server/issues
- **Bayarcash Support:** https://bayar.cash
