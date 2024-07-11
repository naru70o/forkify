import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';

import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    servings: 0,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // getJSON returns a promise so we must wait that data
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      coockingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // what we will do is to now use the data that we store
    // in the bookmarks array and the state
    // to basically Mark any recipe that we load as bookmarked,
    // if it is already in the bookmarks array.
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    // if (!query) return;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //10

  return state.search.results.slice(start, end);
};
//

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newSer=oldquantity * newquantity ?
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  const setStorage = localStorage.setItem(
    'bookmarks',
    JSON.stringify(state.bookmarks)
  );
  console.log(setStorage);
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  //mark current recipe as a Bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deletebookmark = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  console.log(storage);
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
console.log('model', state.bookmarks);
