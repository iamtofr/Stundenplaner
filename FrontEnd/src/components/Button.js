import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

let styles = {
  button: {
    alignSelf: 'center',
    padding: `8px 12px 8px 12px`,
    border: 0,
    borderRadius: 5,
    color: Colors.light,
    fontSize: 16,
    boxShadow: `0px 1px 2px ${Colors.darkBlue}`,
    outline: 0,
  },
};

class Button extends Component {
  render() {
    const { style, text, color, onClick } = this.props;

    return (
      <button
        style={{ ...styles.button, ...style, ...{ backgroundColor: color } }}
        type="submit"
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}

export default Button;
