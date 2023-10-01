const tempData = {
  "https://youtube.com/shorts/" : true,
  "https://www.youtube.com/shorts/" : true,
};

// Save data to chrome.storage.local
chrome.storage.local.set({ myData: tempData }, () => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
  } else {
    console.log('Data saved to chrome.storage.local');
  }
});

let jsonData = null;
chrome.storage.local.get(['myData'], (result) => {
  jsonData = result.myData;
  if (jsonData) {
    console.log('JSON data retrieved:', jsonData);
    observerCallback()
  } else {
    console.warn('JSON data not found in storage');
  }
});


function observerCallback() {
  // check exact match
  if (jsonData[window.location.href]) {
    (async () => {
        const response = await chrome.runtime.sendMessage({ trigger: window.location.href, url: window.location.href });
    })();
    return
  }

  // check for partial match
  for (const [key, value] of Object.entries(jsonData)) {
    if (window.location.href.includes(key)) {
      (async () => {
        const response = await chrome.runtime.sendMessage({ trigger: window.location.href, url: window.location.href });
      })();
      return
    }
  }
}

function addLocationObserver(callback) {
  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: false }
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback)
  observer.observe(document.body, config)
}

addLocationObserver(observerCallback)