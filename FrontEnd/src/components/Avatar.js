import React, { Component } from 'react';
import Logo from '../assets/logo.svg';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  hoverPlane: {
    position: 'relative',
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    opacity: 0,
    color: Colors.white,
    fontSize: '20px',
    padding: '20px',
    textAlign: 'center',
  },
};

class Avatar extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
    };
  }

  handleHover = () => {
    this.setState({
      hover: !this.state.hover,
    });
  };

  render() {
    const { photo } = this.props;

    const normalStyle = {};
    const hoverStyle = {
      width: 200,
      height: 200,
      borderRadius: 100,
      margin: 10,
      backgroundColor: Colors.black,
      opacity: 0.42,
    };
    let avatarStyle = this.state.hover ? normalStyle : styles.hoverPlane;
    return (
      <div style={styles.container} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        <span style={avatarStyle}>Bearbeiten</span>
        <img id="avatar" style={styles.avatar} src={photo || Logo} alt="Avatar" />
        <span>Löschen</span>
      </div>
    );
  }
}

export default Avatar;
