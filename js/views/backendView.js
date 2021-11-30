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
    return `
    <div class="game-picks" id="picks-num">
      <div class="pick pick-num pick-empty" data-box="1">?</div>
      <div class="pick pick-num pick-empty" data-box="2">?</div>
      <div class="pick pick-num pick-empty" data-box="3">?</div>
      <div class="pick pick-num pick-empty" data-box="4">?</div>
      <div class="pick pick-num pick-empty" data-box="5">?</div>
      <div class="pick pick-num pick-empty" data-box="6">?</div>
    </div>
    <div class="game-buttons">
      <button class="btn" id="game-btn-one">OPTION 1</button>
      <button class="btn" id="game-btn-timer">⏱ TIMER</button>
      <button class="btn" id="game-btn-two">OPTION 2</button>
    </div>`;
  }
}

export default new BackendView();
