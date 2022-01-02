const options = [
  'addButton',
  'highlightAnswer',
  'hideNavBar',
  'hideTooltipsBar',
];

function setStorageValue(propertyName, propertyValue) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [propertyName]: propertyValue });
    resolve();
  });
}

function getStorageValue(propertyName) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(propertyName, (property) => {
      resolve(property[propertyName]);
    });
  });
}

options.forEach((option) => {
  getStorageValue(option).then((defaultValue) => {
    if (defaultValue === undefined) {
      defaultValue = false;
      setStorageValue(option, defaultValue);
    }

    const input = document.querySelector(`#${option}`);
    input.checked = defaultValue;

    input.addEventListener('click', () => {
      getStorageValue(option).then((currentValue) => {
        setStorageValue(option, !currentValue);
      });
    });
  });
});
