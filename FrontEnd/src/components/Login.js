import React, { Component } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import * as Colors from '../constants/Colors';
import iconUser from '../assets/user.svg';
import iconPassword from '../assets/password.svg';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: Colors.light,
  },
  error: {
    height: 20,
    marginLeft: 35,
    color: 'red',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      nameError: '',
      passwordError: '',
    };
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <form style={styles.container}>
        <TextInput icon={iconUser} label="Login" />
        <p style={styles.error}>{this.state.nameError}</p>
        <TextInput icon={iconPassword} label="Passwort" password />
        <p style={styles.error}>{this.state.passwordError}</p>
        <Button margin={50} text="Einloggen" onClick={onSubmit} />
      </form>
    );
  }
}

export default App;
