import React, {useState} from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-409ea.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ingredient}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevUserIngredients => 
        [...prevUserIngredients, 
          {id: responseData.name, ...ingredient}]);
    })
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
