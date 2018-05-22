import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
  },
};

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'StundenPlaner - Dashboard';
  }

  render() {
    return <div style={styles.container} />;
  }
}

export default Dashboard;
