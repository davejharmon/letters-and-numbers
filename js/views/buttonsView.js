import View from './view.js';

class ButtonsView extends View {
  _parentElement = document.querySelector('.game-buttons');
  _errorMessage = 'something went wrong in the buttons';
  _message = 'hello from the buttons';

  addHandlerGameButtons(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      handler(btn.dataset.action);
    });
  }

  _generateMarkup() {
    return `
    <div class="game-buttons">
      <button class="btn" id="game-btn-1" data-action="1">BIG NUMBER</button>
      <button class="btn timer 
      ${this._data.countdown ? '' : 'hidden'}
      " id="game-btn-timer" data-action="timer">
      ${this._data.countdown ? this._data.time : '⏱ TIMER'}
      </button>
      <button class="btn" id="game-btn-2"data-action="2">SMALL NUMBER</button>
    </div>`;
  }
}

export default new ButtonsView();
