function injectButton() {
	if (mostVoted) {
		const button = document.createElement('button');
		button.setAttribute('id', 'jumpToTheMostVotedButton');
		button.setAttribute('class', 'ws-nowrap s-btn s-btn__filled s-btn__sm');

		const text = document.createElement('div');
		text.setAttribute('class', 'text');
		text.innerText = 'Jump to most voted';

		questionHeader.appendChild(button);
		button.appendChild(text);

		button.addEventListener('click', () => {
			jumpToTheMostVoted();
		});
	}


}

function jumpToTheMostVoted() {
	const position = getAnswerPosition();
	window.scrollTo(0, position);
}

function getAnswerPosition() {
	const answerTopPosition = mostVoted.offsetTop;
	const headerHeight = header.clientHeight;
	return answerTopPosition - headerHeight;
}

function removeButton() {
	if (mostVoted) {
		const button = questionHeader.querySelector('#jumpToTheMostVotedButton');
		button.remove();
	}
}

const JumpToTheMostVoted = new Feature('jumpToTheMostVoted', injectButton, removeButton);
