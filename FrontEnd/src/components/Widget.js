import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  widget: {
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.lightGrey,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
  },
};

class Widget extends Component {
  render() {
    const { style, text, children } = this.props;

    return (
      <div style={{ ...styles.widget, ...style }}>
        <div style={styles.content}>
          <p style={styles.label}>{text}</p>
          {children}
        </div>
      </div>
    );
  }
}

export default Widget;
