import React, { Component } from 'react';
import Button from '../components/Button';
import * as Colors from '../constants/Colors';

const styles = {
  course: {
    width: 200,
    padding: `8px 12px 8px 12px`,
    border: 0,
    borderRadius: 5,
    color: Colors.light,
    fontSize: 16,
    boxShadow: `0px 1px 2px ${Colors.darkBlue}`,
    backgroundColor: Colors.blue,
  },
};

class Course extends Component {
  render() {
    const { subject, room, initials } = this.props;
    const label = `${subject} / ${room} / ${initials}`;
    return <div style={styles.course}>{label}</div>;
  }
}

export default Course;
