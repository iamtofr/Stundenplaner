import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as appActions } from '../reducers/app';
import Button from './Button';
import * as Colors from '../constants/Colors';
import iconUser from '../assets/iconUser.svg';
import iconPassword from '../assets/iconPassword.svg';
import iconVisible from '../assets/iconVisible.svg';
import iconInvisible from '../assets/iconInvisible.svg';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
  },
  textInput: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  label: {
    color: Colors.blue,
    marginBottom: 5,
  },
  input: {
    width: 250,
    height: 30,
    border: 0,
    borderBottom: `1px solid ${Colors.darkBlue}`,
    fontSize: 18,
    color: Colors.darkBlue,
    background: 0,
    outline: 0,
  },
  error: {
    height: 20,
    marginLeft: 35,
    fontSize: 14,
    color: 'red',
  },
  link: {
    alignSelf: 'center',
    marginTop: 30,
    color: Colors.darkBlue,
  },
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      nameError: '',
      passwordError: '',
      hideInput: true,
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  submitForm = () => {
    if (this.isValid()) {
      this.handleLogin();
    }
  };

  isValid = () => {
    this.setState({
      nameError: '',
      passwordError: '',
    });
    if (!this.state.name) {
      this.setState({
        nameError: 'Bitte gib einen Namen ein.',
      });
      return false;
    }

    if (!this.state.password) {
      this.setState({
        passwordError: 'Bitte gib ein Passwort ein.',
      });
      return false;
    }

    return true;
  };

  handleLogin = () => {
    console.log('handleLogin: ' + this.state.name + ', ' + this.state.password);
    fetch('https://stundenplaner.online/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.name,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.props.login({
          username: this.state.name,
          password: this.state.password,
          token: responseJson.token,
          profile: responseJson.profile,
        });
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        this.setState({
          passwordError: 'Benutzername oder Passwort falsch.',
        });
      });
  };

  onVisiblityClick = () => {
    this.setState({
      hideInput: !this.state.hideInput,
    });
  };

  onLinkClicked = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form style={styles.container}>
        <div style={styles.textInput}>
          <img style={styles.icon} src={iconUser} alt="userIcon" />
          <div style={styles.column}>
            <p style={styles.label}>Login</p>
            <input
              style={styles.input}
              type="text"
              value={this.state.name}
              onChange={event =>
                this.setState({
                  name: event.target.value.trim(),
                })
              }
            />
          </div>
        </div>
        <p style={styles.error}>{this.state.nameError}</p>
        <div style={styles.textInput}>
          <img style={styles.icon} src={iconPassword} alt="passwordIcon" />
          <div style={styles.column}>
            <p style={styles.label}>Passwort</p>
            <input
              style={styles.input}
              type={this.state.hideInput ? 'password' : 'text'}
              value={this.state.password}
              onChange={event =>
                this.setState({
                  password: event.target.value.trim(),
                })
              }
            />
          </div>
          <img
            style={{ ...styles.icon, ...{ marginLeft: -25 } }}
            src={this.state.hideInput ? iconVisible : iconInvisible}
            alt="hidePassword"
            onClick={this.onVisiblityClick}
          />
        </div>
        <p style={styles.error}>{this.state.passwordError}</p>
        <Button
          text="Einloggen"
          color={Colors.blue}
          hoverColor={Colors.lightBlue}
          onClick={this.submitForm}
        />
        <a style={styles.link} href="" onClick={this.onLinkClicked}>
          Passwort vergessen
        </a>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = {
  login: appActions.login,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
