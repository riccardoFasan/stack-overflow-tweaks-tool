function injectButton() {
	if (correctAnswer) {
		const button = document.createElement('button');
		button.setAttribute('id', 'jumpToAnswerButton');
		button.setAttribute('class', 'ws-nowrap s-btn s-btn__primary');

		const text = document.createElement('div');
		text.setAttribute('class', 'text');
		text.innerText = 'Jump to the Answer';

		const icon = document.createElement('div');
		icon.setAttribute('class', 'icon');
		icon.style.backgroundImage = `url(${getImageURL(bulbPath)})`;

		questionHeader.appendChild(button);
		button.appendChild(icon);
		button.appendChild(text);

		button.addEventListener('click', () => {
			jumpToTheAnswer();
		});
	}
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
	if (correctAnswer) {
		const button = questionHeader.querySelector('#jumpToAnswerButton');
		button.remove();
	}
}

const JumpToTheAnswer = new Feature('jumpToTheAnswer', injectButton, removeButton);
