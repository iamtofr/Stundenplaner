import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  course: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: Colors.blue,
  },
  label: {
    margin: 0,
    padding: 5,
    fontSize: 16,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: Colors.light,
  },
};

class Course extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
    };
  }

  render() {
    const { style, subject, room, initials } = this.props;
    const cursor = this.state.hover ? { cursor: 'move' } : { cursor: 'normal' };
    const label = `${subject} / ${room} / ${initials}`;

    return (
      <div
        style={{ ...styles.course, ...style, ...cursor }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <p style={styles.label}>{label}</p>
      </div>
    );
  }
}

export default Course;
