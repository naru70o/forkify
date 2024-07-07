import * as model from './model.js';

import RecipeView from './view/viewRecipe.js';
import SearchView from './view/searchView.js';
import view from './view/view.js';
import resultView from './view/resultView.js';

//

import 'core-js/stable';
import 'regenerator-runtime';

// import resultView from './view/resultView.js';

///////////////////////////////////////
// preventing auto reload
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    RecipeView.spinnerRender();
    if (!id) return;

    // 1- loading recipe / returns a promise so we have to await it
    await model.loadRecipe(id);

    // 2- render Recipe
    // const { recipe } = model.state;
    RecipeView.render(model.state.recipe);
    console.log(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.spinnerRender();
    console.log(resultView);

    //  1) get search query

    const query = SearchView.getQuery();
    console.log(query);

    // 2) load search results
    if (!query) return;
    await model.loadSearchResults(query);

    // console.log(model.state.search.results);
    resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  RecipeView.AddHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
