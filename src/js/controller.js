import * as model from './model.js';

import RecipeView from './view/viewRecipe.js';
import SearchView from './view/searchView.js';
import resultView from './view/resultView.js';
import BookmarksView from './view/bookmarkView.js';
import PaginationView from './view/paginationView.js';
import { MODEL_CLOSE_SEC } from './config.js';
// import AddRecipeView from './view/addRecipeView.js';

//

import 'regenerator-runtime';
import 'core-js/stable';
import addRecipeView from './view/addRecipeView.js';
import bookmarkView from './view/bookmarkView.js';
// import paginationView from './view/paginationView.js';
// import bookmarkView from './view/bookmarkView.js';
// import resultView from './view/resultView.js';

///////////////////////////////////////
// preventing auto reload
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.spinnerRender();

    // 0) update results view to mark selected search view
    resultView.update(model.getSearchResultPage());
    BookmarksView.update(model.state.bookmarks);

    // 1- loading recipe
    await model.loadRecipe(id);

    // 2- render Recipe
    // const { recipe } = model.state;
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //  1) get search query
    const query = SearchView.getQuery();
    // 2) load search results
    if (!query) return;
    resultView.spinnerRender();

    await model.loadSearchResults(query);

    // 3) render results
    resultView.render(model.getSearchResultPage());

    //  4) render initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) render New results

  resultView.render(model.getSearchResultPage(goToPage));

  //  4) render initial pagination buttons
  PaginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  // update recipe serbings in (the state)
  model.updateServings(newServings);

  // update the recipe view
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

const controllAddBookmark = function () {
  // add and remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deletebookmark(model.state.recipe.id);
  }

  // update recipe view
  RecipeView.update(model.state.recipe);

  // render Bookmarks in the nav
  BookmarksView.render(model.state.bookmarks);
  console.log(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (Newrecipe) {
  try {
    // show uploadRecipe spinner
    addRecipeView.spinnerRender();

    // upload the new recipe data
    await model.uploadRecipe(Newrecipe);
    console.log(Newrecipe);

    // render new recipe
    RecipeView.render(model.state.recipe);

    // render recipe view
    addRecipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmarks
    bookmarkView.render(model.state.bookmarks);

    // change the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // CLOSE WINDOW
    setTimeout(() => {
      addRecipeView._toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('😒', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.AddHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServing);
  RecipeView.addhandlerAddBookmark(controllAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
