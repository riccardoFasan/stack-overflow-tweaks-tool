chrome.runtime.onInstalled.addListener(() => {
	browser.storage.sync.set({ jumpToTheAnswer: false });
	browser.storage.sync.set({ highlightAnswer: false });
	browser.storage.sync.set({ getAnswersLink: false });
	browser.storage.sync.set({ copyCode: false });
	browser.storage.sync.set({ hideNavBar: false });
	browser.storage.sync.set({ hideTooltipsBar: false });
});
