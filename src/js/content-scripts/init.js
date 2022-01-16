const features = [HighlightAnswer, JumpToTheAnswer, GetAnswerLink, CopyCode, HideNavBar, HideTooltipsBar];

features.forEach(feature => {
	chrome.storage.sync.get(feature.name, property => {
		const value = property[feature.name];
		if (value) feature.enable();
	});
});

chrome.storage.onChanged.addListener(changes => {
	const property = Object.keys(changes)[0];
	const feature = features.find(feature => feature.name === property);
	if (feature) {
		const enable = changes[property].newValue;
		feature[enable ? 'enable' : 'disable']();
	}
});
