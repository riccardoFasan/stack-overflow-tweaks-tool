const correctAnswer = body.querySelector('.accepted-answer');

function updateCorrectAnswerStyle() {
  if (correctAnswer) {
    highlightAnswer();
    removePreviousAnswerBorder();
  }
}

function highlightAnswer() {
  correctAnswer.classList.toggle('bg-green');
}

function removePreviousAnswerBorder() {
  const previousAnswer =
    correctAnswer.previousElementSibling.previousElementSibling;
  if (previousAnswer) previousAnswer.style.borderBottom = 'unset';
}

function removeAnswerHighlightment() {
  if (correctAnswer) {
    highlightAnswer();
  }
}

const HighlightAnswer = new Feature(
  'highlightAnswer',
  updateCorrectAnswerStyle,
  removeAnswerHighlightment,
);
