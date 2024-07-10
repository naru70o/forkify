import icons from '../../img/icons.svg';

export default class view {
  _data;
  _curPage;
  _numPages;

  render(data, render = true) {
    this._data = data;
    this._curPage = this._data.page;
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    const markUp = this._generateMarkup();

    if (!render) return markUp;
    this._clearInput();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    /*
    So here we now have the Markup
    but that is just a string. And so that is gonna be very difficult to compare
    to the DOM elements that we currently have on the page. And so to fix that problem,
    we can actually use a nice trick, which is to basically convert this Markup string
    to a DOM object that's living in the memory and that we can then use


    So basically, newDOM here will become like a big object, which is like a virtual DOM.
    So a DOM that is not really living on the page but which lives in our memory.
    */
    // const newDom = document.createRange().createContextualFragment(newMarkUp);
    /*
    And then we can take that newDOM, and then on that, we can call querySelectorAll,
    and select all the elements in there. And so if we now log this to the console,
    then we will basically see all the elements that will be contained inside of this newDOM element
*/
    // const newElements = Array.from(newDom.querySelectorAll('*'));

    // const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // newElements.forEach((newEl, i) => {
    // comparring curEll and the newEll by using this method
    // const curEl = curElements[i];

    // Update changes TEXT

    // if (
    //   !newEl.isEqualNode(curEl) &&
    //   newEl.firstChild.nodeValue.trim() !== ''
    // ) {
    //   // console.log('😍', newEl.firstChild.nodeValue.trim());
    //   curEl.textContent = newEl.textContent;
    // }

    // simply replace all the attributes
    // in the current element by the attributes coming from the new element.

    //   if (!newEl.isEqualNode(curEl))
    //     Array.from(newEl.attributes).forEach((attr, i) =>
    //       curEl.setAttribute(attr.name, attr.value)
    //     );
    // });
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
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
