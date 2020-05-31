import React from 'react'
import Burgerlogo from '../../Assets/Images/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={props.style}>
        <img style={{ height: "100%" }} src={Burgerlogo} alt="My Burger" />
    </div>
)
export default logo; 