import React, { useEffect } from 'react';
import { history } from './redux/create';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import { getDJIASagaActionCreator } from './redux/modules/djia';

import 'normalize.css';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDJIASagaActionCreator());
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
