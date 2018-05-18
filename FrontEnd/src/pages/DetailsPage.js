import React, {Component} from 'react';
import Stundenplan from '../components/Stundenplan';


const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

class DetailsPage extends Component {

    componentDidMount() {
        document.title = `StundenPlaner - ${this.props.location.state.title}`
    }

    render() {
        const {title} = this.props.location.state;
        return (
            <div style={styles.container}>
                {title === 'Stundenplan' && <Stundenplan/>}
            </div>
        );
    }
}

export default DetailsPage;
