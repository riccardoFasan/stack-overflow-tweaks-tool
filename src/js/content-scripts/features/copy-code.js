function addCopyButtons() {
  [...answers, question].forEach((answer) => {
    const blocks = answer.querySelectorAll('pre.s-code-block');
    blocks.forEach((block) => {
      addCopyButton(block);
    });
  });
}

const copyClasses = isDarkTheme() ? 'copy-button dark' : 'copy-button';

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
    const plainText = code.innerText;
    copyToClipboard(plainText);
  });
}

function removeCopyButtons() {
  answers.forEach((answer) => {
    const buttons = answer.querySelectorAll('pre button.copy-button');
    buttons.forEach((button) => {
      button.remove();
    });
  });
}

const CopyCode = new Feature('copyCode', addCopyButtons, removeCopyButtons);
