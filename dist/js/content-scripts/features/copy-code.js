function addCopyButtons() {
	[...answers, question].forEach(answer => {
		const blocks = answer.querySelectorAll('pre.s-code-block');
		blocks.forEach(block => {
			addCopyButton(block);
		});
	});
}

const copyClasses = isDarkTheme ? 'copy-button dark' : 'copy-button';

function addCopyButton(block) {
	const button = document.createElement('button');
	button.setAttribute('class', copyClasses);
	button.setAttribute('title', 'Click to copy.');

	const icon = document.createElement('div');

	icon.setAttribute('class', 'icon copy');

	button.appendChild(icon);
	block.appendChild(button);

	const code = block.querySelector('code');

	button.addEventListener('click', () => {
		const plainText = getPlainText(code.innerHTML);
		copyToClipboard(plainText);
	});
}

function getPlainText(html) {
	//stackoverflow.com//questions/15180173/convert-html-to-plain-text-in-js-without-browser-environment#answer-20071776
	html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
	html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
	html = html.replace(/<\/div>/gi, '\n');
	html = html.replace(/<\/li>/gi, '\n');
	html = html.replace(/<li>/gi, '  *  ');
	html = html.replace(/<\/ul>/gi, '\n');
	html = html.replace(/<\/p>/gi, '\n');
	html = html.replace(/<br\s*[\/]?>/gi, '\n');
	html = html.replace(/<[^>]+>/gi, '');
	return html;
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
