import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DetailsPage from './pages/DetailsPage';

const App = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/details" component={DetailsPage} />
        </div>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
