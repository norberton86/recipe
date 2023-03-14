const Ingredient = ({ingredient, index}) => {
    return (<div className="col-3" key={index}>
                <div className='rounded'>
                <h5 className='text-uppercase' data-cy={`ingredient-${index}-name`}>{ingredient?.name}</h5>
                <div className='ingredient-image d-flex align-items-center justify-content-center'>
                    <img src={`${ingredient?.image}`}/>
                </div>
                <ul>
                    <li className='text-start' data-cy={`ingredient-${index}-protein`}>Percent Protein: {ingredient?.caloricInfo?.percentProtein}</li>
                    <li className='text-start' data-cy={`ingredient-${index}-fat`}>Percent Fat: {ingredient?.caloricInfo?.percentFat}</li>
                    <li className='text-start' data-cy={`ingredient-${index}-carbs`}>Percent Carbs: {ingredient?.caloricInfo?.percentCarbs}</li>
                </ul>
                </div>
            </div>);
};

export default Ingredient;