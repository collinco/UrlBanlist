chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("service worker got message" + request.url)
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                chrome.tabs.remove(tabs[0].id);
                const urlToDelete = request.url;
                chrome.history.deleteUrl({ url: urlToDelete }, () => {
                    console.log('History entry deleted:', urlToDelete);
                });
            }
        });
    }
);