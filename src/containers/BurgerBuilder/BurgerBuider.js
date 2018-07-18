import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.3,
    meat: 1.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurcheseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 })
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurcheseState(updatedIngredients);
    };

    removeIngredientHanlder = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;

        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurcheseState(updatedIngredients);

    };

    purcheseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCandleHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
        const disableInto = { ...this.state.ingredients };

        for (let key in disableInto) {
            disableInto[key] = disableInto[key] <= 0;
        };

        return (
            <Aux>
                <Modal
                    modalClosed={this.purchaseCandleHandler}
                    show={this.state.purchasing}>

                    <OrderSummary 
                    cancel={this.purchaseCandleHandler}
                    apply={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients} />
                </Modal>

                <Burger ingredients={this.state.ingredients} />

                <BuildControls
                    ingredientdAdded={this.addIngredientHandler}
                    ingredientdRemove={this.removeIngredientHanlder}
                    disabled={disableInto}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purcheseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;