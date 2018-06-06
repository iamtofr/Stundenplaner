import React, {Component} from 'react';
import { withRouter } from 'react-router';
import Link from './Link';
import iconUser from '../assets/iconUser.svg';
import * as Colors from '../constants/Colors';
import Course from "./Course";



const styles = {};

class ProfileList extends Component {
    constructor() {
        super();

        this.state = {
            profiles: []
        };
    }

    componentDidMount() {
        this.occupation = this.props.occupation;
        fetch('https://stundenplaner.online/' + this.occupation + '?token=1234')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    profiles: responseJson,
                });
            });

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

                            id: profile.profile._id,
                            occupation: this.occupation
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

export default withRouter(ProfileList);