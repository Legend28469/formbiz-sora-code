# Sora Code Automator

A Chrome extension that automates obtaining access codes for OpenAI's Sora video generation platform by testing codes from the Formbiz community.

> **IMPORTANT:** Before starting, make sure you have these tabs already open:
> - `https://sora.chatgpt.com/explore`
> - `https://formbiz.biz/`

> **Disclaimer:** This is a quick script I made because I was tired of manually trying codes. It's timeout-based and comes with **no warranty**. It worked for me, but your mileage may vary. This tool is for educational purposes - please contribute back by sharing your working codes with the community.

## Features

- **Full Automation**: Automatically navigates between Formbiz and Sora, pasting codes and checking for success
- **Smart Tab Management**: Reuses existing tabs to keep your browser clean and efficient
- **Configurable Timing**: Carefully timed interactions to mimic human behavior and avoid rate-limiting
- **Simple Controls**: Easy start/stop button for full control over the automation process
- **Visual Feedback**: Real-time status updates so you always know what's happening

## Prerequisites

Before you begin, ensure you have:

- Google Chrome browser (version 88 or newer)
- An OpenAI account with access to Sora (you must be logged into `https://sora.chatgpt.com/explore`)
- **Note:** No Formbiz account needed - the site is publicly accessible

## Installation Guide

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

## How to Use

**BEFORE YOU START:** Open these two tabs first:
- `https://sora.chatgpt.com/explore` (make sure you're logged in)
- `https://formbiz.biz/`

Then:

1. **Start**: Click the extension icon and press "Start Automation"

2. **Monitor**: Watch the status updates in the popup as the extension:
   - Clicks the code button on Formbiz every 1.5 seconds
   - Tests codes on Sora's input field
   - Repeats the process until successful

3. **Success**: When a code works, the extension will stop automatically and you'll have Sora access!

**Note:** This extension relies heavily on timeouts and timing. It's not perfect, but it worked for me. If it doesn't work for you, you may need to adjust the timing in the code or try manually.

## Community Sharing

### Pay It Forward

Once you successfully gain access to Sora, please contribute back to the community:

1. Return to Formbiz
2. Post your new, working code
3. Help others get access just like you did

This creates a virtuous cycle where everyone benefits from shared access opportunities.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Extension won't load | Check that all files are in the same folder and manifest.json is valid |
| Automation stops working | Ensure you're logged into both sites and try restarting the extension |
| Tabs not reusing properly | The extension automatically handles tab reuse, but you can manually close duplicates |
| "Service at capacity" on Sora | This is normal during peak times; the extension will continue trying |

## Important Notes

- **No Warranty**: This is a quick script that worked for me. It's heavily timeout-based and may not work perfectly for everyone
- **Legal Use**: This extension automates manual processes but should not be used to violate any terms of service
- **Rate Limiting**: The timing is configured to be respectful to both platforms' servers
- **Browser Requirements**: Requires Chrome 88+ for Manifest V3 compatibility
- **Updates**: Check back regularly for new versions as website structures may change
- **Timing Issues**: If it's not working, the timeouts may need adjustment for your system/connection speed

## A Thank You for Reading

If you found this project helpful, here's a code to try. Remember, codes expire quickly due to high demand, so this likely won't work by the time you use it, but it's a starting point!

**My Code:** `AHMVFA`

> **Pro Tip:** Codes typically work for only a short time after being posted. The "freshness" of a code is the most important factor for success. If my code doesn't work, don't get discouraged - this extension will find a working one for you!