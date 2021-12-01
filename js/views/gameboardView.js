import View from './view.js';

class GameboardView extends View {
  _parentElement = document.querySelector('.gameboard');
  _errorMessage = 'something went wrong in the gameboard';
  _message = 'hello from the gameboard';

  show(val) {
    // find first empty box
    const box = this._parentElement.querySelector('.pick-empty');
    // update classList
    box.classList.toggle('pick-empty');
    // update innertext
    box.innerHTML = val;
  }

  startTimer(handler, round) {
    // replace timer button text
    const timer = this._parentElement.querySelector('.timer');
    setInterval(handler, 1000);
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
    </div>`;
  }
}

export default new GameboardView();
