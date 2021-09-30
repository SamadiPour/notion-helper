let rtlEnabled = true;
let font = '';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({'rtlEnabled': rtlEnabled, 'font': font}, null);
})