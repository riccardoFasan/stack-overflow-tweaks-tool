const MostVotedAnchor = new Anchor(
  "[data-highest-scored='1']",
  'jumpToTheMostVotedButton',
  'Jump to the most voted',
  (questionHeader, button) => {
    if (questionHeader.children.length == 3) {
      questionHeader.insertBefore(button, questionHeader.children[2]);
      return;
    }
    questionHeader.appendChild(button);
  },
  's-btn__filled s-btn__sm'
);

const JumpToTheMostVoted = new Feature(
  'jumpToTheMostVoted',
  () => {
    MostVotedAnchor.inject();
  },
  () => {
    MostVotedAnchor.remove();
  }
);
