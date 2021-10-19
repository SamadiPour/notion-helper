let rtlEnabled = true;
let font = '';
let fontSize = 16

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        'rtlEnabled': rtlEnabled,
        'font': font,
        'fontSize': fontSize,
    }, null);
})