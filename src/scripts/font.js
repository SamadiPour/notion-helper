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

    // ========================
    addStyle(`* :not(.notion-code-block *) { font-family: ${font}, ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important; } `);

    // ======================== works
    // const elements = document.evaluate("//*[contains(@style,\'font-family\')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    // for (let i = 0; i < elements.snapshotLength; i++) {
    //     elements.snapshotItem(i).style.fontFamily = font;
    // }
    // ========================
    // const selectingQuery = 'h1,h2,h3,h4,h5,h6,p,li,td,tr,pre,font,blockquote,small,center,span,a,div,strong,input';
    // const selected = document.querySelectorAll(selectingQuery);
    // for (let i = 0; i < selected.length; i++) {
    //     selected[i].style.fontFamily = `${font}, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"`;
    // }
    // ========================
    // const selectingQuery = 'h1,h2,h3,h4,h5,h6,p,li,td,tr,pre,font,blockquote,small,center,span,a,div,strong,input';
    // const selected = new Set([
    //     ...document.getElementsByClassName('notion-frame')[0].querySelectorAll(selectingQuery),
    //     ...document.getElementsByClassName('notion-topbar')[0].querySelectorAll(selectingQuery)
    // ]);
    // for (let item in selected) {
    //     item.style.fontFamily = `${font}, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"`;
    // }
    // ========================
}
