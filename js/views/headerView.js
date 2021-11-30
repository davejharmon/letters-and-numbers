import View from './view.js';

class HeaderView extends View {
  _parentElement = document.querySelector('.header');
  _errorMessage = 'something went wrong in the header';
  _message = 'hello from the header';

  _generateMarkup() {
    return `
    <div class="target-line">
      <div class="target">${this._data}</div>
    </div>`;
  }

  flipToTarget = function (targetNumber) {
    this.render(targetNumber);
  };
}
export default new HeaderView();
