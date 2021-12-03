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

  moveConsole(dir) {
    console.log(dir);
    if (dir === 'left') {
      this._parentElement.style.transform = 'translate(-75vw)';
    }
    if (dir === 'right') {
      this._parentElement.style.transform = 'translate(0%)';
    }

    if (dir === 'down' || dir === 'up') {
      this._parentElement
        .querySelector('.backend-console')
        .classList.toggle('inactive');
    }
  }
  _generateMarkup() {
    return ``;
  }
}

export default new BackendView();
