import React, { Component } from 'react';
import Timetable from './Timetable';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
  },
  classes: {
    height: 1000,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  class: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginBottom: 5,
    border: `1px solid ${Colors.grey}`,
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
      activeClasses: [],
      classList: [
        '1a',
        '1b',
        '2a',
        '2b',
        '3a',
        '3b',
        '4a',
        '4b',
        '5a',
        '5b',
        '6a',
        '6b',
        '7a',
        '7b',
        '8a',
        '8b',
        '9a',
        '9b',
        '10a',
        '10b',
      ],
    };
  }

  addTimetable(schoolClass) {
    const activeClasses = this.state.activeClasses;
    const classes = this.state.classList;
    activeClasses.push(schoolClass);
    classes.splice(classes.indexOf(schoolClass), 1);
    this.setState({
      activeClasses: activeClasses,
      classList: classes,
    });
  }

  removeTimetable(schoolClass) {
    const activeClasses = this.state.activeClasses;
    const classes = this.state.classList;
    activeClasses.splice(activeClasses.indexOf(schoolClass), 1);
    classes.push(schoolClass);
    this.setState({
      activeClasses: activeClasses,
      classList: classes,
    });
  }

  renderTimetables() {
    const array = [];
    for (let i = 0; i < this.state.activeClasses.length; i++) {
      array.push(
        <Timetable
          schoolClass={this.state.activeClasses[i]}
          key={i.toString()}
          onClose={() => this.removeTimetable(this.state.activeClasses[i])}
        />,
      );
    }
    return array;
  }

  renderClassList() {
    const array = [];
    for (let i = 0; i < this.state.classList.length; i++) {
      array.push(
        <div style={styles.class} onClick={() => this.addTimetable(this.state.classList[i])}>
          <p style={styles.classLabel}>{this.state.classList[i]}</p>
        </div>,
      );
    }
    return array;
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.classes}>{this.renderClassList()}</div>
          <div style={styles.timetables}>{this.renderTimetables()}</div>
        </div>
      </div>
    );
  }
}

export default Stundenplan;
