import React from 'react';
import {Router, Route, Redirect, hashHistory} from 'react-router';

import Order from '../order/index';

export default props => (
    <Router history={hashHistory}>
        <Route path='/order' component={Order} />
        <Redirect from='*' to='/order' />
    </Router>
)