import React, { Component } from 'react';
import Stundenplan from '../components/Stundenplan';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class DetailsPage extends Component {
  componentDidMount() {
    document.title = `StundenPlaner - ${this.props.location.state.title}`;
  }

  render() {
    const { title } = this.props.location.state;
    return <div style={styles.container}>{title === 'Stundenpläne' && <Stundenplan />}</div>;
  }
}

export default DetailsPage;
