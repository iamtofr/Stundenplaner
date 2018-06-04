import React, { Component } from 'react';
import { connect } from 'react-redux';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { actions as appActions } from '../reducers/app';
import Course from '../components/Course';
import * as Colors from '../constants/Colors';
import Grid from '../assets/Grid.png';

const GridLayout = WidthProvider(RGL);

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    border: `1px solid ${Colors.grey}`,
  },
  classLabel: {
    padding: 10,
    margin: 0,
    transform: 'rotate(-90deg)',
    fontWeight: 'bold',
  },
  class: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  hours: {
    height: 495,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 2.5,
    marginBottom: 2.5,
  },
  hour: {
    padding: 10,
    margin: 0,
  },
  background: {
    flex: 1,
    padding: 0,
    backgroundImage: `url(${Grid})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  },
  timetable: {
    flex: 1,
  },
};

const items = [
  { id: '0', subject: 'Deutsch', room: '303', teacher: 'DE' },
  { id: '1', subject: 'Englisch', room: '303', teacher: 'EN' },
  { id: '2', subject: 'Mathe', room: '303', teacher: 'MA' },
  { id: '3', subject: 'Chemie', room: '303', teacher: 'CH' },
  { id: '4', subject: 'Biologie', room: '303', teacher: 'BI' },
  { id: '5', subject: 'Physik', room: '303', teacher: 'PH' },
  { id: '6', subject: 'Sport', room: '303', teacher: 'SP' },
  { id: '7', subject: 'Musik', room: '303', teacher: 'MU' },
  { id: '8', subject: 'Französisch', room: '303', teacher: 'FR' },
  { id: '9', subject: 'Kunst', room: '303', teacher: 'KU' },
  { id: '10', subject: 'Politik', room: '303', teacher: 'PO' },
  { id: '11', subject: 'Geschichte', room: '303', teacher: 'GE' },
  { id: '12', subject: 'Latein', room: '303', teacher: 'LA' },
  { id: '13', subject: 'Deutsch', room: '303', teacher: 'DE' },
  { id: '14', subject: 'Englisch', room: '303', teacher: 'EN' },
  { id: '15', subject: 'Mathe', room: '303', teacher: 'MA' },
  { id: '16', subject: 'Chemie', room: '303', teacher: 'CH' },
  { id: '17', subject: 'Biologie', room: '303', teacher: 'BI' },
  { id: '18', subject: 'Physik', room: '303', teacher: 'PH' },
  { id: '19', subject: 'Sport', room: '303', teacher: 'SP' },
  { id: '20', subject: 'Musik', room: '303', teacher: 'MU' },
  { id: '21', subject: 'Französisch', room: '303', teacher: 'FR' },
  { id: '22', subject: 'Kunst', room: '303', teacher: 'KU' },
  { id: '23', subject: 'Politik', room: '303', teacher: 'PO' },
  { id: '24', subject: 'Geschichte', room: '303', teacher: 'GE' },
  { id: '25', subject: 'Latein', room: '303', teacher: 'LA' },
  { id: '26', subject: 'Deutsch', room: '303', teacher: 'DE' },
  { id: '27', subject: 'Englisch', room: '303', teacher: 'EN' },
  { id: '28', subject: 'Mathe', room: '303', teacher: 'MA' },
];

class Timetable extends Component {
  constructor() {
    super();
    const layout = this.generateLayout();
    this.state = {
      layout,
      //items,
    };
  }

  generateLayout() {
    const array = [];
    for (let i = 0; i < 5 * 10; i++) {
      array.push({
        x: Math.floor(i / 10),
        y: i % 10,
        w: 1,
        h: 1,
        i: i.toString(),
      });
    }
    console.log(array);
    return array;
  }

  generateDOM() {
    const { lectures } = this.props;
    const array = [];

    lectures.forEach(lecture => {
      const index = lecture.period.day * 10 + lecture.period.slot;
      array.push(
        <div key={index}>
          <Course subject={lecture.subject} room={lecture.room} initials={lecture.teacher} />
        </div>,
      );
    });

    return array;
  }

  render() {
    const { schoolClass, lectures } = this.props;

    console.log(lectures);

    return (
      <div style={styles.container}>
        <div style={styles.class}>
          <p style={styles.classLabel}>{schoolClass}</p>
        </div>
        <div style={styles.hours}>
          <p style={styles.hour}>1. Stunde</p>
          <p style={styles.hour}>2. Stunde</p>
          <p style={styles.hour}>3. Stunde</p>
          <p style={styles.hour}>4. Stunde</p>
          <p style={styles.hour}>5. Stunde</p>
          <p style={styles.hour}>6. Stunde</p>
          <p style={styles.hour}>7. Stunde</p>
          <p style={styles.hour}>8. Stunde</p>
          <p style={styles.hour}>9. Stunde</p>
          <p style={styles.hour}>10. Stunde</p>
        </div>
        <div style={styles.background}>
          <GridLayout
            style={styles.timetable}
            layout={this.state.layout}
            cols={5}
            rowHeight={40}
            containerPadding={[5, 5]}
            margin={[10, 10]}
            compactType={null}
            isResizable={false}
            preventCollision
          >
            {this.generateDOM()}
          </GridLayout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lectures: state.app.lectures,
});

const mapDispatchToProps = {
  setLectures: appActions.setLectures,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
