import icons from '../../img/icons.svg';
import view from './view.js';
import PreviewView from './previewView.js';

class ResultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found !!';
  _successMessage = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultView();
