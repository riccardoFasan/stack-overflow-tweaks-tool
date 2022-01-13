const options = [
	{
		name: 'addButton',
		title: 'Highlight the correct answer',
		text: 'The correct answer, if any, will be highlighted with a green background.',
	},
	{
		name: 'highlightAnswer',
		title: 'Jump to the answer',
		text: 'If ther\'s a correct answer, a button will be added in the question header, next to the "ask a question" button. When you click the new button, the page will scroll to the correct answer.',
	},
	{
		name: 'getAnswersLink',
		title: 'Copy answers link',
		text: 'A # will appear next to each answer. By clicking it the link of that answer will be copied on your clickboard.',
	},
	{
		name: 'hideNavBar',
		title: 'Hide the navigation bar',
		text: 'The left navigation will be hide in order to improve your focus.',
	},
	{
		name: 'hideTooltipsBar',
		title: 'Hide the tooltips bar',
		text: 'The tooltips and the hot question network will be hide in order to improve your focus.',
	},
];

const form = document.querySelector('form');

function appendInput(option) {
	const label = document.createElement('label');
	label.setAttribute('for', option.name);
	label.innerHTML = `
		<div>
			<div>${option.title}</div>
			<p>${option.text}</p>
		</div>
		<div class="switch">
			<input id="${option.name}" type="checkbox" />
			<span class="slider"></span>
		</div>
	`;
	form.appendChild(label);
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

options.forEach(option => {
	appendInput(option);
	getStorageValue(option.name).then(defaultValue => {
		if (defaultValue === undefined) {
			defaultValue = false;
			setStorageValue(option.name, defaultValue);
		}

		const input = document.querySelector(`#${option.name}`);
		input.checked = defaultValue;

		input.addEventListener('click', () => {
			getStorageValue(option.name).then(currentValue => {
				setStorageValue(option.name, !currentValue);
			});
		});
	});
});
