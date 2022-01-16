chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ addButton: false });
	chrome.storage.sync.set({ highlightAnswer: false });
	chrome.storage.sync.set({ getAnswersLink: false });
	chrome.storage.sync.set({ copyCode: false });
	chrome.storage.sync.set({ hideNavBar: false });
	chrome.storage.sync.set({ hideTooltipsBar: false });
});
