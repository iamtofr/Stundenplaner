import React, { Component } from 'react';
import Button from '../components/Button';
import * as Colors from '../constants/Colors';

class Course extends Component {
  render() {
    const { subject, room, initials } = this.props;
    const label = `${subject} - ${room} - ${initials}`;
    return <Button text={label} color={Colors.blue} />;
  }
}

export default Course;
