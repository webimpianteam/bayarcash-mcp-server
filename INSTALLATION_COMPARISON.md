# Installation Methods Comparison

Choose the best installation method for your skill level and needs.

## Summary Table

| Method | Difficulty | Time | Best For |
|--------|-----------|------|----------|
| **Automated Installer** | ⭐ Easy | 2 min | Non-technical users |
| **NPX** | ⭐⭐ Medium | 1 min | Users who can edit JSON |
| **Smithery** | ⭐ Easy | 30 sec | Anyone (coming soon) |
| **Desktop Extension** | ⭐ Very Easy | 10 sec | Claude Desktop users (coming soon) |
| **Manual** | ⭐⭐⭐ Hard | 5 min | Developers |

---

## Method 1: Automated Installer 🪄

**Difficulty:** ⭐ Easy
**Time:** ~2 minutes
**Requirements:** Node.js installed

### What You Do:
1. Download the server
2. Run one command: `./install.sh` (Mac/Linux) or `.\install.ps1` (Windows)
3. Answer simple questions
4. Done!

### Pros:
✅ Interactive wizard guides you
✅ Automatically configures your AI client
✅ Validates your setup
✅ Creates backup of existing config

### Cons:
❌ Need to download the repository first
❌ Need Node.js installed

### Perfect For:
- Non-technical users who want help
- First-time MCP server installers
- People who prefer guided setup

### How to Use:

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

---

## Method 2: NPX 📦

**Difficulty:** ⭐⭐ Medium
**Time:** ~1 minute
**Requirements:** Node.js, can edit JSON files

### What You Do:
1. Edit your AI client's config file
2. Add NPX configuration
3. Restart AI client
4. Done!

### Pros:
✅ No repository download needed
✅ Always uses latest version
✅ Automatic updates
✅ One-line config

### Cons:
❌ Must manually edit JSON config file
❌ Need to know where config file is
❌ Requires package to be published to NPM

### Perfect For:
- Developers
- Users comfortable with JSON
- People who want automatic updates
- Quick testing

### How to Use:

Find your config file:
- **Claude Desktop (Mac):** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Desktop (Windows):** `%APPDATA%\Claude\claude_desktop_config.json`
- **Cursor:** `.cursor/mcp.json`

Add this:
```json
{
  "mcpServers": {
    "bayarcash": {
      "command": "npx",
      "args": ["-y", "@webimpian/bayarcash-mcp-server"],
      "env": {
        "BAYARCASH_API_TOKEN": "your_token_here",
        "BAYARCASH_API_SECRET_KEY": "your_secret_here",
        "BAYARCASH_SANDBOX": "true",
        "BAYARCASH_API_VERSION": "v3"
      }
    }
  }
}
```

---

## Method 3: Smithery 🏪

**Difficulty:** ⭐ Easy
**Time:** ~30 seconds
**Requirements:** Smithery CLI
**Status:** 🔜 Coming Soon

### What You Do:
1. Run: `smithery install bayarcash-mcp-server`
2. Enter credentials in UI
3. Done!

### Pros:
✅ Easiest method
✅ Visual interface for credentials
✅ Marketplace discovery
✅ One command install
✅ Automatic config management

### Cons:
❌ Requires Smithery CLI
❌ Not yet available (coming soon)

### Perfect For:
- Anyone who wants simplicity
- Discovering new MCP servers
- Managing multiple MCP servers

### How to Use (When Available):

```bash
# Install Smithery CLI (one-time)
npm install -g @smithery/cli

# Login to Smithery
smithery login

# Install Bayarcash MCP
smithery install bayarcash-mcp-server
```

Then follow the UI prompts!

---

## Method 4: Desktop Extension (.mcpb) 🖱️

**Difficulty:** ⭐ Very Easy
**Time:** ~10 seconds
**Requirements:** Claude Desktop
**Status:** 🔜 Coming Soon

### What You Do:
1. Download `.mcpb` file
2. Double-click it
3. Done!

