browser.runtime.onInstalled.addListener( () => {
    browser.storage.sync.set({ addButton: false });
    browser.storage.sync.set({ highlightAnswer: false });
    browser.storage.sync.set({ hideNavBar: false });
    browser.storage.sync.set({ hideTooltipsBar: false });
});

const body = document.querySelector('body');
const correctAnswer = body.querySelector('.accepted-answer');


/* ================
Highlight answer
================ */

function updateCorrectAnswerStyle() {
    highlightAnswerColor();
    removePreviousAnswerBorder();
}

function highlightAnswerColor() {
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

function removeAnswerHighlightment() {
    correctAnswer.style.backgroundColor = 'unset';
}


/* ================
Jump to the answer
================ */

const header = body.querySelector('header.top-bar');
const questionHeader = body.querySelector('#question-header');

const darkColor = '#273C3B';
const lightColor = '#dffde8';

const iconPath = 'icons/stackOverflowBulb.svg';

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
    return browser.runtime.getURL(iconPath);
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
    const button = questionHeader.querySelector('#jumpToAnswerButton');
    button.remove();
}


/* ================
Show or hide side navs
================ */

const navigationBar = body.querySelector('#left-sidebar');
const tooltipsBar = body.querySelector('#sidebar');

const container = body.querySelector('#content');
const content = container.querySelector('#mainbar')

function showOrHideNavigationBar() {
    navigationBar.classList.toggle('w-0');
}

function showOrHideTooltipsBar() {
    tooltipsBar.classList.toggle('d-none');
}

function setContainerBorder() {
    container.classList.toggle('no-border');
}

function resizeContent() {
    content.classList.toggle('w-100');
}

/* ================
Configuration
================ */

const configurations = [{
    property: 'addButton',
    enableFeature: () => {
        if (correctAnswer) injectButton();
    },
    disableFeature: () => {
        if (correctAnswer) removeButton();
    }
}, {
    property: 'highlightAnswer',
    enableFeature: () => {
        if (correctAnswer) updateCorrectAnswerStyle();
    },
    disableFeature: () => {
        if (correctAnswer) removeAnswerHighlightment();
    }
}, {
    property: 'hideNavBar',
    enableFeature: () => {
        showOrHideNavigationBar();
        setContainerBorder();
    },
    disableFeature: () => {
        showOrHideNavigationBar();
        setContainerBorder();
    }
}, {
    property: 'hideTooltipsBar',
    enableFeature: () => {
        showOrHideTooltipsBar();
        resizeContent();
    },
    disableFeature: () => {
        showOrHideTooltipsBar();
        resizeContent();
    }
}];

configurations.forEach(configuration => {  
    browser.storage.sync.get(configuration.property, (property) => {
        const value = property[configuration.property];
        if (value) configuration.enableFeature();
    });
});

browser.storage.onChanged.addListener(changes  => {
    const property = Object.keys(changes)[0];
    const configuration = configurations.find(configuration => configuration.property === property);
    if (configuration) {
        const enable = changes[property].newValue;
        configuration[enable ? 'enableFeature' : 'disableFeature']();
    }
});