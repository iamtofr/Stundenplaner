import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.light,
  },
  input: {
    width: 150,
  },
  button: {
    backgroundColor: Colors.lightBlue,
  },
};

class App extends Component {
  handleLogin = e => {
    console.log('submitted');
    e.preventDefault();
  };

  render() {
    return (
      <form style={styles.container}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input style={styles.button} type="submit" value="LOGIN" onSubmit={this.handleLogin} />
      </form>
    );
  }
}

export default App;
