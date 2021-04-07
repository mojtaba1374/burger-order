import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" isExact={true}>Burger Builder</NavigationItem>
        {props.isAuth
            ? <NavigationItem link="/orders">Orders</NavigationItem>
            : null
        }
        {!props.isAuth 
            ? <NavigationItem link="/auth">Authentication</NavigationItem>
            : <NavigationItem link="/logout">Log out</NavigationItem>
        }
    </ul>
);

export default navigationItems; 