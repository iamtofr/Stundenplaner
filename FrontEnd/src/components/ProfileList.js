import React, {Component} from 'react';
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
            profiles: [],
            hover: false,
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

    render(){
        const { profiles } = this.state;

    }
}
