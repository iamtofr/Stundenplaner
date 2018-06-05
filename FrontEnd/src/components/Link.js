import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

let styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  link: {
    color: Colors.darkBlue,
  },
};

class Link extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
    };
  }

  render() {
    const { style, icon, text, onClick } = this.props;
    const cursor = this.state.hover ? { cursor: 'pointer' } : { cursor: 'normal' };

    return (
      <div
        style={{ ...styles.container, ...cursor }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={() => onClick()}
      >
        {icon && <img style={styles.icon} src={icon} alt={text} />}
        <a style={{ ...styles.link, ...style }} href="" onClick={event => event.preventDefault()}>
          {text}
        </a>
      </div>
    );
  }
}

export default Link;
