import React from 'react';

import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';

// Pages
import Home from './pages/home';
import Information from './pages/information';

const Router = () => (
   <HashRouter>
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/info" component={Information} />
      </Switch>
   </HashRouter>
);

export default Router;
