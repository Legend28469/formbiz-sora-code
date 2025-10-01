// Global state management
let automationState = {
  active: false,
  formbizTabId: null,
  soraTabId: null,
  clickInterval: null,
  currentStep: 'idle'
};

// Reuse or create tabs
async function getOrCreateTab(url) {
  const tabs = await chrome.tabs.query({ url: `${url}/*` });
  if (tabs.length > 0) {
    await chrome.tabs.update(tabs[0].id, { active: true });
    return tabs[0].id;
  } else {
    const newTab = await chrome.tabs.create({ url, active: true });
    return newTab.id;
  }
}

// Check if element exists using XPath
async function checkElementExists(xpath, tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: (xpath) => {
        const element = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        return !!element;
      },
      args: [xpath]
    });
    return results[0].result;
  } catch (error) {
    console.error('Error checking element:', error);
    return false;
  }
}

// Click element by XPath
async function clickElement(xpath, tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: (xpath) => {
        const element = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (element) {
          element.click();
          return true;
        }
        return false;
      },
      args: [xpath]
    });
    return results[0].result;
  } catch (error) {
    console.error('Error clicking element:', error);
    return false;
  }
}

// Read from clipboard
async function readClipboard(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: async () => {
        try {
          const text = await navigator.clipboard.readText();
          return text;
        } catch (error) {
          console.error('Clipboard read failed:', error);
          return null;
        }
      }
    });
    return results[0].result;
  } catch (error) {
    console.error('Error reading clipboard:', error);
    return null;
  }
}

// Paste text into input field
async function pasteIntoInput(xpath, text, tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: (xpath, text) => {
        const element = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (element) {
          element.focus();
          element.value = text;
          // Trigger events to ensure the input is recognized
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        return false;
      },
      args: [xpath, text]
    });
    return results[0].result;
  } catch (error) {
    console.error('Error pasting into input:', error);
    return false;
  }
}

// Main automation workflow
async function startAutomation() {
  if (automationState.active) return;

  automationState.active = true;
  automationState.currentStep = 'starting';

  try {
    // Step 1: Navigate to FormBiz
    automationState.currentStep = 'navigating_to_formbiz';
    automationState.formbizTabId = await getOrCreateTab('https://formbiz.biz/');

    // Wait for page load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 2: Click first button every 1.5 seconds until second button appears
    automationState.currentStep = 'clicking_first_button';
    await startFirstButtonClicking();

  } catch (error) {
    console.error('Automation failed:', error);
    stopAutomation();
  }
}

// Handle first button clicking phase
async function startFirstButtonClicking() {
  automationState.clickInterval = setInterval(async () => {
    if (!automationState.active) {
      clearInterval(automationState.clickInterval);
      return;
    }

    try {
      // Check if second button is available
      const secondButtonAvailable = await checkElementExists(
        '/html/body/div[2]/div[2]/div/div[1]/section[1]/div/div[2]/button',
        automationState.formbizTabId
      );

      if (secondButtonAvailable) {
        clearInterval(automationState.clickInterval);
        await handleSecondButton();
      } else {
        // Click the first button
        await clickElement(
          '/html/body/div[2]/div[2]/div/div[1]/section[1]/div/div/div[3]/button',
          automationState.formbizTabId
        );
      }
    } catch (error) {
      console.error('Error in click interval:', error);
    }
  }, 1500);
}

// Handle second button and SORA workflow
async function handleSecondButton() {
  automationState.currentStep = 'handling_second_button';

  try {
    // Click the second button
    await clickElement(
      '/html/body/div[2]/div[2]/div/div[1]/section[1]/div/div[2]/button',
      automationState.formbizTabId
    );

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to SORA
    automationState.currentStep = 'navigating_to_sora';
    automationState.soraTabId = await getOrCreateTab('https://sora.chatgpt.com/explore');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Check if input exists and interact
    const inputExists = await checkElementExists(
      '//*[@id="radix-:r17:"]/div/div[2]/div/div/div[2]/input',
      automationState.soraTabId
    );

    if (inputExists) {
      automationState.currentStep = 'pasting_to_sora';

      // Read from clipboard
      const clipboardText = await readClipboard(automationState.soraTabId);

      if (!clipboardText) {
        console.error('Failed to read clipboard or clipboard is empty');
        stopAutomation();
        return;
      }

      // Paste clipboard content
      await pasteIntoInput(
        '//*[@id="radix-:r17:"]/div/div[2]/div/div/div[2]/input',
        clipboardText,
        automationState.soraTabId
      );

      // Click the SORA button
      await clickElement(
        '//*[@id="radix-:r17:"]/div/div[3]/div[1]/div/button',
        automationState.soraTabId
      );

      // Wait and check if input still exists
      await new Promise(resolve => setTimeout(resolve, 2000));

      const inputStillExists = await checkElementExists(
        '//*[@id="radix-:r17:"]/div/div[2]/div/div/div[2]/input',
        automationState.soraTabId
      );

      if (inputStillExists) {
        automationState.currentStep = 'returning_to_formbiz';
        // Go back to FormBiz and click the third button
        await chrome.tabs.update(automationState.formbizTabId, { active: true });
        await new Promise(resolve => setTimeout(resolve, 1000));

        await clickElement(
          '/html/body/div[2]/div[2]/div/div[1]/section[1]/div/div[2]/div/button[2]',
          automationState.formbizTabId
        );

        // Wait and restart the process
        await new Promise(resolve => setTimeout(resolve, 2000));
        await startFirstButtonClicking();
      } else {
        // Success!
        automationState.currentStep = 'success';
        console.log('Success! Process completed.');
        stopAutomation();
      }
    }

  } catch (error) {
    console.error('Error in handleSecondButton:', error);
    stopAutomation();
  }
}

function stopAutomation() {
  automationState.active = false;
  automationState.currentStep = 'idle';

  if (automationState.clickInterval) {
    clearInterval(automationState.clickInterval);
    automationState.clickInterval = null;
  }

  // Update popup if it exists
  chrome.runtime.sendMessage({ action: 'stateUpdate', state: automationState });
}

// Message listener for popup communication
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'startAutomation':
      startAutomation();
      sendResponse({ success: true });
      break;

    case 'stopAutomation':
      stopAutomation();
      sendResponse({ success: true });
      break;

    case 'getState':
      sendResponse({ state: automationState });
      break;
  }
});

// Initialize storage
chrome.runtime.onStartup.addListener(() => {
  automationState = {
    active: false,
    formbizTabId: null,
    soraTabId: null,
    clickInterval: null,
    currentStep: 'idle'
  };
});
