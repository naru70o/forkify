import * as model from './model.js';
import RecipeView from './view/viewRecipe.js';

//

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import icons from `url:../img/icons.svg`;

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// console.log('hi');
// console.log('hello');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    RecipeView.spinnerRender();

    // 1- loading recipe / returns a promise so we have to await it
    await model.loadRecipe(id);

    // 2- render Recipe
    // const { recipe } = model.state;
    RecipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
