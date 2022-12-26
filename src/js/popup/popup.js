import { features } from './features.js';

const form = document.querySelector('form');

function appendInput(feature) {
  const label = document.createElement('label');
  label.setAttribute('for', feature.name);
  label.innerHTML = `
		<div id="${feature.name}Title">
			${feature.title}
		</div>
		<div class="switch">
			<input id="${feature.name}" type="checkbox" />
			<span class="slider"></span>
		</div>
	`;
  form.appendChild(label);
  tippy(`#${feature.name}Title`, {
    content: feature.text,
  });
}

features.forEach(async (feature) => {
  appendInput(feature);
  const initialValueObject = await chrome.storage.sync.get(feature.name);
  const initialValue = initialValueObject[feature.name];
  if (initialValue === undefined) {
    initialValue = false;
    await chrome.storage.sync.set({ [feature.name]: initialValue });
  }

  const input = document.querySelector(`#${feature.name}`);
  input.checked = initialValue;

  input.addEventListener('click', async () => {
    const currentValueObject = await chrome.storage.sync.get(feature.name);
    const currentValue = currentValueObject[feature.name];
    await chrome.storage.sync.set({ [feature.name]: !currentValue });
  });
});
