import icons from '../../img/icons.svg';
import view from './view.js';
class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recaps found for your Query !!';
  _successMessage = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    return `
    <li class="preview">
            <a class="preview__link" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="${results.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
              
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultView();
