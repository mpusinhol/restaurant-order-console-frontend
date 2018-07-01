import 'bootstrap/dist/css/bootstrap.css';
import 'modules/font-awesome/css/font-awesome.min.css';

import './style.css';

import React from 'react';

import Header from './header';
import Routes from './routes';

const App = props => (
    <div className='container'>
        <Header />
        <Routes />
    </div>
);

export default App;