import View from './view.js';

class HeaderView extends View {
  _parentElement = document.querySelector('.header');
  _errorMessage = 'something went wrong in the header';
  _message = 'hello from the header';

  _generateMarkup() {
    return `${this._data}`;
  }

  flipToTarget = function (targetNumber) {
    this.render(targetNumber);
  };
}
export default new HeaderView();
