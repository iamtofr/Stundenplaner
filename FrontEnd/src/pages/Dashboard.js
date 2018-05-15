import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as appActions } from '../reducers/app';
import Widget from '../components/Widget';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: Colors.light,
  },
  widget: {
    margin: 10,
  },
};

class Dashboard extends Component {
  componentDidMount() {
    document.title = 'StundenPlaner - Dashboard';
  }

  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/');
      return null;
    }

    return (
      <div style={styles.container}>
        <Widget
          style={styles.widget}
          text="Accounts verwalten"
          color={Colors.grey}
          onClick={() => {
            this.props.logout();
            this.props.history.push('/');
          }}
        />
        <Widget style={styles.widget} text="Stundenpläne verwalten" color={Colors.grey} />
        <Widget style={styles.widget} text="Klassen verwalten" color={Colors.grey} />
        <Widget style={styles.widget} text="Lehrer verwalten" color={Colors.grey} />
        <Widget style={styles.widget} text="Schüler verwalten" color={Colors.grey} />
        <Widget style={styles.widget} text="Räume verwalten" color={Colors.grey} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.app.token,
  profile: state.app.profile,
  isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = {
  logout: appActions.logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
