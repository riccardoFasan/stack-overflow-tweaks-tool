const AcceptedAnchor = new Anchor(
  '.accepted-answer',
  'jumpToAnswerButton',
  'Jump to the answer',
  (questionHeader, button) => {
    questionHeader.appendChild(button);
  },
  's-btn__primary',
  'bulb'
);

const JumpToTheAnswer = new Feature(
  'jumpToTheAnswer',
  () => {
    AcceptedAnchor.inject();
  },
  () => {
    AcceptedAnchor.remove();
  }
);
