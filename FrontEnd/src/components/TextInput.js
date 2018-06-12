import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 10px 16px 10px',
    width: '256px',
  },
  label: {
    fontSize: 16,
    margin: 0,
    color: Colors.black,
    opacity: 0.54,
  },
  input: {
    height: 30,
    paddingLeft: 5,
    marginTop: 8,
    border: 0,
    borderBottom: `1px solid ${Colors.lineGrey}`,
    fontSize: 18,
    color: Colors.black,
    opacity: 0.87,
    background: 0,
    outline: 0,
  },
};

class TextInput extends Component {
  render() {
    const { label, value, type, width, onChange } = this.props;
    return (
      <div style={{ ...styles.container, ...width }}>
        {label && <p style={styles.label}>{label}</p>}
        <input style={styles.input} type={type} value={value} onChange={onChange} />
      </div>
    );
  }
}

export default TextInput;
