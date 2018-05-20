import React, { Component } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Course from '../components/Course';
import * as Colors from '../constants/Colors';

const GridLayout = WidthProvider(RGL);

const styles = {
  container: {
    width: '100%',
    backgroundColor: Colors.lightGrey,
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
    };
  }

  generateLayout() {
    const array = [];
    for (let i = 0; i < items.length; i++) {
      array.push({
        x: Math.floor(i / 6),
        y: i % 6,
        w: 1,
        h: 1,
        i: items[i].id,
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
    console.log(this.state.layout);
    return (
      <GridLayout
        style={styles.container}
        layout={this.state.layout}
        cols={5}
        rowHeight={40}
        margin={[5, 5]}
        compactType={null}
        isResizable={false}
        preventCollision
      >
        {this.generateDOM()}
      </GridLayout>
    );
  }
}

export default Stundenplan;
