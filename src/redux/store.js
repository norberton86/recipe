import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './reducer/recipe'


export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
  },
})


if (window.Cypress) {
  window['store'] = store
}