# 🚀 Sora Code Automator

A powerful Chrome extension designed to automate the process of obtaining access codes for OpenAI's Sora video generation platform. This tool tirelessly tests codes from the Formbiz community until it successfully grants you access.

> **Disclaimer:** This tool is intended for educational purposes and to streamline a manual process. Users are encouraged to contribute back to the community by sharing their working codes.

## ✨ Features

- 🤖 **Full Automation**: Automatically navigates between Formbiz and Sora, pasting codes and checking for success.
- 🔄 **Smart Tab Management**: Reuses existing tabs to keep your browser clean and efficient.
- ⏱️ **Configurable Timing**: Carefully timed interactions to mimic human behavior and avoid rate-limiting.
- 🎮 **Simple Controls**: Easy start/stop button for full control over the automation process.
- 👁️ **Visual Feedback**: Real-time status updates so you always know what's happening.

## 📋 Prerequisites

Before you begin, ensure you have the following:

- Google Chrome browser (version 88 or newer)
- Active accounts on:
  - OpenAI Sora
  - Formbiz code sharing platform

## 🔧 Installation Guide

### Step 1: Download the Extension Files

Create a new folder on your computer for the extension and save all the files from this project into it. You should have these files:

- `manifest.json`
- `background.js`
- `popup.html`
- `popup.js`
- `content-script.js`

### Step 2: Load the Extension in Chrome

1. Open Google Chrome and navigate to:
   ```
   chrome://extensions/
   ```

2. Enable **Developer Mode** by toggling the switch in the top-right corner.

3. Click the **"Load unpacked"** button that appears.

4. Select the folder where you saved your extension files.

5. The Sora Code Automator extension should now appear in your extensions list and toolbar.

### Step 3: Permission Explanation

The extension requires these permissions to function properly:

- **tabs & activeTab**: To manage and reuse tabs between Formbiz and Sora
- **scripting**: To interact with page elements and paste codes
- **Host permissions**: For Formbiz and Sora websites to perform automation

## 🎮 How to Use

1. **Start**: Log into both Formbiz and Sora in separate tabs, then click the extension icon and press "Start Automation"

2. **Monitor**: Watch the status updates in the popup as the extension:
   - Clicks the code button on Formbiz every 1.5 seconds
   - Tests codes on Sora's input field
   - Repeats the process until successful

3. **Success**: When a code works, the extension will stop automatically and you'll have Sora access!

## 🔄 Community Sharing

### Pay It Forward ✨

Once you successfully gain access to Sora, please contribute back to the community:

1. Return to Formbiz
2. Post your new, working code
3. Help others get access just like you did

This creates a virtuous cycle where everyone benefits from shared access opportunities.

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Extension won't load | Check that all files are in the same folder and manifest.json is valid |
| Automation stops working | Ensure you're logged into both sites and try restarting the extension |
| Tabs not reusing properly | The extension automatically handles tab reuse, but you can manually close duplicates |
| "Service at capacity" on Sora | This is normal during peak times; the extension will continue trying |

## ⚠️ Important Notes

- **Legal Use**: This extension automates manual processes but should not be used to violate any terms of service
- **Rate Limiting**: The timing is configured to be respectful to both platforms' servers
- **Browser Requirements**: Requires Chrome 88+ for the Manifest V3 compatibility
- **Updates**: Check back regularly for new versions as website structures may change

## 🙏 A Thank You for Reading

If you found this project helpful, here's a code to try. Remember, codes expire quickly due to high demand, so this likely won't work by the time you use it, but it's a starting point!

**My Code:** `AHMVFA`

> ⚡ **Pro Tip:** Codes typically work for only a short time after being posted. The "freshness" of a code is the most important factor for success. If my code doesn't work, don't get discouraged - this extension will find a working one for you!