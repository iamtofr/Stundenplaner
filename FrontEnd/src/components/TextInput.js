import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  label: {
    fontSize: 16,
    margin: 5,
  },
  input: {
    height: 30,
    paddingLeft: 5,
    border: 0,
    borderBottom: `1px solid ${Colors.darkBlue}`,
    fontSize: 14,
    background: 0,
    outline: 0,
  },
};

class TextInput extends Component {
  render() {
    const { label, value, type, onChange } = this.props;
    return (
      <div style={styles.container}>
        {label && <p style={styles.label}>{label}</p>}
        <input style={styles.input} type={type} value={value} onChange={onChange} />
      </div>
    );
  }
}

export default TextInput;
