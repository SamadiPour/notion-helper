chrome.storage.local.get(['font', 'fontSize'], (res) => {
    setFont(res['font'],res['fontSize']);
});

function setFont(font, size) {
    if (typeof font !== 'string' && !(font instanceof String)) {
        return;
    }

    const addStyle = (styleString) => {
        const element = document.getElementById('custom-font-injected');
        if (element) {
            element.textContent = styleString;
        } else {
            const style = document.createElement('style');
            style.id = 'custom-font-injected'
            style.textContent = styleString;
            document.head.append(style);
        }
    }

    addStyle(
        `* :not(.notion-code-block *) { font-family: ${font ? '"' + font + '",' : ''} ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important; }\n`
        + `div.notion-page-content { font-size: ${size}px !important; }\n`
        + `div.notion-bookmark-block  div.notion-focusable > div > div:first-child { font-size: ${size - 2}px !important; }\n`
        + `div.notion-bookmark-block  div.notion-focusable > div > div:not(:first-child), div.notion-bookmark-block  div.notion-focusable > div > div:not(:first-child) > div { font-size: ${size - 4}px !important; }\n`
    );
}
