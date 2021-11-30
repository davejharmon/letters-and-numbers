import View from './view.js';

class GameboardView extends View {
  _parentElement = document.querySelector('.gameboard');
  _errorMessage = 'something went wrong in the gameboard';
  _message = 'hello from the gameboard';

  addHandlerGameboard(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      handler(btn.dataset.action);
    });
  }

  show(val) {
    // find first empty box
    const box = this._parentElement.querySelector('.pick-empty');

    // update classList
    box.classList.toggle('pick-empty');

    // update innertext
    box.innerHTML = val;
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
      <button class="btn" id="game-btn-1" data-action="1">BIG NUMBER</button>
      <button class="btn hidden timer" id="game-btn-timer" data-action="timer">⏱ TIMER</button>
      <button class="btn" id="game-btn-2"data-action="2">SMALL NUMBER</button>
    </div>`;
  }
}

export default new GameboardView();
