import React, {Component} from 'react';
import {withRouter}  from 'react-router-dom';
import {connect} from 'react-redux';
import {actions as appActions} from '../reducers/app';
import * as Colors from '../constants/Colors';
import { NavLink } from 'react-router-dom';


const styles = {
    navContent: {
        width: '100%',
        height: 'auto',
        position: 'relative',
        background: Colors.mediumBlue,

    },
    tabs: {
        position: 'relative',
        height: '50px',
        width: '100%',
        margin: '0 auto',
        padding: 0,
    },
    tab: {
        display: 'inline-block',
        lineHeight: '50px',
        height: '50px',
        width: 120,
        textAlign: 'center',
        margin: 0,

    },
    link: {
        textTransform: 'uppercase',
        fontWeight: '500',
        fontSize: '14px',
        color: Colors.white,
        textDecoration: 'none',

    },
    indicator: {
        left: 0,
        height: 2,
        width: 120,
        bottom: 0,
        background: Colors.yellow,
        position: 'absolute'
    }
};

class ProfilBar extends Component {
    constructor() {
        super();
        this.state = {
            indicatorPos: '0px',
        };
        //console.log(NavLink.location);
    }

    handleActiveLink = (e) => {
        let curpos = Math.floor(e.target.offsetLeft) + 'px';

        this.setState = {
            indicatorPos: curpos
        }
    };


    render() {
        const {style, indicatorPos, onClick} = this.props;
        const pos = {
            left:indicatorPos,
        };
        return (
            <nav>
                <div style={styles.navContent}>
                    <ul style={styles.tabs}>
                        <li style={styles.tab}>
                            <NavLink style={{...styles.link, ...pos}}

                                     activeStyle={{}}
                                     onClick = {
                                         event => {
                                             event.preventDefault();
                                             this.handleActiveLink(event);
                                             //let curEl = event.target;
                                             //console.log(curEl.offsetLeft);
                                         }
                                     }
                                     to="">Schuler</NavLink></li>
                        <li style={styles.tab}>
                            <NavLink style={styles.link}
                                     activeStyle={{color: 'red'}}
                               onClick = {
                                   event => {
                                       event.preventDefault();
                                       this.handleActiveLink(event);
                                       console.log(event.target.offsetLeft);
                                   }
                               }
                               to="/lehrer">Lehrer</NavLink></li>
                        <li style={styles.tab}>
                            <NavLink style={styles.link}
                                     activeStyle={{color: 'red'}}
                                     to="/raum">Raum</NavLink></li>
                        <li style={styles.tab}>
                            <NavLink style={styles.link}
                                     activeStyle={{color: 'red'}}
                                     to="/fach">Fach</NavLink></li>
                        <li style={styles.tab}>
                            <NavLink style={styles.link}
                                     activeStyle={{color: 'red'}}
                                     to="/account">Account</NavLink></li>
                        <li style={styles.indicator}></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default ProfilBar;
