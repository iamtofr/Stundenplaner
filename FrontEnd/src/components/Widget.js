import React, { Component } from 'react';
import * as Colors from '../constants/Colors';
import Logo from '../assets/logo.svg';

const styles = {
  widget: {
    alignSelf: 'center',
    padding: 20,
    border: 0,
    borderRadius: 10,
    color: Colors.light,
    fontSize: 16,
    boxShadow: `0px 1px 2px ${Colors.darkBlue}`,
    outline: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
};

class Widget extends Component {
  render() {
    const { style, image, text, color, onClick } = this.props;

    return (
      <button
        style={{ ...styles.widget, ...style, ...{ backgroundColor: color } }}
        type="button"
        onClick={onClick}
      >
        <div style={styles.content}>
          <p style={styles.label}>{text}</p>
          <img style={styles.image} src={image || Logo} alt={text} />
        </div>
      </button>
    );
  }
}

export default Widget;
