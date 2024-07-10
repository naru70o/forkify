import icons from '../../img/icons.svg';
import view from './view';
import PreviewView from './previewView';

class BookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'no Bookmarks yet. Find a nice recipe and bookmark it';
  _successMessage = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
