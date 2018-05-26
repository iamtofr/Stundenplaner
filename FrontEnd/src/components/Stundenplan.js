import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Course from '../components/Course';
import * as Colors from '../constants/Colors';
import Grid from '../assets/Grid.png';

const GridLayout = WidthProvider(RGL);

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
  activeTimetable: {
    display: 'flex',
    flex: 1,
    border: `1px solid ${Colors.grey}`,
  },
  activeClass: {
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

class Stundenplan extends Component {
  constructor() {
    super();
    const layout = this.generateLayout();
    this.state = {
      layout,
      items,
      activeClass: '5A',
    };
  }

  generateLayout() {
    const array = [];
    for (let i = 0; i < 5 * 10; i++) {
      array.push({
        x: Math.floor(i / 6),
        y: i % 6,
        w: 1,
        h: 1,
        i: i.toString(),
      });
    }
    return array;
  }

  generateDOM() {
    const array = [];
    for (let i = 0; i < items.length; i++) {
      array.push(
        <div key={i}>
          <Course subject={items[i].subject} room={items[i].room} initials={items[i].teacher} />
        </div>,
      );
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
            <div style={styles.class} onClick={() => this.setState({ activeClass: '5A' })}>
              <p style={styles.classLabel}>5A</p>
            </div>
            <div style={styles.class} onClick={() => this.setState({ activeClass: '5B' })}>
              <p style={styles.classLabel}>5B</p>
            </div>
            <div style={styles.class} onClick={() => this.setState({ activeClass: '6A' })}>
              <p style={styles.classLabel}>6A</p>
            </div>
            <div style={styles.class} onClick={() => this.setState({ activeClass: '6B' })}>
              <p style={styles.classLabel}>6B</p>
            </div>
          </div>
          <div style={styles.activeTimetable}>
            <div style={styles.activeClass}>
              <p style={styles.classLabel}>{this.state.activeClass}</p>
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
        </div>
      </div>
    );
  }
}

export default Stundenplan;
