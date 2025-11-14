# Easy Installation for Non-Technical Users

This guide will help you install Bayarcash MCP Server **without any technical knowledge**. Just follow the steps!

## What You'll Need

1. **A computer** (Mac, Windows, or Linux)
2. **Node.js** installed (free software - we'll help you get it)
3. **Bayarcash API credentials** (from your Bayarcash account)
4. **An AI assistant** (Claude Desktop, Cursor, or ChatGPT Desktop)

---

## Step 1: Install Node.js (One-Time Setup)

Node.js is free software needed to run the server.

### For Mac Users:

**Option A: Easy installer (Recommended)**
1. Go to https://nodejs.org
2. Click the big green button that says "Download"
3. Open the downloaded file and follow the installation steps
4. Done!

**Option B: Using Homebrew** (if you have it)
```bash
brew install node
```

### For Windows Users:

1. Go to https://nodejs.org
2. Click the big green button "Download for Windows"
3. Run the downloaded installer
4. Click "Next" through all the steps (use default settings)
5. Done!

### For Linux Users:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Fedora:**
```bash
sudo dnf install nodejs npm
```

---

## Step 2: Get Your Bayarcash API Credentials

1. Go to https://console.bayar.cash
2. Log in to your account
3. Go to **Settings** → **API**
4. Copy your **API Token** and **API Secret Key**
5. Keep these safe - you'll need them in Step 4

---

## Step 3: Download the Server

### Option A: Using Git (if you have it)

```bash
git clone https://github.com/khairulimran-97/bayarcash-mcp-server.git
cd bayarcash-mcp-server
```

### Option B: Download ZIP

1. Go to https://github.com/khairulimran-97/bayarcash-mcp-server
2. Click the green "Code" button
3. Click "Download ZIP"
4. Unzip the file to your preferred location
5. Open Terminal/Command Prompt and navigate to that folder

---

## Step 4: Run the Installation Wizard 🪄

This is the **easiest part**! The wizard will do everything for you.

### For Mac/Linux:

Open Terminal and run:
```bash
./install.sh
```

### For Windows:

Open PowerShell and run:
```powershell
.\install.ps1
```

### What the Wizard Will Ask You:

1. **Which AI client?**
   - Type `1` for Claude Desktop (recommended)
   - Type `2` for Cursor
   - Type `3` to skip (if you want to configure manually)

2. **Your API Token**
   - Paste the API Token from Step 2

3. **Your API Secret Key**
   - Paste the API Secret Key from Step 2

4. **Use Sandbox mode?**
   - Press `Enter` or type `Y` for testing (recommended)
   - Type `N` for live payments (when you're ready)

5. **API Version**
   - Press `Enter` to use v3 (recommended)
   - Or type `v2` if you need the older version

**That's it!** The wizard will:
- Install everything needed
- Build the server
- Configure your AI client automatically
- Tell you when it's done

---

## Step 5: Restart Your AI Client

**Very Important:** You must completely restart your AI client:

### Claude Desktop:
- Quit Claude completely (File → Quit)
- Open Claude again

### Cursor:
- Quit Cursor completely
- Open Cursor again

### ChatGPT Desktop:
- Quit ChatGPT completely
- Open ChatGPT again

---

## Step 6: Test It! 🎉

Open your AI client and ask:

```
Show me available payment portals from Bayarcash
```

If it works, you'll see information about your Bayarcash portals!

---

## Even Easier: NPX Method (No Download Needed!)

If the package is published to NPM, you can skip Steps 3-4 and just configure:

### For Claude Desktop:

Edit this file:
- **Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

Replace `your_token_here` and `your_secret_here` with your actual credentials.

---

## Future: One-Click Install Methods

We're working on even easier installation methods:

### 1. Smithery.ai (Coming Soon)
Visit https://smithery.ai and search for "Bayarcash", then:
```bash
smithery install bayarcash-mcp-server
```

### 2. Desktop Extensions (.mcpb file)
Double-click to install - no terminal needed!

### 3. GitHub MCP Registry
One command to install from GitHub's marketplace.

---

## Troubleshooting

### "Command not found" error

**Problem:** Node.js is not installed or not in your PATH.

**Solution:** Go back to Step 1 and install Node.js properly.

### "Permission denied" error (Mac/Linux)

**Problem:** The install script isn't executable.

**Solution:** Run this first:
```bash
chmod +x install.sh
./install.sh
```

### Server not showing in AI client

**Solutions:**
1. ✓ Did you restart the AI client **completely**?
2. ✓ Check your config file has valid JSON (no extra commas)
3. ✓ Make sure your API credentials are correct
4. ✓ Try closing all instances of the AI client and reopening

### API errors

**Solutions:**
1. ✓ Check your API Token and Secret Key are correct
2. ✓ Make sure you copied them without extra spaces
3. ✓ Verify your Bayarcash account is active
4. ✓ Try with `BAYARCASH_SANDBOX: "true"` first

---

## Getting Help

**Stuck?** Here's how to get help:

1. **Check the docs:**
   - [README.md](README.md) - Full documentation
   - [USAGE.md](USAGE.md) - How to use the server
   - [INSTALL.md](INSTALL.md) - Detailed installation guide

2. **Ask on GitHub:**
   - https://github.com/khairulimran-97/bayarcash-mcp-server/issues

3. **Contact Bayarcash:**
   - For API issues: https://bayar.cash

---

## What Can You Do Now?

Once installed, you can ask your AI assistant to:

- ✅ Create payment intents
- ✅ Check transaction status
- ✅ List all transactions
- ✅ Get FPX banks
- ✅ Verify payment callbacks
- ✅ Manage payment portals
- ✅ Handle direct debit enrollment

Just talk to your AI in plain English! For example:

```
Create a payment for RM 100 for order #12345
Show me all successful transactions today
What FPX banks are available?
```

---

## Safety Tips

- ✓ **Always test in Sandbox mode first** (`BAYARCASH_SANDBOX: "true"`)
- ✓ **Never share your API credentials** with anyone
- ✓ **Don't commit credentials to Git** (.env is in .gitignore)
- ✓ **Monitor your Bayarcash dashboard** for activity
- ✓ **Rotate your API keys** regularly

---

Enjoy using Bayarcash with your AI assistant! 🚀
