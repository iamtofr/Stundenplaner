import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import Course from '../components/Course';
import * as Colors from '../constants/Colors';

const styles = {
  container: {},
  cell: {
    backgroundColor: Colors.blue,
  },
};

class Stundenplan extends Component {
  render() {
    return (
      <GridLayout className="layout" width={800} cols={10} rowHeight={50}>
        <Course
          subject="Biologie"
          room="303"
          initials="GT"
          key="a1"
          data-grid={{ x: 0, y: 0, w: 1, h: 1 }}
        />
        <Course
          subject="Mathematik"
          room="123"
          initials="AB"
          key="b1"
          data-grid={{ x: 0, y: 0, w: 1, h: 1 }}
        />
        <Course
          subject="Musik"
          room="501"
          initials="CT"
          key="c1"
          data-grid={{ x: 0, y: 0, w: 1, h: 1 }}
        />
        <Course
          subject="Sport"
          room="Turnhalle"
          initials="LB"
          key="d1"
          data-grid={{ x: 0, y: 0, w: 1, h: 1 }}
        />
        <Course
          subject="Politikwissenschaften"
          room="246"
          initials="ME"
          key="e1"
          data-grid={{ x: 0, y: 0, w: 1, h: 1 }}
        />
        <Course
          subject="Biologie"
          room="303"
          initials="GT"
          key="a2"
          data-grid={{ x: 0, y: 4, w: 1, h: 1 }}
        />
        <Course
          subject="Mathematik"
          room="123"
          initials="AB"
          key="b2"
          data-grid={{ x: 0, y: 4, w: 1, h: 1 }}
        />
        <Course
          subject="Musik"
          room="501"
          initials="CT"
          key="c2"
          data-grid={{ x: 0, y: 4, w: 1, h: 1 }}
        />
        <Course
          subject="Sport"
          room="Turnhalle"
          initials="LB"
          key="d2"
          data-grid={{ x: 0, y: 4, w: 1, h: 1 }}
        />
        <Course
          subject="Politikwissenschaften"
          room="246"
          initials="ME"
          key="e2"
          data-grid={{ x: 0, y: 4, w: 1, h: 1 }}
        />
      </GridLayout>
    );
  }
}

export default Stundenplan;
