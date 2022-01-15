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

const GetAnswerLink = new Feature('getAnswersLink', addHashtags, removeHashtags);