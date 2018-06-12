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
      activeClasses: ['1a', '1b'],
    };
  }

  addTimetable(schoolClass) {
    const classes = this.state.activeClasses;
    classes.push(schoolClass);
    this.setState({
      activeClasses: classes,
    });
  }

  removeTimetable(schoolClass) {
    const classes = this.state.activeClasses;
    classes.splice(classes.indexOf(schoolClass), 1);
    this.setState({
      activeClasses: classes,
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

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.classes}>
            <div style={styles.class} onClick={() => this.addTimetable('1a')}>
              <p style={styles.classLabel}>1a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('1b')}>
              <p style={styles.classLabel}>1b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('2a')}>
              <p style={styles.classLabel}>2a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('2b')}>
              <p style={styles.classLabel}>2b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('3a')}>
              <p style={styles.classLabel}>3a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('3b')}>
              <p style={styles.classLabel}>3b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('4a')}>
              <p style={styles.classLabel}>4a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('4b')}>
              <p style={styles.classLabel}>4b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('5a')}>
              <p style={styles.classLabel}>5a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('5b')}>
              <p style={styles.classLabel}>5b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('6a')}>
              <p style={styles.classLabel}>6a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('6b')}>
              <p style={styles.classLabel}>6b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('7a')}>
              <p style={styles.classLabel}>7a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('7b')}>
              <p style={styles.classLabel}>7b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('8a')}>
              <p style={styles.classLabel}>8a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('8b')}>
              <p style={styles.classLabel}>8b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('9a')}>
              <p style={styles.classLabel}>9a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('9b')}>
              <p style={styles.classLabel}>9b</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('10a')}>
              <p style={styles.classLabel}>10a</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('10b')}>
              <p style={styles.classLabel}>10b</p>
            </div>
          </div>
          <div style={styles.timetables}>{this.renderTimetables()}</div>
        </div>
      </div>
    );
  }
}

export default Stundenplan;
