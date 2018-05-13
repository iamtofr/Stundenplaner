import React, { Component } from 'react';
import * as Colors from '../constants/Colors';
import Profile from '../components/Profile';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light,
  },
};

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'StundenPlaner - Dashboard';
  }

  render() {
    return (
      <div style={styles.container}>
        <Profile id="5af5cf0420c6f43d9b506f03" />
      </div>
    );
  }
}

export default Dashboard;
