import React, { Component } from 'react';
import Logo from '../assets/logo.svg';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    clipPath: 'circle(100px at center)',
    height: 200,
    width: 200,
    margin: '10px 20px 0px 0px',
  },
  hoverPlaneBottom: {
    position: 'relative',
    alignSelf: 'flex-end',
    background: 'rgba(0, 0, 0, 0.5) 0 20px',
    color: Colors.white,
    fontSize: 18,
    padding: 20,
    margin: '0 auto',
    textAlign: 'center',
    width: 200,
    cursor: 'pointer',
    transition: '0.3s linear',
  },
  fileInput: {
    position: 'relative',
    alignSelf: 'center',
    cursor: 'pointer',
  },
};

class Avatar extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      photo: true,
      input: 'none',
    };
  }

  handleHover = () => {
    this.setState({
      hover: !this.state.hover,
    });
  };

  handleToggleAvatar = e => {
    e.preventDefault();
    this.setState({
      photo: !this.state.photo,
      input: 'block',
    });
  };

  render() {
    const { photo } = this.props;
    let imgUrl = this.state.photo ? photo || Logo : '';
    let text = this.state.photo ? 'Löschen' : 'Hinzufügen';
    const bgr = {
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: 'contain',
    };
    const normalStyle = {
      visibility: 'hidden',
    };

    let avatarStyle = this.state.hover ? styles.hoverPlaneBottom : normalStyle;
    return (
      <div
        id="avatar"
        style={{ ...styles.container, ...bgr }}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
        {!this.state.photo && (
          <input
            id="avatarload"
            type="file"
            accept=".jpg, .jpeg, .png"
            style={{ ...styles.fileInput, display: this.state.input }}
          />
        )}
        <div id="btnLoad" style={avatarStyle} onClick={this.handleToggleAvatar}>
          {text}
        </div>
      </div>
    );
  }
}
export default Avatar;
