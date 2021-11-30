export default class View {
  _data;

  /**
   * Render the received object to the dom
   * @param {Object} data The data to be rendered to the view
   * @returns Nothing
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   */

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    // render a spinner while waiting for elements.
  }

  renderError(message = this._errorMessage) {
    const markup = `<p class="error-message">${message}</p>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<p class="message">${message}</p>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
