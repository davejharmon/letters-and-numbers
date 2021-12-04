import View from './view.js';

class BackendConsoleView extends View {
  _parentElement = document.querySelector('.backend-console');
  _errorMessage = 'something went wrong in the backend console';
  _message = 'hello from the backend console';

  _generateMarkup() {
    return `
    <ul>
      <p class="solution${
        this._data.solution ? '' : ' hidden'
      }"><strong>Solution:</strong> ${this._data.solution}</p>
      <button class="btn" id="new-numbers">NEW NUMBERS GAME</button>
      <button class="btn" id="new-letters">NEW LETTERS GAME</button>
      <button class="btn" id="new-conundrum">NEW CONUNDRUM GAME</button>
    </ul>`;
  }
}

export default new BackendConsoleView();
