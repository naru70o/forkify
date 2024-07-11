import icons from '../../img/icons.svg';
import view from './view';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const goto = +btn.dataset.goto;
      if (!btn) return;

      handler(goto);
    });
  }

  _genButtonLeft() {
    return `<button data-goTo="${
      this._curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._curPage - 1}</span>
  </button>`;
  }

  _genButtonRight() {
    return `<button data-goTo="${
      this._curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${this._curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-right"></use>
    </svg>
</button> `;
  }

  _generateMarkup() {
    // const this._curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // 1) page 1, and there are other pages
    if (this._curPage === 1 && numPages > 1) {
      return this._genButtonRight();
    }
    // 2) last page
    if (this._curPage === numPages && numPages > 1) {
      return this._genButtonLeft();
    }
    // 3) other page
    if (this._curPage < numPages) {
      return `${this._genButtonLeft()}${this._genButtonRight()}`;
    }
    // 3) page 1, and there NOT other pages
    if (this._curPage === 1 || numPages === 0) return '';
  }
}

export default new PaginationView();
