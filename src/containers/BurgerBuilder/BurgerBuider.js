import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad : 0.5,
    bacon : 0.7,
    cheese: 0.3,
    meat : 1.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0,
        },
        totalPrice: 4,
    }

   addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;

        const priceAddition =INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice : newPrice,
            ingredients : updatedIngredients,
        });

   } 

   lessIngredientHanlder = (type) => {

   }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientdAdded={this.addIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;