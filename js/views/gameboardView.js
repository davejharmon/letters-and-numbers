import View from './view.js';

class GameboardView extends View {
  _parentElement = document.querySelector('.gameboard');
  _errorMessage = 'something went wrong in the gameboard';
  _message = 'hello from the gameboard';
  _default = ``;

  show(val) {
    // find first empty box
    const box = this._parentElement.querySelector('.pick-empty');
    // update classList
    box.classList.toggle('pick-empty');
    box.style.transform = 'none';
    // update innertext
    box.innerHTML = val;
  }

  _generateMarkup() {
    let boxesMarkup = '';
    for (let i = 0; i < this._data.maxLength; i++)
      boxesMarkup += `<div class = "pick pick-empty" data-box="${i}">?</div>\n`;

    return `<div class="game-picks" id="picks-num">\n` + boxesMarkup + `</div>`;
  }
}

export default new GameboardView();
