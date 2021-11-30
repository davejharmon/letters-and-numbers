import View from './view.js';

class BackendView extends View {
  _parentElement = document.querySelector('.backend');
  _errorMessage = 'something went wrong in the backend view';
  _message = 'hello from the backend view';

  addHandlerConsole(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      handler(btn.id);
    });
  }

  _generateMarkup() {
    return 'markup generated';
  }
}

export default new BackendView();
