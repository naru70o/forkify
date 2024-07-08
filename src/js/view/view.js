import icons from '../../img/icons.svg';

export default class view {
  _data;
  _curPage;
  render(data) {
    this._data = data;
    this._curPage = this._data.page;
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    const markUp = this._generateMarkup();

    this._clearInput();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  _clearInput() {
    this._parentElement.innerHTML = '';
  }

  spinnerRender = function () {
    const markUp = `
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `;
    this._clearInput();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  };

  renderError(message = this._errorMessage) {
    const markUp = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clearInput();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._successMessage) {
    const markUp = `
      <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clearInput();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
