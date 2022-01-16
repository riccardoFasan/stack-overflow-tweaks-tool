const injectableIcons = [
	{
		name: 'bulb',
		path: 'icons/stackOverflowBulb.svg',
	},
	{
		name: 'copy',
		path: 'icons/copy.svg',
	},
];

const darkGreen = '#273C3B';
const lightGreen = '#dffde8';

const body = document.querySelector('body');

const header = body.querySelector('header.top-bar');
const questionHeader = body.querySelector('#question-header');

const answers = body.querySelectorAll('#answers div.answer');
const correctAnswer = body.querySelector('.accepted-answer');

const navigationBar = body.querySelector('#left-sidebar');
const tooltipsBar = body.querySelector('#sidebar');

const container = body.querySelector('#content');
const content = container.querySelector('#mainbar');

function setGreen() {
	const isDarkTheme = body.classList.contains('theme-dark');
	const green = isDarkTheme ? darkGreen : lightGreen;
	setStyleVariable('green', green);
}

setGreen();

injectableIcons.forEach(icon => {
	setStyleVariable(icon.name, `url('${getImageURL(icon.path)}')`);
})

function getImageURL(path) {
	return chrome.runtime.getURL(path);
}

function setStyleVariable(name, value) {
	document.documentElement.style.setProperty(`--${name}`, value);
}

function appendClipboardAlert() {
	const clipboard = document.createElement('div');
	clipboard.setAttribute('id', 'clipboard-alert');
	clipboard.innerText = 'Copied to clipboard!';
	body.appendChild(clipboard);
}

appendClipboardAlert();
const clipboard = document.getElementById('clipboard-alert');

function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	clipboard.classList.add('show');
	setTimeout(() => {
		clipboard.classList.remove('show');
	}, 1000);
}
