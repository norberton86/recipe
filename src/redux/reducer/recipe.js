import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: null,
}


export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    fillRecipe: (state, action) => {
      state.value = action.payload;
    },
  },
})


// Action creators are generated for each case reducer function
export const { fillRecipe } = recipeSlice.actions;


export default recipeSlice.reducer