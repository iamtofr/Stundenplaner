import React, { Component } from 'react';
import * as Colors from '../constants/Colors';
import iconClose from '../assets/iconClose.svg';

const styles = {
  widget: {
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.lightGrey,
    boxShadow: [
      '0 3px 1px -2px rgba(0,0,0,.2)',
      '0 2px 2px 0 rgba(0,0,0,.14)',
      '0 1px 5px 0 rgba(0,0,0,.12)',
    ],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  label: {
    margin: 0,
    marginBottom: 20,
    padding: 0,
    fontSize: 21,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  image: {
    width: 150,
    height: 150,
  },
  closebutton: {
    position: 'absolute',
    padding: 0,
    top: 14,
    right: 14,
    background: 0,
    border: 0,
  },
  icon: {
    margin: 0,
    width: 24,
    height: 24,
  },
};

class Widget extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      buttonhover: false,
    };
  }

  render() {
    const { style, text, children, onClose } = this.props;
    const cursor = this.state.hover ? { cursor: 'move' } : { cursor: 'normal' };
    const color = this.state.buttonhover
      ? { opacity: 0.87, cursor: 'normal' }
      : { opacity: 0.54, cursor: 'pointer' };
    return (
      <div
        style={{ ...styles.widget, ...style, ...cursor }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div style={styles.content}>
          {onClose && (
            <span
              style={{ ...styles.closebutton, ...color }}
              onMouseEnter={() => this.setState({ buttonhover: true })}
              onMouseLeave={() => this.setState({ buttonhover: false })}
              onClick={() => onClose()}
            >
              <img style={styles.icon} src={iconClose} alt="closeWidget" />
            </span>
          )}
          <p style={styles.label}>{text}</p>
          {children}
        </div>
      </div>
    );
  }
}

export default Widget;
