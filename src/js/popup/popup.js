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

function setStorageValue(propertyName, propertyValue) {
	return new Promise(resolve => {
		chrome.storage.sync.set({ [propertyName]: propertyValue });
		resolve();
	});
}

function getStorageValue(propertyName) {
	return new Promise(resolve => {
		chrome.storage.sync.get(propertyName, property => {
			resolve(property[propertyName]);
		});
	});
}

features.forEach(feature => {
	appendInput(feature);
	getStorageValue(feature.name).then(defaultValue => {
		if (defaultValue === undefined) {
			defaultValue = false;
			setStorageValue(feature.name, defaultValue);
		}

		const input = document.querySelector(`#${feature.name}`);
		input.checked = defaultValue;

		input.addEventListener('click', () => {
			getStorageValue(feature.name).then(currentValue => {
				setStorageValue(feature.name, !currentValue);
			});
		});
	});
});
