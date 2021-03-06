import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RGL, { WidthProvider } from 'react-grid-layout';
import Calendar from 'react-calendar';
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';
import calendarStyles from '../styles/calendar.css';
import { actions as appActions } from '../reducers/app';
import Widget from '../components/Widget';
import ModalView from '../components/ModalView';
import Link from '../components/Link';
import WeatherWidget from '../components/WeatherWidget';
import iconList from '../assets/iconList.svg';
import iconCreate from '../assets/iconCreate.svg';
import iconEdit from '../assets/iconEdit.svg';
import iconAdd from '../assets/iconAdd.svg';
import iconRemove from '../assets/iconRemove.svg';

const GridLayout = WidthProvider(RGL);

const styles = {
  container: {
    width: '100%',
  },
  link: {
    marginBottom: 10,
  },
  calender: {
    height: 300,
  },
  weather: {
    height: 300,
  },
};

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      stundenplan: 'Stundenplan',
      klasse: 'Klasse',
      fach: 'Fach',
      account: 'Account',
      schuler: 'Schuler',
      lehrer: 'Lehrer',
      raum: 'Raum',
      kalender: 'Calender',
      wetter: 'Wetter',
      einstellungen: 'Einstellungen',
      show: false,
      date: new Date(),
    };
  }

  componentDidMount() {
    document.title = 'StundenPlaner - Dashboard';
  }

  showModal = e => {
    console.log('calling modal');
    this.setState({ show: true });
  };

  hideModal = e => {
    console.log('closing modal');
    this.setState({ show: false });
  };

  onChange = date => this.setState({ date });

  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/');
      return null;
    }

    return (
      <GridLayout
        style={styles.container}
        cols={3}
        rowHeight={20}
        margin={[20, 20]}
        containerPadding={[10, 10]}
      >
        <div key={this.state.stundenplan} data-grid={{ x: 0, y: 0, w: 1, h: 6 }}>
          <Widget
            style={styles.widget}
            onClose={() => this.setState({ stundenplan: '' })}
            text="Stundenpläne"
          >
            <Link
              icon={iconList}
              text="Stundenplan anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Stundenplan',
                  },
                });
              }}
            />
            <Link
              icon={iconCreate}
              text="Stundenplan erstellen"
              onClick={() => {
                this.showModal();
              }}
            />
            <ModalView
              isOpen={this.state.show}
              handleOpenModal={() => this.showModal()}
              handleCloseModal={() => this.hideModal()}
              onSubmit={() => {
                this.props.showLoader();
                const socket = new WebSocket('wss://stundenplaner.online');
                socket.onopen = () => {
                  socket.send('Go');
                };
                socket.onmessage = msg => {
                  this.props.hideLoader();
                  console.log('received Data from Websocket: ');
                  console.log(JSON.parse(msg.data));
                  this.props.setLectures({
                    lectures: JSON.parse(msg.data),
                  });
                };
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Stundenplan',
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
                    title: 'Stundenplan',
                  },
                });
              }}
            />
          </Widget>
        </div>
        <div key={this.state.klasse} data-grid={{ x: 0, y: 0, w: 1, h: 5 }}>
          <Widget
            style={styles.widget}
            onClose={() => this.setState({ klasse: '' })}
            text="Klassen"
          >
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
        <div key={this.state.fach} data-grid={{ x: 0, y: 0, w: 1, h: 5 }}>
          <Widget style={styles.widget} onClose={() => this.setState({ fach: '' })} text="Fächer">
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
        <div key={this.state.account} data-grid={{ x: 0, y: 0, w: 1, h: 5 }}>
          <Widget
            style={styles.widget}
            onClose={() => this.setState({ account: '' })}
            text="Accounts"
          >
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
          </Widget>
        </div>
        <div key={this.state.schuler} data-grid={{ x: 1, y: 0, w: 1, h: 7 }}>
          <Widget
            style={styles.widget}
            onClose={() => this.setState({ schuler: '' })}
            text="Schüler"
          >
            <Link
              icon={iconList}
              text="Schülerliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Schülerliste',
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
        <div key={this.state.lehrer} data-grid={{ x: 1, y: 0, w: 1, h: 7 }}>
          <Widget style={styles.widget} onClose={() => this.setState({ lehrer: '' })} text="Lehrer">
            <Link
              icon={iconList}
              text="Lehrerliste anzeigen"
              onClick={() => {
                this.props.history.push({
                  pathname: '/details',
                  state: {
                    title: 'Lehrerliste',
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
        <div key={this.state.raum} data-grid={{ x: 1, y: 0, w: 1, h: 7 }}>
          <Widget style={styles.widget} onClose={() => this.setState({ raum: '' })} text="Räume">
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
        <div key={this.state.kalender} data-grid={{ x: 2, y: 0, w: 1, h: 11 }}>
          <Widget
            style={styles.widget}
            onClose={() => this.setState({ kalender: '' })}
            text="Kalender"
          >
            <Calendar className="calendar" onChange={this.onChange} value={this.state.date} />
          </Widget>
        </div>
        <div key={this.state.wetter} data-grid={{ x: 2, y: 2, w: 1, h: 8 }}>
          <Widget style={styles.widget} onClose={() => this.setState({ wetter: '' })} text="Wetter">
            <WeatherWidget />
          </Widget>
        </div>
        <div key={this.state.einstellungen} data-grid={{ x: 2, y: 2, w: 1, h: 8 }}>
          <Widget style={styles.widget} text="Einstellungen">
            <Link
              icon={this.state.stundenplan ? iconRemove : iconCreate}
              text="Stundenplan Widget"
              onClick={() => {
                this.state.stundenplan
                  ? this.setState({ stundenplan: '' })
                  : this.setState({ stundenplan: 'Account' });
              }}
            />
            <Link
              icon={this.state.schuler ? iconRemove : iconCreate}
              text="Schüler Widget"
              onClick={() => {
                this.state.schuler
                  ? this.setState({ schuler: '' })
                  : this.setState({ schuler: 'Account' });
              }}
            />
            <Link
              icon={this.state.fach ? iconRemove : iconCreate}
              text="Fächer Widget"
              onClick={() => {
                this.state.fach ? this.setState({ fach: '' }) : this.setState({ fach: 'Account' });
              }}
            />
            <Link
              icon={this.state.raum ? iconRemove : iconCreate}
              text="Räume Widget"
              onClick={() => {
                this.state.raum ? this.setState({ raum: '' }) : this.setState({ raum: 'Account' });
              }}
            />
            <Link
              icon={this.state.lehrer ? iconRemove : iconCreate}
              text="Lehrer Widget"
              onClick={() => {
                this.state.lehrer
                  ? this.setState({ lehrer: '' })
                  : this.setState({ lehrer: 'Account' });
              }}
            />
            <Link
              icon={this.state.account ? iconRemove : iconCreate}
              text="Accounts Widget"
              onClick={() => {
                this.state.account
                  ? this.setState({ account: '' })
                  : this.setState({ account: 'Account' });
              }}
            />
          </Widget>
        </div>
      </GridLayout>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = {
  setLectures: appActions.setLectures,
  showLoader: appActions.showLoader,
  hideLoader: appActions.hideLoader,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Dashboard),
);
