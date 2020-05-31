import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	let transformIngred = Object.keys(props.ingredients)
		.map((igkey) => {
			return [...Array(props.ingredients[igkey])].map((_, i) => {
				//here array(n) ,will create an array of n elements and then map is used for each array element
				return <BurgerIngredient key={igkey + i} type={igkey} />;
			});
		})
		.reduce((arr, el) => {
			//this steps here reduces all the arrays to single array so that we can able to find if the...
			return arr.concat(el); //...array lenth is empty ot not,if empt then we can add a teext saying please add elements
		}, []);

	// console.log(transformIngred)
	if (transformIngred.length === 0) {
		//here we say a message if no ingredients are added
		transformIngred = <p>Please add your ingredients!!</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='BreadTop' />
			{transformIngred}
			<BurgerIngredient type='BreadBottom' />
		</div>
	);
};
export default burger;
