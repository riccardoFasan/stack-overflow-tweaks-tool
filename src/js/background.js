// * https://developer.chrome.com/docs/extensions/reference/runtime/#type-OnInstalledReason
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      jumpToTheAnswer: false,
      jumpToTheMostVoted: false,
      highlightAnswer: false,
      getAnswersLink: false,
      copyCode: false,
      hideNavBar: false,
      hideTooltipsBar: false,
    });
  }
});
