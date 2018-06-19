import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileBar from '../components/ProfileBar';
import Stundenplan from '../components/Stundenplan';
import Profile from '../components/Profile';
import Liste from '../components/ProfileList';

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
    const id = this.props.location.state.id;
    const occupation = this.props.location.state.occupation;
    document.title = `StundenPlaner - ${title}`;

    return (
      <div style={styles.container}>
        <ProfileBar />
        {title === 'Stundenplan' && <Stundenplan />}
        {title === 'Profil' && <Profile id={id} occupation={occupation} />}
        {title === 'Profilliste' && <Liste occupation={occupation} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(DetailsPage));
