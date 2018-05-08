import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Login from '../components/Login';
import Logo from '../assets/logo.svg';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
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
    margin: 0,
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
    console.log('handleLogin');
    //fetch('https://api.stundenplaner.online/profile')
    //  .then(response => response.json())
    //  .then(responseJson => console.log(responseJson));

    this.props.history.push('/dashboard');
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
