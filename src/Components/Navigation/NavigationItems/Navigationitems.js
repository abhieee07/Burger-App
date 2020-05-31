import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link='/' exact>
			BurgerBuilder
		</NavigationItem>
		{props.isAuth ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
		{!props.isAuth ? (
			<NavigationItem link='/signin'>Sign In</NavigationItem>
		) : (
			<NavigationItem link='/logout'>Logout</NavigationItem>
		)}
	</ul>
);
export default navigationItems;
