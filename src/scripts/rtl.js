chrome.storage.local.get(['rtlEnabled'], (res) => {
    if (res.rtlEnabled)
        makeRtl();
});

function makeRtl() {
    const GM_addStyle =
        function (css) {
            const style = document.getElementById("GM_addStyleBy8626") || (function () {
                const style = document.createElement('style');
                style.type = 'text/css';
                style.id = "GM_addStyleBy8626";
                document.head.appendChild(style);
                return style;
            })();
            const sheet = style.sheet;
            sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
        };

    GM_addStyle(".notion-selectable * { text-align: start !important; }");
    GM_addStyle(".notion-selectable.notion-to_do-block > div > div:nth-of-type(2) { margin-right: 4px !important; }");

    const blackListClasses = ['notion-collection-item', 'notion-collection_view-block'];
    const containsClasses = function (element, classesNames) {
        for (let index = 0; index < classesNames.length; index++) {
            if (element.classList.contains(classesNames[index])) {
                return true;
            }
        }
        return false;
    };
    const notionPageCallback = function (mutations, _) {
        for (let i = 0; i < mutations.length; i++) {
            for (let j = 0; j < mutations[i].addedNodes.length; j++) {
                const addedNode = mutations[i].addedNodes[j];
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    if (addedNode.tagName === 'DIV' && addedNode.classList.contains('notion-selectable') && !containsClasses(addedNode, blackListClasses)) {
                        addedNode.setAttribute('dir', 'auto');
                    }
                    const divChildren = addedNode.getElementsByClassName('notion-selectable');
                    for (let y = 0; y < divChildren.length; y++) {
                        if (!containsClasses(divChildren[y], blackListClasses)) {
                            divChildren[y].setAttribute('dir', 'auto');
                        }
                    }
                }
            }
        }
    };
    const notionPagesWeakMap = new WeakMap();
    const documentCallback = function (_, __) {
        const notionPages = document.getElementsByClassName('notion-page-content');
        for (let notionPageIndex = 0; notionPageIndex < notionPages.length; notionPageIndex++) {
            if (!notionPagesWeakMap.has(notionPages[notionPageIndex])) {
                const divElements = notionPages[notionPageIndex].getElementsByClassName('notion-selectable');
                for (let notionSelectableIndex = 0; notionSelectableIndex < divElements.length; notionSelectableIndex++) {
                    if (!containsClasses(divElements[notionSelectableIndex], blackListClasses)) {
                        divElements[notionSelectableIndex].setAttribute('dir', 'auto');
                    }
                }
                const pageObserver = new MutationObserver(notionPageCallback);
                pageObserver.observe(notionPages[notionPageIndex], {subtree: true, childList: true});
                notionPagesWeakMap.set(notionPages[notionPageIndex], pageObserver);
            }
        }
        document.querySelectorAll(`
            [placeholder="Untitled"]:not([dir]),
            div.notion-sidebar-container div.notion-scroller.vertical div.notranslate:not(.notion-record-icon)
        `)
            .forEach((block) => block.setAttribute('dir', 'auto'));
    };
    const documentObserver = new MutationObserver(documentCallback);

    documentObserver.observe(document, {
        subtree: true,
        childList: true
    });
}