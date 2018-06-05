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
  render() {
    const { style, icon, text, onClick } = this.props;

    return (
      <div style={styles.container}>
        {icon && <img style={styles.icon} src={icon} alt={text} />}
        <a style={{ ...styles.link, ...style }} href="" onClick={onClick}>
          {text}
        </a>
      </div>
    );
  }
}

export default Link;
