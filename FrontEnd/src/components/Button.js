import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  button: {
    backgroundColor: Colors.yellow,
  },
};

class App extends Component {
  onClick = () => {
    console.log('clicked');
  };

  render() {
    const {} = this.props;
    return (
      <button style={styles.button} type="button" onClick={this.onClick}>
        Click me!
      </button>
    );
  }
}

export default App;