### Pros:
✅ Absolute easiest method
✅ No terminal needed
✅ No configuration files
✅ Works like installing any app
✅ Bundled dependencies

### Cons:
❌ Only for Claude Desktop
❌ Not yet available (coming soon)
❌ Manual credential entry in Claude UI

### Perfect For:
- Complete beginners
- Claude Desktop users
- People who hate terminals
- Non-developers

### How to Use (When Available):

1. Download `bayarcash-mcp-server.mcpb`
2. Double-click the file
3. Claude Desktop opens and installs it
4. Enter your credentials in the UI
5. Done!

---

## Method 5: Manual Installation 🛠️

**Difficulty:** ⭐⭐⭐ Hard
**Time:** ~5 minutes
**Requirements:** Git, Node.js, Terminal knowledge

### What You Do:
1. Clone repository
2. Install dependencies
3. Build the project
4. Manually edit config file
5. Find and replace absolute paths
6. Restart AI client

### Pros:
✅ Full control
✅ Can modify source code
✅ Local development
✅ No external dependencies

### Cons:
❌ Many manual steps
❌ Easy to make mistakes
❌ Need terminal knowledge
❌ Must manage updates manually

### Perfect For:
- Developers
- Contributors
- Customization needs
- Local development

### How to Use:

See [INSTALL.md](INSTALL.md) for detailed manual installation steps.

---

## Which Method Should I Choose?

### Choose **Automated Installer** if:
- You're not very technical
- You want step-by-step guidance
- You're installing for the first time
- You want validation that it's set up correctly

### Choose **NPX** if:
- You're comfortable editing JSON files
- You want automatic updates
- You don't want to download the repository
- You're a developer

### Choose **Smithery** if (when available):
- You want the absolute easiest method
- You like visual interfaces
- You want to discover other MCP servers
- You manage multiple MCP servers

### Choose **Desktop Extension** if (when available):
- You use Claude Desktop
- You hate using the terminal
- You want app-like installation
- You're not technical at all

### Choose **Manual** if:
- You're a developer
- You want to contribute
- You need to modify the code
- You're learning how MCP works

---

## Recommendation by User Type

### 🎓 Complete Beginner
**Best:** Desktop Extension (when available) → Automated Installer
**Avoid:** Manual installation

### 👨‍💼 Business User
**Best:** Smithery (when available) → Automated Installer
**Avoid:** Manual installation

### 👨‍💻 Developer
**Best:** NPX → Manual
**Avoid:** Desktop Extension (too limiting)

### 🧪 Testing/Learning
**Best:** NPX (easy to reinstall)
**Avoid:** Manual (too slow for iteration)

### 🏢 Enterprise/Team
**Best:** NPX (standardized) → Smithery (when available)
**Avoid:** Manual (inconsistent)

---

## Future Methods (Planned)

### GitHub MCP Registry
One command from official GitHub registry:
```bash
gh mcp install webimpian/bayarcash-mcp-server
```

### Docker
Containerized installation:
```bash
docker run -e BAYARCASH_API_TOKEN=xxx webimpian/bayarcash-mcp-server
```

### Homebrew (Mac)
```bash
brew install bayarcash-mcp-server
```

---

## Need Help Choosing?

Ask yourself:

1. **Have you used a terminal before?**
   - No → Automated Installer or Desktop Extension
   - Yes → NPX or Manual

2. **Are you comfortable with JSON?**
   - No → Automated Installer
   - Yes → NPX

3. **Do you want the easiest method possible?**
   - Yes → Desktop Extension (when available)
   - No → Your choice!

4. **Are you a developer?**
   - Yes → NPX or Manual
   - No → Automated Installer

5. **Do you need to customize the code?**
   - Yes → Manual only
   - No → Any method works!

---

## Still Confused?

**Start with the Automated Installer!** It's the safest choice and will guide you through everything. You can always try other methods later.

See [EASY_INSTALL.md](EASY_INSTALL.md) for a complete beginner's guide.
