import axios from 'axios';
import { fillRecipe } from '../redux/reducer/recipe';
const baseUrl = 'https://api.spoonacular.com';

export const generateRecipe = async (dispatch) => {
    try {
      //step 1: get a radom recipe
      const response  = await axios.get(`${baseUrl}/recipes/complexSearch?query=pasta&addRecipeInformation=true&number=1&fillIngredients=true&apiKey=${process.env.REACT_APP_API_KEY}`);
      const {data: {results}} = response;
      
      if (Array.isArray(results) && results.length > 0) {

        const ingredientPromises = [];


       // step 2: create a list of promises, one for each ingredient 
       results[0]?.missedIngredients?.forEach(ingredient => {
            ingredientPromises.push(axios.get(`${baseUrl}/food/ingredients/${ingredient?.id}/information?amount=1&apiKey=${process.env.REACT_APP_API_KEY}`));        
        });


        //step 3: execute all promises
        const caloricInfo = await getAllCaloricInfo(ingredientPromises);


        //step 4: assign all nutritional info to the recipe
        const fullRecipe =  assignNutritionalInfo(results[0], caloricInfo);
        dispatch(fillRecipe(fullRecipe));
      }
    } catch (e){
      alert('Ooops, our Master Chef is out of kitchen');
    }
}

const getAllCaloricInfo = async (ingredientPromises) => {
    //call all promises in parallel
    const response = await Promise.all(ingredientPromises);
    //return only the data
    return response.map(res => res.data);
}

const assignNutritionalInfo = (recipe, caloricInfo) => {

    //for each ingredient assign the associated caloric info
    recipe.missedIngredients.forEach((ingredient, index)=> {
      ingredient['caloricInfo'] = caloricInfo[index]?.nutrition?.caloricBreakdown;
    });

    //return recipe with full information
    return recipe;
}