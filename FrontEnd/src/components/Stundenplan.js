import React, { Component } from 'react';
import Timetable from './Timetable';
import * as SortUtils from '../utils/SortUtils';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    color: Colors.darkBlue,
  },
  content: {
    display: 'flex',
  },
  classes: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
  },
  class: {
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginBottom: 5,
    border: `1px solid ${Colors.grey}`,
    boxShadow: [
      '0 3px 1px -2px rgba(0,0,0,.2)',
      '0 2px 2px 0 rgba(0,0,0,.14)',
      '0 1px 5px 0 rgba(0,0,0,.12)',
    ],
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
      activeClasses: [{ grade: '1', letter: 'a' }, { grade: '1', letter: 'b' }],
      classList: [
        { grade: '2', letter: 'b' },
        { grade: '2', letter: 'a' },
        { grade: '3', letter: 'a' },
        { grade: '3', letter: 'b' },
        { grade: '4', letter: 'a' },
        { grade: '4', letter: 'b' },
        { grade: '5', letter: 'a' },
        { grade: '5', letter: 'b' },
        { grade: '6', letter: 'a' },
        { grade: '6', letter: 'b' },
        { grade: '7', letter: 'a' },
        { grade: '7', letter: 'b' },
        { grade: '8', letter: 'a' },
        { grade: '8', letter: 'b' },
        { grade: '9', letter: 'a' },
        { grade: '9', letter: 'b' },
        { grade: '10', letter: 'a' },
        { grade: '10', letter: 'b' },
      ],
    };
  }

  addTimetable(schoolClass) {
    const { activeClasses, classList } = this.state;
    activeClasses.push(schoolClass);
    classList.splice(classList.indexOf(schoolClass), 1);
    this.setState({
      activeClasses: activeClasses,
      classList: classList,
    });
  }

  removeTimetable(schoolClass) {
    const { activeClasses, classList } = this.state;
    activeClasses.splice(activeClasses.indexOf(schoolClass), 1);
    classList.push(schoolClass);
    classList.sort(SortUtils.byClassesASC);
    this.setState({
      activeClasses: activeClasses,
      classList: classList,
    });
  }

  renderTimetables() {
    const { activeClasses } = this.state;
    const array = [];
    for (let i = 0; i < activeClasses.length; i++) {
      array.push(
        <Timetable
          schoolClass={activeClasses[i]}
          key={i.toString()}
          onClose={() => this.removeTimetable(activeClasses[i])}
        />,
      );
    }
    return array;
  }

  renderClassList() {
    const { classList } = this.state;
    const array = [];
    for (let i = 0; i < classList.length; i++) {
      array.push(
        <div
          style={styles.class}
          key={i.toString()}
          onClick={() => this.addTimetable(classList[i])}
        >
          <p style={styles.classLabel}>
            {classList[i].grade}
            {classList[i].letter}
          </p>
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
