import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Stundenplan from '../components/Stundenplan';
import Profile from '../components/Profile';

const styles = {
  container: {
    width: '100%',
  },
};

class DetailsPage extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/');
      return null;
    }

    const title = this.props.location.state.title;
    document.title = `StundenPlaner - ${title}`;

    return (
      <div style={styles.container}>
        {title === 'Stundenplan' && <Stundenplan />}
        {title === 'Profil' && <Profile />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(DetailsPage));
