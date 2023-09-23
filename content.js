console.log("Hello from content.js");
(async () => {
    const response = await chrome.runtime.sendMessage({ trigger: "hello" });
    console.log(response);
})();