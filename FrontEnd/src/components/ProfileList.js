import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
        Header: 'Vorname',
        accessor: p => p.profile.name,
        Cell: row => <div onClick={() => this.goToProfile(row)}>{row.value}</div>,
      },
      {
        id: 'profileSurname',
        Header: 'Nachname',
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
