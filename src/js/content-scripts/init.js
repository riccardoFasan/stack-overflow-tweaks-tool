const features = [
  HighlightAnswer,
  JumpToTheMostVoted,
  JumpToTheAnswer,
  GetAnswerLink,
  CopyCode,
  HideNavBar,
  HideTooltipsBar,
];

features.forEach(async (feature) => {
  const initialValueObject = await chrome.storage.sync.get(feature.name);
  const value = initialValueObject[feature.name];
  if (value) feature.enable();
});

chrome.storage.onChanged.addListener((changes) => {
  const property = Object.keys(changes)[0];
  const feature = features.find((feature) => feature.name === property);
  if (feature) {
    const enable = changes[property].newValue;
    feature[enable ? 'enable' : 'disable']();
  }
});
