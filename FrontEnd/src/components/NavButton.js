import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

let styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    boxSizing: 'border-box',
    width: 130,
    height: '100%',
    textAlign: 'center',
    margin: 0,
  },
  activetab: {
    boxSizing: 'border-box',
    width: 130,
    height: '100%',
    textAlign: 'center',
    borderBottom: '3px',
    borderBottomColor: Colors.yellow,
    borderBottomStyle: 'solid',
  },
  link: {
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: '14px',
    color: Colors.white,
    textDecoration: 'none',
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
    const { style, text, onClick, isActive } = this.props;
    const cursor = this.state.hover ? { cursor: 'pointer' } : { cursor: 'normal' };
    const buttonStyle = isActive ? styles.activetab : styles.tab;

    return (
      <div
        style={{ ...styles.container, ...cursor, ...buttonStyle }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={() => onClick()}
      >
        <p style={{ ...styles.link, ...style }} onClick={event => event.preventDefault()}>
          {text}
        </p>
      </div>
    );
  }
}

export default Link;
