import React, { Component } from 'react';
import * as Colors from '../constants/Colors';
import iconVisible from '../assets/visible.svg';
import iconInvisible from '../assets/invisible.svg';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
    pathFill: Colors.darkBlue,
  },
  label: {
    color: Colors.blue,
    marginBottom: 5,
  },
  input: {
    width: 250,
    height: 30,
    border: 0,
    borderBottom: `1px solid ${Colors.darkBlue}`,
    fontSize: 18,
    color: Colors.darkBlue,
    backgroundColor: Colors.light,
  },
};

class TextInput extends Component {
  constructor(props) {
    super();
    this.state = {
      hideInput: props.password || false,
    };
  }

  onVisiblityClick = () => {
    this.setState({
      hideInput: !this.state.hideInput,
    });
  };

  render() {
    const { icon, label, password } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.row}>
          <img style={styles.icon} src={icon} />
          <div style={styles.column}>
            <p style={styles.label}>{label}</p>
            <input style={styles.input} type={this.state.hideInput ? 'password' : 'text'} />
          </div>
          {password && (
            <img
              style={{ ...styles.icon, ...{ marginLeft: -25 } }}
              src={this.state.hideInput ? iconVisible : iconInvisible}
              onClick={this.onVisiblityClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default TextInput;
