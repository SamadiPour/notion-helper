window.onload = function () {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0].url.includes('notion.so') || tabs[0].url.includes('notion.site')) {
            document.getElementById('toggleRtl').addEventListener('change', toggleRtl);
            document.getElementById('font').addEventListener('keyup', changeFont);
            chrome.storage.local.get(['font', 'rtlEnabled'], (res) => {
                document.getElementById('font').value = res.font;
                document.getElementById('toggleRtl').checked = res.rtlEnabled;
            });
        } else {
            document.body.innerText = 'This extension only works on Notion.so and Notion.site.';
            document.body.style.width = '190px';
        }
    });
}

async function toggleRtl() {
    const checked = document.getElementById('toggleRtl').checked;
    await chrome.storage.local.set({'rtlEnabled': checked});
    await chrome.tabs.reload();
}

async function changeFont() {
    const font = document.getElementById('font').value;
    await chrome.storage.local.set({'font': font});

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                file: '/src/scripts/font.js',
            },
        );
    });
}