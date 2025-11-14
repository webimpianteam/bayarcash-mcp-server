# Publishing Guide

This guide explains how to publish the Bayarcash MCP Server to various platforms for easier installation.

## Publishing to NPM

Publishing to NPM allows users to install with `npx` without downloading the repository.

### Prerequisites

1. **NPM Account**: Create one at https://www.npmjs.com/signup
2. **Login to NPM**:
   ```bash
   npm login
   ```

### Steps

1. **Update package.json**
   - Ensure the name is scoped: `@webimpian/bayarcash-mcp-server`
   - Update version number following [semver](https://semver.org/)
   - Verify all fields are correct

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Test locally**
   ```bash
   npm pack
   # This creates a .tgz file you can test
   ```

4. **Publish**
   ```bash
   npm publish --access public
   ```

### After Publishing

Users can now install with:
```bash
npx -y @webimpian/bayarcash-mcp-server
```

Or configure in their AI client:
```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "npx",
      "args": ["-y", "@webimpian/bayarcash-mcp-server"],
      "env": {
        "BAYARCASH_API_TOKEN": "...",
        "BAYARCASH_API_SECRET_KEY": "...",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

---

## Publishing to Smithery

Smithery is a marketplace for MCP servers with easy installation.

### Prerequisites

1. **Smithery Account**: Visit https://smithery.ai
2. **Install Smithery CLI**:
   ```bash
   npm install -g @smithery/cli
   ```

### Steps

1. **Login to Smithery**
   ```bash
   smithery login
   ```

2. **Initialize Smithery config**
   ```bash
   smithery init
   ```

   This creates a `smithery.json` file.

3. **Configure smithery.json**
   ```json
   {
     "name": "bayarcash-mcp-server",
     "displayName": "Bayarcash Payment Gateway",
     "description": "MCP server for Bayarcash payment gateway integration",
     "version": "1.0.0",
     "author": "Webimpian",
     "repository": "https://github.com/khairulimran-97/bayarcash-mcp-server",
     "license": "MIT",
     "category": "payments",
     "tags": ["payments", "bayarcash", "gateway", "fpx", "malaysia"],
     "configSchema": {
       "type": "object",
       "properties": {
         "apiToken": {
           "type": "string",
           "title": "API Token",
           "description": "Your Bayarcash API Token from console.bayar.cash"
         },
         "apiSecretKey": {
           "type": "string",
           "title": "API Secret Key",
           "description": "Your Bayarcash API Secret Key",
           "secret": true
         },
         "useSandbox": {
           "type": "boolean",
           "title": "Use Sandbox Mode",
           "description": "Enable sandbox mode for testing",
           "default": true
         },
         "apiVersion": {
           "type": "string",
           "title": "API Version",
           "description": "Bayarcash API version to use",
           "enum": ["v2", "v3"],
           "default": "v3"
         }
       },
       "required": ["apiToken", "apiSecretKey"]
     }
   }
   ```

4. **Publish to Smithery**
   ```bash
   smithery publish
   ```

### After Publishing

Users can install with:
```bash
smithery install bayarcash-mcp-server
```

The Smithery UI will guide them through configuration.

---

## Publishing Desktop Extension (.mcpb)

Desktop Extensions provide one-click installation for Claude Desktop.

### Prerequisites

1. **Install mcpb CLI**:
   ```bash
   npm install -g @anthropic-ai/mcpb
   ```

### Steps

1. **Initialize extension**
   ```bash
   mcpb init
   ```

2. **Configure package**
   Edit the generated config to include:
   - Server dependencies
   - Environment variables schema
   - Icons and metadata

3. **Build the extension**
   ```bash
   mcpb pack
   ```

4. **Distribute**
   - Upload to GitHub releases
   - Share on Smithery marketplace
   - Host on your website

### User Installation

Users simply:
1. Download the `.mcpb` file
2. Double-click it
3. Claude Desktop handles the rest!

---

## GitHub MCP Registry

Publish to GitHub's official MCP registry for discoverability.

### Prerequisites

1. **GitHub Account**
2. **Repository hosted on GitHub**

### Steps

1. **Create registry metadata**

   Create `.github/mcp-registry.json`:
   ```json
   {
     "name": "bayarcash-mcp-server",
     "description": "MCP server for Bayarcash payment gateway",
     "version": "1.0.0",
     "author": "Webimpian",
     "homepage": "https://github.com/khairulimran-97/bayarcash-mcp-server",
     "categories": ["payments", "finance"],
     "installation": {
       "type": "npm",
       "package": "@webimpian/bayarcash-mcp-server"
     },
     "configuration": {
       "env": {
         "BAYARCASH_API_TOKEN": {
           "description": "Bayarcash API Token",
           "required": true
         },
         "BAYARCASH_API_SECRET_KEY": {
           "description": "Bayarcash API Secret Key",
           "required": true,
           "secret": true
         },
         "BAYARCASH_SANDBOX": {
           "description": "Use sandbox mode",
           "default": "true"
         },
         "BAYARCASH_API_VERSION": {
           "description": "API version (v2 or v3)",
           "default": "v3"
         }
       }
     }
   }
   ```

2. **Tag a release**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

3. **Submit to registry**
   - Follow GitHub's MCP registry submission process
   - Create PR to the registry repository

### Automatic Publishing

Set up GitHub Actions to auto-publish on release:

Create `.github/workflows/publish.yml`:
```yaml
name: Publish to NPM and MCP Registry

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - run: npm install
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Version Management

### Semver Versioning

Follow semantic versioning:
- **1.0.0** → Initial release
- **1.0.1** → Bug fixes
- **1.1.0** → New features (backward compatible)
- **2.0.0** → Breaking changes

### Update Version

```bash
# Patch (1.0.0 → 1.0.1)
npm version patch

# Minor (1.0.0 → 1.1.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major
```

Then publish:
```bash
npm publish --access public
git push --tags
```

---

## Distribution Checklist

Before publishing, ensure:

- [ ] All tests pass
- [ ] Documentation is up to date
- [ ] CHANGELOG.md is updated
- [ ] Version number is bumped
- [ ] README has installation instructions
- [ ] Environment variables are documented
- [ ] Examples are provided
- [ ] License file exists
- [ ] .npmignore excludes unnecessary files
- [ ] Security vulnerabilities are addressed

---

## Marketing & Discoverability

After publishing, promote your server:

1. **Add to MCP Server lists**
   - Awesome MCP Servers list on GitHub
   - MCP Market (https://mcpmarket.com)
   - PulseMCP (https://pulsemcp.com)

2. **Documentation**
   - Add badges to README
   - Create tutorial videos
   - Write blog posts

3. **Community**
   - Share on Twitter/X
   - Post in MCP Discord
   - Submit to Product Hunt

---

## Maintenance

### Regular Updates

- Monitor GitHub issues
- Update dependencies monthly
- Test with new MCP SDK versions
- Keep documentation current
- Respond to user feedback

### Security

- Run `npm audit` regularly
- Update dependencies with vulnerabilities
- Rotate test credentials
- Monitor API changes from Bayarcash

---

## Support

For questions about publishing:
- **NPM**: https://docs.npmjs.com
- **Smithery**: https://smithery.ai/docs
- **GitHub Registry**: https://github.com/modelcontextprotocol/registry
- **MCP Desktop Extensions**: https://www.anthropic.com/engineering/desktop-extensions
