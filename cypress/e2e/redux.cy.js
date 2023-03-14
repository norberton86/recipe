describe('Recipes', () => {

  it('Recipe info is being shown', () => {

      //go to our page
      //(step 1)
      cy.visit('/');


      //if the entry point to our UI exist it means the data was already available in redux
      //(step 2)
      cy.get('[data-cy="recipe"]').should('exist');


      //we have to access the redux store from the window object
      //then we get the state (step 3)
      cy.window().its('store').invoke('getState').then((state) => {

          //access reducer value
          const {recipe: {value}} = state;

          //validate the UI presents the same info
          //(step 4)
          cy.get('[data-cy="recipe-title"]').contains(value.title);

          const {missedIngredients} = value;
          missedIngredients.forEach((ingredient, index) => {

              const {caloricInfo: {percentProtein, percentFat, percentCarbs}} = ingredient;
              cy.get(`[data-cy="ingredient-${index}-protein"]`).should('include.text', percentProtein);
              cy.get(`[data-cy="ingredient-${index}-fat"]`).should('include.text',percentFat);
              cy.get(`[data-cy="ingredient-${index}-carbs"]`).should('include.text',percentCarbs);

          });

      });

  })

})