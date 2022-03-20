import { features } from './features.js';

const form = document.querySelector('form');

function appendInput(feature) {
	const label = document.createElement('label');
	label.setAttribute('for', feature.name);
	label.innerHTML = `
		<div>
			<div>${feature.title}</div>
			<p>${feature.text}</p>
		</div>
		<div class="switch">
			<input id="${feature.name}" type="checkbox" />
			<span class="slider"></span>
		</div>
	`;
	form.appendChild(label);
}

function setStorageValue(propertyName, propertyValue) {
	return new Promise(resolve => {
		browser.storage.sync.set({ [propertyName]: propertyValue });
		resolve();
	});
}

function getStorageValue(propertyName) {
	return new Promise(resolve => {
		browser.storage.sync.get(propertyName, property => {
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
