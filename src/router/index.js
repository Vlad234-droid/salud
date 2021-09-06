import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../pages/App';
import ExpiredPage from '../pages/ExpiredPage';
import RequestPage from '../pages/RequestPage';
import Results from '../pages/Results';
import TokenDecode from '../pages/TokenDecode';

const routes = () => {
  return (
    <React.Suspense fallback="">
      <Switch>
        <Route exact path="/" component={TokenDecode} />
        <Route exact path="/request/" component={RequestPage} />
        <Route exact path="/expired/" component={ExpiredPage} />
        <Route exact path="/results/" component={Results} />
        <Route component={App} />
      </Switch>
    </React.Suspense>
  );
};

export default routes;
