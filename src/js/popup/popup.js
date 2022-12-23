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
  let defaultValue = await chrome.storage.sync.get(feature.name);
  if (defaultValue === undefined) {
    defaultValue = false;
    await chrome.storage.sync.set(feature.name, defaultValue);
  }

  const input = document.querySelector(`#${feature.name}`);
  input.checked = defaultValue;

  input.addEventListener('click', async () => {
    const currentValue = await chrome.storage.sync.get(feature.name);
    await chrome.storage.sync.set(feature.name, !currentValue);
  });
});
