chrome.storage.local.get(['font'], (res) => {
    setFont(res['font']);
});

function setFont(font) {
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

    addStyle(`* :not(.notion-code-block *) { font-family: ${font ? '"' + font + '",' : ''} ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important; } `);
}
