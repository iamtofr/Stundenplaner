import React, { Component } from 'react';
import { connect } from 'react-redux';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { actions as appActions } from '../reducers/app';
import Course from '../components/Course';
import * as Colors from '../constants/Colors';
import iconClose from '../assets/iconClose.svg';
import Grid from '../assets/Grid.png';

const GridLayout = WidthProvider(RGL);

const styles = {
  all: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: 42,
    display: 'flex',
    flex: 1,
    borderWidth: `1px 1px 0px 1px`,
    borderStyle: 'solid',
    borderColor: Colors.grey,
  },
  close: {
    padding: 10,
    marginRight: 100,
  },
  days: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  day: {
    padding: 10,
    margin: 0,
  },
  container: {
    display: 'flex',
    flex: 1,
    border: `1px solid ${Colors.grey}`,
    marginBottom: 5,
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
    height: 500,
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

class Timetable extends Component {
  constructor() {
    super();
    const layout = this.generateLayout();
    this.state = {
      layout,
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
    return array;
  }

  generateDOM() {
    const { schoolClass, lectures } = this.props;
    const array = [];

    lectures && lectures.forEach(lecture => {
      if (lecture.course === schoolClass) {
        const index = lecture.period.day * 10 + lecture.period.slot;
        array.push(
          <div key={index}>
            <Course subject={lecture.subject} room={lecture.room} initials={lecture.teacher} />
          </div>,
        );
      }
    });

    return array;
  }

  render() {
    const { schoolClass, onClose } = this.props;

    return (
      <div style={styles.all}>
        <div style={styles.header}>
          <img
            style={styles.close}
            src={iconClose}
            onClick={() => onClose()}
            alt="closeTimetable"
          />
          <div style={styles.days}>
            <p style={styles.day}>Montag</p>
            <p style={styles.day}>Dienstag</p>
            <p style={styles.day}>Mittwoch</p>
            <p style={styles.day}>Donnerstag</p>
            <p style={styles.day}>Freitag</p>
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timetable);
