import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'salad', type: 'Salad' },
	{ label: 'bacon', type: 'Bacon' },
	{ label: 'meat', type: 'Meat' },
	{ label: 'cheese', type: 'Cheese' },
];

const buildcontrols = (props) => (
	<div className={classes.Buildcontrols}>
		<p>
			Current Price : <strong>{props.price.toFixed(2)}</strong>
		</p>
		{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.type}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientremoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			/>
		))}
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>
			{props.isAuth ? 'ORDER NOW' : 'Sign In To Continue'}
		</button>
	</div>
);
export default buildcontrols;

// 2 method doing the above step with controls
//  <BuildControl label="salad" key="salad",
//  added={() =>props.ingredientAdded('Salad')} ,
//  removed={() =>props.ingredientremoved('Salad')}/>
