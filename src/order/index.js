import React from 'react';
import { Button, Form, FormGroup, Input, Label, Table } from 'reactstrap';

import Grid from './grid';
import CONSTANTS from './constants';

import './style.css';

class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            output: "",
            nextOutputId: 1,
            list: []
        };

        this.onSendClicked = this.onSendClicked.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.processOrder = this.processOrder.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    onInputChange(event) {
        this.setState(...this.state, {input: event.target.value});
    }

    onKeyPress(event) {
        if (event.key == 'Enter') {
            this.onSendClicked();
        }
    }

    processOrder() {
        const input = this.state.input.split(',');
        const timeOfDay = input[0].toLowerCase();
        const dishes = CONSTANTS.MENU[timeOfDay];

        let order = {
            error: false,
            entree: {name: null, quantity: 0},
            side: {name: null, quantity: 0},
            drink: {name: null, quantity: 0},
            dessert: {name: null, quantity: 0}
        };

        if (input.length > 0 && dishes) {
            input.shift();

            for(let i = 0; i < input.length; i++) {
                const dishType = input[i].trim();

                if(dishType == "1") {
                    if (order.entree.quantity > 0) {
                        order.error = true;
                        break;
                    } else {
                        order.entree.name = dishes[dishType - 1].name;
                        order.entree.quantity++;
                    }
                } else if (dishType == "2") {
                    if (order.side.quantity > 0) {
                        if (timeOfDay == "night") {
                            order.side.quantity++;
                        } else {
                            order.error = true;
                            break;
                        }
                    } else {
                        order.side.name = dishes[dishType - 1].name;
                        order.side.quantity++;
                    }
                } else if (dishType == "3") {
                    if (order.drink.quantity > 0) {
                        if (timeOfDay == "morning") {
                            order.drink.quantity++;
                        } else {
                            order.error = true;
                            break;
                        }
                    } else {
                        order.drink.name = dishes[dishType - 1].name;
                        order.drink.quantity++;
                    }
                } else if (dishType == "4") {
                    if (timeOfDay == "morning" || order.dessert.quantity > 0) {
                        order.error = true;
                        break;
                    } else {
                        order.dessert.name = dishes[dishType - 1].name;
                        order.dessert.quantity++;
                    }
                } else {
                    order.error = true;
                    break;
                }
            }
        } else {
            order.error = true;
        }

        return order;
    }

    updateState(output) {
        let newOutput = {
            id: this.state.nextOutputId,
            input: this.state.input,
            output
        };

        let {list} = this.state;
        list.push(newOutput);

        this.setState(...this.state, {
            nextOutputId: ++this.state.nextOutputId,
            output,
            list
        });
    }

    onSendClicked() {
        const order = this.processOrder();
        let output = "";

        output = order.entree.quantity > 0 ? `${order.entree.name}, ` : output;
        
        if (order.side.quantity > 0) {
            if (order.side.quantity > 1) {
                output += `${order.side.name}(x${order.side.quantity}), `;
            } else {
                output += `${order.side.name}, `
            }
        }

        if (order.drink.quantity > 0) {
            if (order.drink.quantity > 1) {
                output += `${order.drink.name}(x${order.drink.quantity}), `;
            } else {
                output += `${order.drink.name}, `
            }
        }

        output = order.dessert.quantity > 0 ? output + order.dessert.name : output;

        if (order.error) {
            output += "error";
        }

        if (output.charAt(output.length - 2) == ',') {
            output = output.substr(0, output.length - 2);
        }

        this.updateState(output);
    }

    render() {
        return (
            <div className="main-div">
                <header className='text-center page-header'>
                    <h2>Order</h2>
                </header>
                <div>
                    <Form className="form">
                        <FormGroup className="input-group">
                            <Input type="text"
                                className="input-text"
                                name="input"
                                id="input"
                                placeholder="Place your order here"
                                onChange={this.onInputChange}
                                onKeyPress={this.onKeyPress}/>
                            <Button color="Primary"
                                onClick={this.onSendClicked}>
                                Send
                            </Button>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text"
                                readOnly
                                bsSize="lg"
                                value={this.state.output}/>
                        </FormGroup>
                    </Form>
                    <Grid list={this.state.list} />
                </div>
            </div>
        )
    }
}

export default Order;