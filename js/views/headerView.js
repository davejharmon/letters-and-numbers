import View from './view.js';

class HeaderView extends View {
  _parentElement = document.querySelector('.header');
  _errorMessage = 'something went wrong in the header';
  _message = 'hello from the header';
  _default = `<div class="title">
                <div>LETTERS</div>
                <div>NUMBERS</div>
              </div>`;

  _generateMarkup() {
    return `
    <div class="target active">
      <div>${this._data.target[0]}</div>
    </div>
    <div class="title inactive">
      <div>LETTERS</div>
      <div>NUMBERS</div>
    </div>`;
  }

  loadNumbersGame(round) {
    this.render(round);
    this.toggleActive('target');
  }
}

export default new HeaderView();
