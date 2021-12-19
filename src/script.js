const body = document.querySelector('body');

/* ================
Jump to the answer
================ */

const header = body.querySelector('header.top-bar');

const correctAnswer = body.querySelector('.accepted-answer');
const questionHeader = body.querySelector('#question-header');

const darkColor = '#273C3B';
const lightColor = '#dffde8';

const iconPath = 'icons/stackOverflowBulb.svg';

function updateCorrectAnswerStyle() {
    changeAnswerColor();
    removePreviousAnswerBorder();
}

function changeAnswerColor() {
    correctAnswer.style.backgroundColor = getColor();
}

function getColor() {
    const isDarkTheme = body.classList.contains('theme-dark');
    return isDarkTheme ? darkColor : lightColor;
}

function removePreviousAnswerBorder() {
    const previousAnswer = correctAnswer.previousElementSibling.previousElementSibling;
    if (previousAnswer) previousAnswer.style.borderBottom = 'unset';
}

function injectButton(){
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

/* ================
Configuration
================ */

const navigationBar = body.querySelector('#left-sidebar');
const suggestionsBar = body.querySelector('#sidebar');
const container = body.querySelector('#content');
const mainContent = container.querySelector('#mainbar')

const configurations = [{
    property: 'addButton',
    enableFeature: () => {
        if (correctAnswer) injectButton();
    },
    disableFeature: () => {}
}, {
    property: 'highlightAnswer',
    enableFeature: () => {
        if (correctAnswer) updateCorrectAnswerStyle();
    },
    disableFeature: () => {}
}, {
    property: 'hideNavBar',
    enableFeature: () => {},
    disableFeature: () => {}
}, {
    property: 'hideSuggestionsBar',
    enableFeature: () => {},
    disableFeature: () => {}
}];

chrome.storage.onChanged.addListener((changes, namespace) => {
    const property = Object.keys(changes)[0];
    const configuration = configurations.find(configuration => configuration.property === property);
    if (configuration) {
        const enable = changes[property].newValue;
        configuration[enable ? 'enableFeature' : 'disableFeature']();
    }
});