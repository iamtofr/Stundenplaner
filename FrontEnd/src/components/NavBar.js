import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as appActions } from '../reducers/app';
import * as Colors from '../constants/Colors';
import Logo from '../assets/logo.svg';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  },
  logo: {
    width: 40,
    height: 40,
    padding: 5,
  },
  buttons: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    border: 0,
    outline: 0,
    background: 0,
  },
  label: {
    margin: 0,
    padding: 0,
    fontSize: 18,
    color: Colors.darkBlue,
  },
};

class NavBar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <img
          style={styles.logo}
          src={Logo}
          alt="logo"
          onClick={() => {
            this.props.history.push('/dashboard');
          }}
        />
        <div style={styles.buttons}>
          <button style={styles.button}>
            <p style={styles.label}>StundenPlaner</p>
          </button>
        </div>
        <button
          style={styles.button}
          onClick={() => {
            this.props.logout();
            this.props.history.push('/');
          }}
        >
          <p style={styles.label}>Abmelden</p>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = {
  logout: appActions.logout,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavBar),
);
