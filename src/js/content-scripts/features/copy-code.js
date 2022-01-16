function addCopyButtons() {
	answers.forEach(answer => {
		const blocks = answer.querySelectorAll('.answercell .s-prose.js-post-body pre');
		blocks.forEach(block => {
			addCopyButton(block);
		});
	});
}

function addCopyButton(block) {
	block.style.position = 'relative';
	const button = document.createElement('button');
	button.setAttribute('class', 'copy-button');
	button.setAttribute('title', 'Click to copy.');
	button.style.backgroundImage = `url(${getImageURL(copyPath)})`;
	block.appendChild(button);
}

function removeCopyButtons() {
	answers.forEach(answer => {
		const buttons = answer.querySelectorAll('pre button.copy-button');
		buttons.forEach(button => {
			button.remove();
		});
	});
}

const CopyCode = new Feature('copyCode', addCopyButtons, removeCopyButtons);
