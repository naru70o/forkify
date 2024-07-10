import * as model from './model.js';

import RecipeView from './view/viewRecipe.js';
import SearchView from './view/searchView.js';

import resultView from './view/resultView.js';
import PaginationView from './view/paginationView.js';

//

import 'regenerator-runtime';
import 'core-js/stable';
import paginationView from './view/paginationView.js';

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
    resultView.update(model.getSearchResultPage(1));

    // 1- loading recipe / returns a promise so we have to await it
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
    resultView.render(model.getSearchResultPage(1));

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

const init = function () {
  RecipeView.AddHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServing);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
