import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
  logo: {},
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: -10,
    color: Colors.darkBlue,
    marginLeft: 20,
  },
  login: {},
};

class LandingPage extends Component {
  componentDidMount() {
    document.title = 'StundenPlaner - Login';
  }

  handleLogin = () => {
    fetch('https://api.stundenplaner.online/login', {
      method: 'POST',
      body: {
        username: 'Max',
        password: 'StarkIndustries',
      },
    })
      .then(response => response.json())
      .catch(err => console.log(err));

    //this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <img style={styles.logo} src={Logo} alt="Logo" />
          <p style={styles.title}>StundenPlaner</p>
        </div>
        <Login style={styles.login} onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default withRouter(LandingPage);
