import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DetailsPage from './pages/DetailsPage';
import Footer from './components/Footer';

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flex: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  side: {
    flex: 1,
  },
};

const App = ({ store, persistor }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div style={styles.container}>
            <div style={styles.side} />
            <div style={styles.content}>
              <Route exact path="/" component={LandingPage} />
              <Route path="/dashboard" component={NavBar} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/details" component={NavBar} />
              <Route path="/details" component={DetailsPage} />
              <Route path="/" component={Footer} />
            </div>
            <div style={styles.side} />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
