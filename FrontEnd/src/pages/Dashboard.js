import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {actions as appActions} from '../reducers/app';
import Widget from '../components/Widget';
import * as Colors from '../constants/Colors';
import Accounts from '../assets/Accounts.svg';
import Timetable from '../assets/Timetable.svg';
import Class from '../assets/Class.svg';
import Teacher from '../assets/TeacherProfile.svg';
import Student from '../assets/StudentList.svg';
import Room from '../assets/Room.svg';

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
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
                    image={Accounts}
                    text="Accounts verwalten"
                    color={Colors.grey}
                    onClick={() => {
                        this.props.logout();
                        this.props.history.push('/');
                    }}
                />
                <Widget
                    style={styles.widget}
                    image={Timetable}
                    text="Stundenpläne verwalten"
                    color={Colors.grey}
                    onClick={() => {
                        this.props.history.push({
                            pathname: '/details',
                            state: {
                                title: 'Stundenplan'
                            }
                        });
                    }}
                />
                <Widget style={styles.widget} image={Class} text="Klassen verwalten" color={Colors.grey}
                        onClick={() => {
                            this.props.history.push({
                                pathname: '/details',
                                state: {
                                    title: 'Klassen'
                                }
                            });
                        }}/>
                <Widget style={styles.widget} image={Teacher} text="Lehrer verwalten" color={Colors.grey}
                        onClick={() => {
                            this.props.history.push({
                                pathname: '/details',
                                state: {
                                    title: 'Lehrer'
                                }
                            });
                        }}/>
                <Widget
                    style={styles.widget}
                    image={Student}
                    text="Schüler verwalten"
                    color={Colors.grey}
                    onClick={() => {
                        this.props.history.push({
                            pathname: '/details',
                            state: {
                                title: 'Schüler'
                            }
                        });
                    }}
                />
                <Widget style={styles.widget} image={Room} text="Räume verwalten" color={Colors.grey}
                        onClick={() => {
                            this.props.history.push({
                                pathname: '/details',
                                state: {
                                    title: 'Räume'
                                }
                            });
                        }}/>
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
