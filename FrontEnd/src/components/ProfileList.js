import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as Colors from '../constants/Colors';
import iconUp from '../assets/iconUp.svg';
import iconDown from '../assets/iconDown.svg';

const styles = {
  table: {
    color: Colors.darkBlue,
    marginBottom: 20,
  },
  iconStyle: {
    margin: 8,
    verticalAlign: 'middle',
  },
  column: {
    padding: 8,
  },
};

class ProfileList extends Component {
  constructor() {
    super();

    this.state = {
      profiles: [],
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

  goToProfile(row) {
    this.props.history.push({
      pathname: '/details',
      state: {
        title: 'Profil',

        id: row.original.profile._id,
        occupation: this.occupation,
      },
    });
  }

  render() {
    const columns = [
      {
        id: 'profileName',
        Header: () => (
          <span>
            {' '}
            Vorname
            <img style={styles.iconStyle} src={iconUp} />
          </span>
        ),

        accessor: p => p.profile.name,
        Cell: row => <div onClick={() => this.goToProfile(row)}>{row.value}</div>,
      },
      {
        id: 'profileSurname',
        Header: () => (
          <span>
            {' '}
            Nachname
            <img style={styles.iconStyle} src={iconUp} />
          </span>
        ),

        accessor: p => p.profile.surname,
        Cell: row => (
          <div
            onClick={() => {
              this.props.history.push({
                pathname: '/details',
                state: {
                  title: 'Profil',

                  id: row.original.profile._id,
                  occupation: this.occupation,
                },
              });
            }}
          >
            {row.value}
          </div>
        ),
      },
    ];

    return (
      <div>
        <ReactTable
          style={styles.table}
          data={this.state.profiles}
          filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]).startsWith(filter.value)}
          defaultSorted={[
            {
              id: 'profileSurname',
              desc: false,
            },
          ]}
          columns={columns}
          getTheadThProps={() => {
            return {
              style: {
                fontSize: 18,
                padding: 8,
                boxShadow: 'none',
              },
            };
          }}
          getTrProps={() => {
            return {
              style: {
                //height: 32,
                //padding: 8,
              },
            };
          }}
          getTdProps={() => {
            return {
              style: {
                //height: 32,
                marginLeft: 8,
              },
            };
          }}
          onSortedChange={e => {
            console.log(e);
          }}
          className="-striped -highlight"
          previousText="Zurück"
          nextText="Vor"
          loadingText="Lade..."
          noDataText="Keine Ergenbnisse gefunden"
          pageText="Seite"
          ofText="von"
          rowsText="Zeilen"
        />
      </div>
    );
  }
}

export default withRouter(ProfileList);
