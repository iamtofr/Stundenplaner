import React, { Component } from 'react';
import Course from '../components/Course';

class Stundenplan extends Component {
  render() {
    return <Course subject="Biologie" room="303" initials="GT" />;
  }
}

export default Stundenplan;
