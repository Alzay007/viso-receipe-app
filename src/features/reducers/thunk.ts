import { Recipe } from '../../types/Recipe';
import axios from 'axios';
import { AppDispatch } from '../store/store';
import { recipesSlice } from './recipesSlice';


export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(recipesSlice.actions.recipesFetching());

    const response = await axios.get<{ meals: Recipe[] }>(`${BASE_URL}/search.php?s=`);

    dispatch(recipesSlice.actions.recipesFetchingSuccess(response.data.meals));
  } catch (e) {
    dispatch(recipesSlice.actions.recipesFetchingError());
  }
};

export const fetchRecipeByName = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(recipesSlice.actions.recipesFetching());

    const response = await axios.get<{ meals: Recipe[] }>(`${BASE_URL}/search.php?s=${name}`);

    dispatch(recipesSlice.actions.recipesFetchingSuccess(response.data.meals));
  } catch (e) {
    dispatch(recipesSlice.actions.recipesFetchingError());
  }
};
