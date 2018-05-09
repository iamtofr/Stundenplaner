import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

let styles = {
  button: {
    alignSelf: 'center',
    padding: 10,
    border: 0,
    borderRadius: 5,
    color: Colors.light,
    fontSize: 16,
    boxShadow: `0px 1px 2px ${Colors.darkBlue}`,
    outline: 0,
  },
};

class Button extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  onRelease = () => {
    this.setState({
      clicked: false,
    });
    this.props.onClick();
  };

  onPress = () => {
    this.setState({
      clicked: true,
    });
  };

  render() {
    const { text } = this.props;

    const buttonColor = this.state.clicked
      ? { backgroundImage: `linear-gradient(to bottom, ${Colors.blue}, ${Colors.lightBlue})` }
      : { backgroundImage: `linear-gradient(to bottom, ${Colors.lightBlue}, ${Colors.blue})` };

    return (
      <button
        style={{ ...styles.button, ...buttonColor }}
        type="button"
        onMouseDown={this.onPress}
        onMouseUp={this.onRelease}
      >
        {text}
      </button>
    );
  }
}

export default Button;
