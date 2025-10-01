document.addEventListener('DOMContentLoaded', async () => {
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const statusDiv = document.getElementById('status');

  // Get current state from background
  const response = await chrome.runtime.sendMessage({ action: 'getState' });
  updateUI(response.state);

  // Start button handler
  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    statusDiv.textContent = 'Starting automation...';
    statusDiv.className = 'status status-active';

    await chrome.runtime.sendMessage({ action: 'startAutomation' });
  });

  // Stop button handler
  stopBtn.addEventListener('click', async () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    statusDiv.textContent = 'Stopped';
    statusDiv.className = 'status status-idle';

    await chrome.runtime.sendMessage({ action: 'stopAutomation' });
  });

  // Listen for state updates from background
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'stateUpdate') {
      updateUI(message.state);
    }
  });

  function updateUI(state) {
    if (state.active) {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      statusDiv.textContent = `Running: ${state.currentStep}`;
      statusDiv.className = 'status status-active';
    } else {
      startBtn.disabled = false;
      stopBtn.disabled = true;
      statusDiv.textContent = 'Ready to start';
      statusDiv.className = 'status status-idle';
    }
  }
});
