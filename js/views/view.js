export default class View {
  _data;

  /**
   * Render the received object to the dom
   * @param {Object} data The data to be rendered to the view
   * @returns Nothing
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // change attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpinner() {
    // render a spinner while waiting for elements.
  }

  /**
   * Error handler
   * @param {String} message Error message text
   * @param {bool} clearView Clear the view to show error message?
   */
  renderError(message = this._errorMessage, clearView = true) {
    console.error(message);
    if (clearView) {
      const markup = `<p class="error-message">${message}</p>`;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  }

  renderMessage(message = this._message) {
    const markup = `<p class="message">${message}</p>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  toggleVis(element) {
    this._parentElement.querySelector('.' + element).classList.toggle('hidden');
  }

  toggleActive(element) {
    this._parentElement
      .querySelector('.' + element)
      .classList.toggle('inactive');
  }
}
