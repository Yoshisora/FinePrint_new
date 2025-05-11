chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "SET_BADGE") {
      chrome.action.setBadgeText({ text: msg.text || '' });
      chrome.action.setBadgeBackgroundColor({ color: msg.color || '#FF0000' });
    }
  });
  