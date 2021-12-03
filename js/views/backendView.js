import View from './view.js';

class BackendView extends View {
  _parentElement = document.querySelector('.backend');
  _errorMessage = 'something went wrong in the backend navbar';
  _message = 'hello from the backend navbar';

  addHandlerConsole(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      handler(btn.id);
    });
  }

  moveConsole(pos) {
    if (pos[1] === 'left') {
      this._parentElement.style.right = 'auto';
      this._parentElement.style.left = '0';
      return;
    }
    if (pos[1] === 'right') {
      this._parentElement.style.right = '0';
      this._parentElement.style.left = 'auto';
      return;
    }
  }
  _generateMarkup() {
    return ``;
  }
}

export default new BackendView();
