import './App.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import {generateRecipe} from './util';
import Ingredient from './component/Ingredient';


function App() {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe.value);


  useEffect(()=> {
    generateRecipe(dispatch)
  }, []);


  if(!!recipe)
    return (
      <div className='app' data-cy="recipe">
        <h1 className='text-center text-secondary'>Hi enjoy this healthy recipe today!!!</h1>
        <div className='recipe text-center'>
          <h3 data-cy="recipe-title">{recipe?.title}</h3>
          <img src={recipe?.image} className='recipe-image rounded'/>
          <p className='summary text-start'>
            <code>
              {parse(recipe.summary)}
            </code>
          </p>
          <h4>Ingredients</h4>
          <div className='container'>
            <div className='row'>
              {recipe?.missedIngredients.map((ingredient, index) => <Ingredient key={index} index={index} ingredient={ingredient}/>)}
            </div>
          </div>
        </div>
      </div>
    );
  else 
    return '';
}

export default App;