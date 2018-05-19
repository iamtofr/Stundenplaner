import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { actions as appActions } from '../reducers/app';
import Widget from '../components/Widget';
import Link from '../components/Link';
import * as Colors from '../constants/Colors';
import iconList from '../assets/iconList.svg';
import iconCreate from '../assets/iconCreate.svg';
import iconEdit from '../assets/iconEdit.svg';
import iconAdd from '../assets/iconAdd.svg';

const styles = {
  container: {
    width: 1000,
  },
  link: {
    marginBottom: 10,
    color: Colors.darkBlue,
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
      <GridLayout style={styles.container} width={1200} cols={3} rowHeight={20} margin={[10, 10]}>
        <div key="Stundenpläne" data-grid={{ x: 0, y: 0, w: 1, h: 6 }}>
          <Widget style={styles.widget} text="Stundenpläne">
            <Link
              icon={iconList}
              text="Stundenplanliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Stundenpläne',
                  },
                });
              }}
            />
            <Link
              icon={iconCreate}
              text="Stundenplan erstellen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Stundenpläne',
                  },
                });
              }}
            />
            <Link
              icon={iconEdit}
              text="Stundenplan bearbeiten"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Stundenpläne',
                  },
                });
              }}
            />
          </Widget>
        </div>
        <div key="Klassen" data-grid={{ x: 0, y: 0, w: 1, h: 5 }}>
          <Widget style={styles.widget} text="Klassen">
            <Link
              icon={iconList}
              text="Klassenliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Klassen',
                  },
                });
              }}
            />
            <Link
              icon={iconCreate}
              text="Klasse erstellen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Klassen',
                  },
                });
              }}
            />
          </Widget>
        </div>
        <div key="Fächer" data-grid={{ x: 0, y: 0, w: 1, h: 5 }}>
          <Widget style={styles.widget} text="Fächer">
            <Link
              icon={iconList}
              text="Fächerliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Fächer',
                  },
                });
              }}
            />
            <Link
              icon={iconCreate}
              text="Fach erstellen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Fächer',
                  },
                });
              }}
            />
          </Widget>
        </div>
        <div key="Accounts" data-grid={{ x: 0, y: 0, w: 1, h: 6 }}>
          <Widget style={styles.widget} text="Accounts">
            <Link
              icon={iconList}
              text="Accountliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Accounts',
                  },
                });
              }}
            />
            <Link
              icon={iconAdd}
              text="Account erstellen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Accounts',
                  },
                });
              }}
            />
            <Link
              icon={iconAdd}
              text="Ausloggen"
              onClick={() => {
                this.props.logout();
                this.props.history.push('/');
              }}
            />
          </Widget>
        </div>
        <div key="Schüler" data-grid={{ x: 1, y: 0, w: 1, h: 7 }}>
          <Widget style={styles.widget} text="Schüler">
            <Link
              icon={iconList}
              text="Schülerliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Schüler',
                  },
                });
              }}
            />
            <Link
              icon={iconAdd}
              text="Schüler erstellen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Schüler',
                  },
                });
              }}
            />
          </Widget>
        </div>
        <div key="Lehrer" data-grid={{ x: 1, y: 0, w: 1, h: 7 }}>
          <Widget style={styles.widget} text="Lehrer">
            <Link
              icon={iconList}
              text="Lehrerliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Lehrer',
                  },
                });
              }}
            />
            <Link
              icon={iconAdd}
              text="Lehrer erstellen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Lehrer',
                  },
                });
              }}
            />
          </Widget>
        </div>
        <div key="Räume" data-grid={{ x: 1, y: 0, w: 1, h: 7 }}>
          <Widget style={styles.widget} text="Räume">
            <Link
              icon={iconList}
              text="Raumliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Räume',
                  },
                });
              }}
            />
            <Link
              icon={iconCreate}
              text="Raum erstellen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Räume',
                  },
                });
              }}
            />
          </Widget>
        </div>
        <div key="Kalender" data-grid={{ x: 2, y: 0, w: 1, h: 15 }}>
          <Widget style={styles.widget} text="Kalender" />
        </div>
        <div key="Wetter" data-grid={{ x: 2, y: 2, w: 1, h: 6 }}>
          <Widget style={styles.widget} text="Wetter" />
        </div>
      </GridLayout>
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
