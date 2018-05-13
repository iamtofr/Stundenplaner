import React, { Component } from 'react';
import Login from '../components/Login';
import Logo from '../assets/logo.svg';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: -10,
    color: Colors.darkBlue,
    marginLeft: 20,
  },
};

class LandingPage extends Component {
  componentDidMount() {
    document.title = 'StundenPlaner - Login';
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <img src={Logo} alt="Logo" />
          <p style={styles.title}>StundenPlaner</p>
        </div>
        <Login />
      </div>
    );
  }
}

export default LandingPage;
