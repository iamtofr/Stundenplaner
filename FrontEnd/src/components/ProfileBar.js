import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Colors from '../constants/Colors';
import NavButton from '../components/NavButton';

const styles = {
  navContent: {
    display: 'flex',
    width: '100%',
    height: 50,
    position: 'relative',
    marginBottom: 10,
    background: Colors.mediumBlue,
    boxShadow: [`0px 0px 2px rgba(0, 0, 0, 0.12)`, `0px 2px 2px rgba(0, 0, 0, 0.24)`],
  },
  tabs: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
};

class ProfileBar extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: true,
    };
  }

  render() {
    const { activeTab } = this.props;
    return (
      <nav>
        <div style={styles.navContent}>
          <NavButton
            text="Stundenpläne"
            isActive={activeTab === 'Stundenplan'}
            onClick={() => {
              this.props.history.push({
                pathname: '/details',
                state: {
                  title: 'Stundenplan',
                },
              });
            }}
          />
          <NavButton
            text="Schüler"
            isActive={activeTab === 'Schülerliste'}
            onClick={() => {
              this.props.history.push({
                pathname: '/details',
                state: {
                  title: 'Schülerliste',
                },
              });
            }}
          />
          <NavButton
            text="Lehrer"
            isActive={activeTab === 'Lehrerliste'}
            onClick={() => {
              this.props.history.push({
                pathname: '/details',
                state: {
                  title: 'Lehrerliste',
                },
              });
            }}
          />
          <NavButton
            text="Räume"
            onClick={() => {
              this.props.history.push({
                pathname: '/details',
                state: {
                  title: 'Räume',
                },
              });
            }}
          />
          <NavButton
            text="Fächer"
            onClick={() => {
              this.props.history.push({
                pathname: '/details',
                state: {
                  title: 'Fächer',
                },
              });
            }}
          />
          <NavButton
            text="Accounts"
            onClick={() => {
              this.props.history.push({
                pathname: '/details',
                state: {
                  title: 'Accounts',
                },
              });
            }}
          />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  activeTab: state.app.activeTab,
});

export default withRouter(connect(mapStateToProps)(ProfileBar));
