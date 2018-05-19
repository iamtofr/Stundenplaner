import React, { Component } from 'react';
import Stundenplan from '../components/Stundenplan';

const styles = {
  container: {
    //height: '100vh',
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
    return (
      <div style={styles.container}>
        {title === 'Accounts' && <Stundenplan />}
        {title === 'Stundenplan' && <Stundenplan />}
        {title === 'Klassen' && <Stundenplan />}
        {title === 'Lehrer' && <Stundenplan />}
        {title === 'Schüler' && <Stundenplan />}
      </div>
    );
  }
}

export default DetailsPage;
