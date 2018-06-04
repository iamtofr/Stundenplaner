import React, { Component } from 'react';
import Timetable from './Timetable';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  days: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 175,
  },
  day: {
    padding: 10,
    margin: 0,
  },
  content: {
    display: 'flex',
  },
  classes: {
    display: 'flex',
    flexDirection: 'column',
  },
  class: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: 0,
    borderStyle: 'solid',
    borderColor: Colors.grey,
    borderWidth: `1px 0px 1px 1px`,
  },
  classLabel: {
    padding: 10,
    margin: 0,
    transform: 'rotate(-90deg)',
    fontWeight: 'bold',
  },
  timetables: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
};

class Stundenplan extends Component {
  constructor() {
    super();
    this.state = {
      activeClasses: ['5A'],
    };
  }

  addTimetable(schoolClass) {
    const classes = this.state.activeClasses;
    classes.push(schoolClass);
    this.setState({
      activeClasses: classes,
    });
  }

  renderTimetables() {
    const array = [];
    for (let i = 0; i < this.state.activeClasses.length; i++) {
      array.push(<Timetable schoolClass={this.state.activeClasses[i]} key={i.toString()} />);
    }
    return array;
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.days}>
          <p style={styles.day}>Montag</p>
          <p style={styles.day}>Dienstag</p>
          <p style={styles.day}>Mittwoch</p>
          <p style={styles.day}>Donnerstag</p>
          <p style={styles.day}>Freitag</p>
        </div>
        <div style={styles.content}>
          <div style={styles.classes}>
            <div style={styles.class} onClick={() => this.addTimetable('5A')}>
              <p style={styles.classLabel}>5A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('5B')}>
              <p style={styles.classLabel}>5B</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('6A')}>
              <p style={styles.classLabel}>6A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('6B')}>
              <p style={styles.classLabel}>6B</p>
            </div>
          </div>
          <div style={styles.timetables}>{this.renderTimetables()}</div>
        </div>
      </div>
    );
  }
}

export default Stundenplan;
