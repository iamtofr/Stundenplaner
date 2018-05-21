import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Stundenplan from '../components/Stundenplan';
import Profile from '../components/Profile';

const styles = {
  container: {
    width: '100%',
  },
};

class DetailsPage extends Component {
  componentDidMount() {
    document.title = `StundenPlaner - ${this.props.location.state.title}`;
  }

  render() {
    const title = this.props.location.state.title;
    console.log(title);

    return (
      <div style={styles.container}>
        {title === 'Stundenplan' && <Stundenplan />}
        {title === 'Profil' && <Profile />}
      </div>
    );
  }
}

export default withRouter(DetailsPage);
