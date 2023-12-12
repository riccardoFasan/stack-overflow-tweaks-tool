class Anchor {
  constructor(
    selector,
    btnId,
    btnText,
    insertMethod,
    btnStyle = '',
    iconClass = '',
  ) {
    this.selector = selector;
    this.btnId = btnId;
    this.btnText = btnText;
    this.btnStyle = btnStyle;
    this.iconClass = iconClass;
    this.insertMethod = insertMethod;
  }

  get __answer() {
    return body.querySelector(this.selector);
  }

  get __answerPosition() {
    const answerTopPosition = this.__answer.offsetTop;
    const headerHeight = header.clientHeight;
    return answerTopPosition - headerHeight;
  }

  inject() {
    if (this.__answer) {
      const button = document.createElement('button');
      button.setAttribute('id', this.btnId);
      button.setAttribute('class', `ws-nowrap s-btn ${this.btnStyle}`);

      this.insertMethod(questionHeader, button);

      if (this.iconClass) {
        const icon = document.createElement('div');
        icon.setAttribute('class', 'icon bulb');
        button.appendChild(icon);
      }

      const text = document.createElement('div');
      text.setAttribute('class', 'text');
      text.innerText = this.btnText;

      button.appendChild(text);

      button.addEventListener('click', () => this.__jump());
    }
  }

  remove() {
    if (this.__answer) {
      const button = questionHeader.querySelector(`#${this.btnId}`);
      button.remove();
    }
  }

  __jump() {
    const position = this.__answerPosition;
    window.scrollTo(0, position);
  }
}
