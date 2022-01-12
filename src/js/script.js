const body = document.querySelector('body');
const correctAnswer = body.querySelector('.accepted-answer');

/* ================
Highlight answer
================ */

function updateCorrectAnswerStyle() {
	highlightAnswer();
	removePreviousAnswerBorder();
}

function highlightAnswer() {
	correctAnswer.classList.toggle('bg-green');
}

function removePreviousAnswerBorder() {
	const previousAnswer = correctAnswer.previousElementSibling.previousElementSibling;
	if (previousAnswer) previousAnswer.style.borderBottom = 'unset';
}

function removeAnswerHighlightment() {
	highlightAnswer();
}

/* ================
Jump to the answer
================ */

const header = body.querySelector('header.top-bar');
const questionHeader = body.querySelector('#question-header');

const iconPath = 'icons/stackOverflowBulb.svg';

function injectButton() {
	const button = document.createElement('button');
	button.setAttribute('id', 'jumpToAnswerButton');
	button.setAttribute('class', 'ws-nowrap s-btn s-btn__primary');

	const text = document.createElement('div');
	text.setAttribute('class', 'text');
	text.innerText = 'Jump to the Answer';

	const icon = document.createElement('div');
	icon.setAttribute('class', 'icon');
	icon.style.backgroundImage = `url(${getImageURL()})`;

	questionHeader.appendChild(button);
	button.appendChild(icon);
	button.appendChild(text);

	button.addEventListener('click', () => {
		jumpToTheAnswer();
	});
}

function getImageURL() {
	return chrome.runtime.getURL(iconPath);
}

function jumpToTheAnswer() {
	const position = getAnswerPosition();
	window.scrollTo(0, position);
}

function getAnswerPosition() {
	const answerTopPosition = correctAnswer.offsetTop;
	const heanderHeight = header.clientHeight;
	return answerTopPosition - heanderHeight;
}

function removeButton() {
	const button = questionHeader.querySelector('#jumpToAnswerButton');
	button.remove();
}

/* ================
Copy answer link
================ */

const answers = body.querySelectorAll('#answers div.answer');

function addHashtags() {
	answers.forEach(answer => {
		addHashtagToAnswer(answer);
	});
}

function addHashtagToAnswer(answer) {
	const votingContainer = answer.querySelector('.js-voting-container');
	const buttonUp = votingContainer.querySelector('.js-vote-up-btn');
	const hashtag = document.createElement('div');

	hashtag.setAttribute('class', 'hashtag');
	hashtag.setAttribute('title', 'Click to copy the answer link.');
	hashtag.innerText = '#';

	votingContainer.insertBefore(hashtag, buttonUp);

	const answerId = answer.getAttribute('id');

	hashtag.addEventListener('click', () => {
		const link = getAnswerLink(answerId);
		copyToClipboard(link);
	});
}

function getAnswerLink(answerId) {
	return `https://${window.location.hostname}/${window.location.pathname}#${answerId}`;
}

function removeHashtags() {
	answers.forEach(answer => {
		const hashtag = answer.querySelector('.hashtag');
		hashtag.remove();
	});
}

/* ================
Utilities
================ */

const darkGreen = '#273C3B';
const lightGreen = '#dffde8';

setGreen();

function setGreen() {
	const isDarkTheme = body.classList.contains('theme-dark');
	const green = isDarkTheme ? darkGreen : lightGreen;
	document.documentElement.style.setProperty('--green', green);
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

/* ================
Show or hide side navs
================ */

const navigationBar = body.querySelector('#left-sidebar');
const tooltipsBar = body.querySelector('#sidebar');

const container = body.querySelector('#content');
const content = container.querySelector('#mainbar');

function showOrHideNavigationBar() {
	navigationBar.classList.toggle('w-0');
}

function showOrHideTooltipsBar() {
	tooltipsBar.classList.toggle('d-none');
}

function setContainerBorder() {
	container.classList.toggle('no-border');
}

function resizeContent() {
	content.classList.toggle('w-100');
}

/* ================
Configuration
================ */

const configurations = [
	{
		property: 'addButton',
		enableFeature: () => {
			if (correctAnswer) injectButton();
		},
		disableFeature: () => {
			if (correctAnswer) removeButton();
		},
	},
	{
		property: 'highlightAnswer',
		enableFeature: () => {
			if (correctAnswer) updateCorrectAnswerStyle();
		},
		disableFeature: () => {
			if (correctAnswer) removeAnswerHighlightment();
		},
	},
	{
		property: 'getAnswersLink',
		enableFeature: () => {
			addHashtags();
		},
		disableFeature: () => {
			removeHashtags();
		},
	},
	{
		property: 'hideNavBar',
		enableFeature: () => {
			showOrHideNavigationBar();
			setContainerBorder();
		},
		disableFeature: () => {
			showOrHideNavigationBar();
			setContainerBorder();
		},
	},
	{
		property: 'hideTooltipsBar',
		enableFeature: () => {
			showOrHideTooltipsBar();
			resizeContent();
		},
		disableFeature: () => {
			showOrHideTooltipsBar();
			resizeContent();
		},
	},
];

configurations.forEach(configuration => {
	chrome.storage.sync.get(configuration.property, property => {
		const value = property[configuration.property];
		if (value) configuration.enableFeature();
	});
});

chrome.storage.onChanged.addListener(changes => {
	const property = Object.keys(changes)[0];
	const configuration = configurations.find(configuration => configuration.property === property);
	if (configuration) {
		const enable = changes[property].newValue;
		configuration[enable ? 'enableFeature' : 'disableFeature']();
	}
});
