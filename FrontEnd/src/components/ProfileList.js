import React, {Component} from 'react';
import Link from './Link';
import iconUser from '../assets/iconUser.svg';
import * as Colors from '../constants/Colors';
import Course from "./Course";

const socket = new WebSocket('wss://stundenplaner.online');
socket.onopen = () => {
    socket.send('Konni connected!');
};

const styles = {};

class ProfileList extends Component {
    constructor() {
        super();
        this.state = {
            profiles: []
        };
    }

    componentDidMount() {
        fetch('https://stundenplaner.online/student?token=1234')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    profiles: responseJson,
                });
            })
    }

    renderProfileLink(profile) {
        return <li>
            <Link
                icon={iconUser}
                text={profile.profile.name}
                onClick={() => {
                    this.props.history.push({
                        pathname: '/details',
                        state: {
                            title: 'Profil',
                        },
                    });
                }}
            />
        </li>
    }

    renderProfileList(list){
        let linkList = [];
        for (let elem of list) {
            linkList.push(this.renderProfileLink(elem));
        }
        return linkList;
    }

    render() {
        const profiles = this.state.profiles;
        let listElements = this.renderProfileList(profiles);
        console.log(listElements);

        return (<div style={styles.container}>
            <ul>
                {listElements}
            </ul>
        </div>)
    }
}

export default ProfileList;