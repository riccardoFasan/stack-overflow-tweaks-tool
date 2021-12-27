browser.runtime.onInstalled.addListener( () => {
    browser.storage.sync.set({ addButton: false });
    browser.storage.sync.set({ highlightAnswer: false });
    browser.storage.sync.set({ hideNavBar: false });
    browser.storage.sync.set({ hideTooltipsBar: false });
});