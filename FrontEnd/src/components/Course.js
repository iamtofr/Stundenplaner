import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  course: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    let color;
    switch (subject) {
      case 'Deutsch':
        color = { backgroundColor: Colors.subject0 };
        break;
      case 'Englisch':
        color = { backgroundColor: Colors.subject1 };
        break;
      case 'Französich':
        color = { backgroundColor: Colors.subject2 };
        break;
      case 'Chemie':
        color = { backgroundColor: Colors.subject3 };
        break;
      case 'Biologie':
        color = { backgroundColor: Colors.subject4 };
        break;
      case 'Physik':
        color = { backgroundColor: Colors.subject5 };
        break;
      case 'Sport':
        color = { backgroundColor: Colors.subject6 };
        break;
      case 'Musik':
        color = { backgroundColor: Colors.subject7 };
        break;
      case 'Mathe':
        color = { backgroundColor: Colors.subject8 };
        break;
      case 'Kunst':
        color = { backgroundColor: Colors.subject9 };
        break;
      case 'Politik':
        color = { backgroundColor: Colors.subject10 };
        break;
      case 'Geschichte':
        color = { backgroundColor: Colors.subject11 };
        break;
      case 'Latein':
        color = { backgroundColor: Colors.subject12 };
        break;
    }

    return (
      <div
        style={{ ...styles.course, ...style, ...color, ...cursor }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <p style={styles.label}>{label}</p>
      </div>
    );
  }
}

export default Course;
