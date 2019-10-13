import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/home';
import Information from './pages/information';

const Router = () => (
   <BrowserRouter>
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/info" component={Information} />
      </Switch>
   </BrowserRouter>
);

export default Router;
