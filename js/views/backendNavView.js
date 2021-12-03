import View from './view.js';

class BackendNavView extends View {
  _parentElement = document.querySelector('.backend-navbar');
  _errorMessage = 'something went wrong in the backend view';
  _message = 'hello from the backend view';

  addHandlerBackendNav(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.navbtn');
      if (!btn) return;
      handler(btn.id);
    });
  }

  _generateMarkup() {
    return `

      <div class="navbtn${
        this._data[1] !== 'left' ? '' : ' inactive'
      }" id="navLeft">◀</div>
      <div class="navbtn${
        this._data[0] === 'up' && this._data[1] !== 'right' ? '' : ' inactive'
      }" id="navDownLeft">🔻</div>
      <div>STREAMER CONSOLE</div>
      <div class="navbtn${
        this._data[0] === 'up' && this._data[1] !== 'left' ? '' : ' inactive'
      }" id="navDownRight">🔻</div>
      <div class="navbtn${
        this._data[1] !== 'right' ? '' : ' inactive'
      }" id="navRight">▶</div>
    `;
  }
}

export default new BackendNavView();
