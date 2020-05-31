import React from 'react';
import classes from './Order.module.css';


const order = (props) => {
  const Ingredients = [];
  for (let ingName in props.ingredients) {
    Ingredients.push({
      name: ingName,
      quantity: props.ingredients[ingName],
    });
  }
  const ingridientOutput = Ingredients.map((ig) => {
    return (
      <span
        style={{
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
        key={ig.name}>
        {ig.name} ({ig.quantity})
        {/* will display Bacon(1),Meat(2)..etc as output after this line */}
      </span>
    );
  });
  return (
    <div className={classes.Order}><p>Ingredients : {ingridientOutput}</p>
      <p>  Price : <strong>INR {props.price}</strong>
      </p>
    </div>
  );
};

export default order;
