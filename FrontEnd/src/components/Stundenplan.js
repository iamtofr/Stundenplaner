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
      activeClasses: ['1A', '1B'],
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
            <div style={styles.class} onClick={() => this.addTimetable('1A')}>
              <p style={styles.classLabel}>1A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('1B')}>
              <p style={styles.classLabel}>1B</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('2A')}>
              <p style={styles.classLabel}>2A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('2B')}>
              <p style={styles.classLabel}>2B</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('3A')}>
              <p style={styles.classLabel}>3A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('3B')}>
              <p style={styles.classLabel}>3B</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('4A')}>
              <p style={styles.classLabel}>4A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('4B')}>
              <p style={styles.classLabel}>4B</p>
            </div>
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
            <div style={styles.class} onClick={() => this.addTimetable('7A')}>
              <p style={styles.classLabel}>7A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('7B')}>
              <p style={styles.classLabel}>7B</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('8A')}>
              <p style={styles.classLabel}>8A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('8B')}>
              <p style={styles.classLabel}>8B</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('9A')}>
              <p style={styles.classLabel}>9A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('9B')}>
              <p style={styles.classLabel}>9B</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('10A')}>
              <p style={styles.classLabel}>10A</p>
            </div>
            <div style={styles.class} onClick={() => this.addTimetable('10B')}>
              <p style={styles.classLabel}>10B</p>
            </div>
          </div>
          <div style={styles.timetables}>{this.renderTimetables()}</div>
        </div>
      </div>
    );
  }
}

export default Stundenplan;
