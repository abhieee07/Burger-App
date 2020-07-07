import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux'

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
const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.token !== null,
	}
}

export default connect(mapStateToProps)(navigationItems);
