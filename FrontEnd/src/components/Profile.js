import React, { Component } from 'react';
import Avatar from './Avatar';
import TextInput from './TextInput';
import Button from './Button';
import * as Colors from '../constants/Colors';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  info: {
    display: 'flex',
  },
  data: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoBox: {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'column',
    paddingBottom: 4,
    margin: '10px 20px',
    backgroundColor: Colors.boxGrey,
    borderRadius: 2,
    boxShadow: [
      '0 3px 1px -2px rgba(0,0,0,.2)',
      '0 2px 2px 0 rgba(0,0,0,.14)',
      '0 1px 5px 0 rgba(0,0,0,.12)',
    ],
  },
  person: {
    display: 'flex',
  },
  contact: {
    display: 'flex',
  },
  contactColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
  },
  subjects: {
    display: 'flex',
  },
  infoBoxNotes: {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'column',
    margin: '50px 20px 10px 0px',
    backgroundColor: Colors.boxGrey,
    borderRadius: 2,
    boxShadow: [
      '0 3px 1px -2px rgba(0,0,0,.2)',
      '0 2px 2px 0 rgba(0,0,0,.14)',
      '0 1px 5px 0 rgba(0,0,0,.12)',
    ],
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
    textTransform: 'uppercase',
    margin: '16px 10px 6px 10px',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
  },
  notes: {
    display: 'flex',
    flex: 1,
    margin: 10,
    background: Colors.light,
    outline: 0,
    fontSize: 14,
    borderRadius: 2,
    border: `1px solid ${Colors.lineGrey}`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 10,
  },
  inputWidthLarge: {
    width: '388px',
  },
  inputWidthSmall: {
    width: '142px',
  },
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    this.occupation = this.props.occupation;

    fetch('https://stundenplaner.online/profile/' + this.props.id + '?token=1234')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          profile: responseJson,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          passwordError: 'Benutzername oder Passwort falsch.',
        });
      });
  }

  printDiv = divName => {
    let printContents = document.getElementById(divName).parentNode.innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  render() {
    const { profile } = this.state;
    if (profile.id) {
      profile.initials = `${profile.surname.substring(0, 1)}${profile.name.substring(0, 1)}`;
      const date = new Date(profile.dateOfBirth);
      profile.dateOfBirth = date.toLocaleDateString('de', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return (
      <div style={styles.container}>
        <div style={styles.info}>
          <div style={styles.data}>
            <div style={styles.infoBox}>
              <p style={styles.title}>Persönliche Daten</p>
              <div style={styles.person}>
                <TextInput
                  type="text"
                  label="Vorname"
                  value={profile.name}
                  onChange={event =>
                    this.setState({
                      firstName: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Nachname"
                  value={profile.surname}
                  onChange={event =>
                    this.setState({
                      lastName: event.target.value,
                    })
                  }
                />
                {this.occupation === 'teacher' && (
                  <TextInput
                    width={styles.inputWidthSmall}
                    type="text"
                    label="Kürzel"
                    value={profile.initials}
                    onChange={event =>
                      this.setState({
                        initials: event.target.value,
                      })
                    }
                  />
                )}
                <TextInput
                  width={styles.inputWidthSmall}
                  type="text"
                  label="Geschlecht"
                  value={profile.sex}
                  onChange={event =>
                    this.setState({
                      sex: event.target.value,
                    })
                  }
                />
                <TextInput
                  width={styles.inputWidthSmall}
                  type="text"
                  label="Geburtsdatum"
                  value={this.renderDateOfBirth(profile.dateOfBirth)}
                  onChange={event =>
                    this.setState({
                      dateOfBirth: event.target.value,
                    })
                  }
                />
                <TextInput
                  width={styles.inputWidthSmall}
                  type="text"
                  label="Nationalität"
                  value={profile.nationality}
                  onChange={event =>
                    this.setState({
                      nationality: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div style={styles.infoBox}>
              <p style={styles.title}>Kontaktdaten</p>
              <div style={styles.contact}>
                <div style={styles.contactColumn}>
                  <TextInput
                    width={styles.inputWidthLarge}
                    type="text"
                    label="Anschrift"
                    value={
                      profile.address
                        ? profile.address.street +
                          ' ' +
                          profile.address.number +
                          ' ' +
                          profile.address.zipCode +
                          ' ' +
                          profile.address.city
                        : ''
                    }
                    onChange={event =>
                      this.setState({
                        address: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    width={styles.inputWidthLarge}
                    type="tel"
                    label="Telefonnummer"
                    value={profile.phoneNumber}
                    onChange={event =>
                      this.setState({
                        phone: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    width={styles.inputWidthLarge}
                    type="email"
                    label="E-Mail"
                    value={profile.email}
                    onChange={event =>
                      this.setState({
                        email: event.target.value,
                      })
                    }
                  />
                </div>
                {this.occupation === 'student' && (
                  <div style={styles.contactColumn}>
                    <TextInput
                      width={styles.inputWidthLarge}
                      type="text"
                      label="Kontaktperson"
                      value={profile.contact}
                      onChange={event =>
                        this.setState({
                          contact: event.target.value,
                        })
                      }
                    />
                    <TextInput
                      width={styles.inputWidthLarge}
                      type="tel"
                      label="Telefonnummer"
                      value={profile.contactPhoneNumber}
                      onChange={event =>
                        this.setState({
                          contactPhone: event.target.value,
                        })
                      }
                    />
                    <TextInput
                      width={styles.inputWidthLarge}
                      type="email"
                      label="E-Mail"
                      value={profile.contactEmail}
                      onChange={event =>
                        this.setState({
                          contactEmail: event.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            {this.occupation === 'teacher' && (
              <div style={styles.infoBox}>
                <p style={styles.title}>Unterrichtete Fächer</p>
                <div style={styles.subjects}>
                  <TextInput
                    type="text"
                    value={profile.subject}
                    onChange={event =>
                      this.setState({
                        subject1: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="text"
                    value={profile.subject}
                    onChange={event =>
                      this.setState({
                        subject2: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="text"
                    value={profile.subject}
                    onChange={event =>
                      this.setState({
                        subject3: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="text"
                    value={profile.subject}
                    onChange={event =>
                      this.setState({
                        subject4: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
            {this.occupation === 'student' && (
              <div style={styles.infoBox}>
                <p style={styles.title}>Schulische Daten</p>
                <div style={styles.subjects}>
                  <TextInput
                    width={styles.inputWidthSmall}
                    type="text"
                    label="Klasse"
                    value="5A"
                    onChange={event =>
                      this.setState({
                        subject1: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="text"
                    label="Vertiefungsrichtung"
                    value={profile.subject}
                    onChange={event =>
                      this.setState({
                        subject2: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div style={styles.side}>
            <Avatar photo={profile.photo} />
            <div style={styles.infoBoxNotes}>
              <p style={styles.title}>Notizen</p>
              <textarea
                style={styles.notes}
                value={profile.notes}
                onChange={event =>
                  this.setState({
                    notes: event.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div style={styles.buttons}>
          <Button
            style={styles.button}
            text="Profil löschen"
            color={Colors.blue}
            hoverColor={Colors.lightBlue}
            onClick={() => {
              console.log('Print schedule');
              this.printDiv('avatar');
            }}
          />
          <Button
            style={styles.button}
            text="Speichern"
            color={Colors.green}
            hoverColor={Colors.lightGreen}
          />
          <Button
            style={styles.button}
            text="Abbruch"
            color={Colors.red}
            hoverColor={Colors.lightRed}
          />
        </div>
      </div>
    );
  }

  renderDateOfBirth(dateOfBirth) {
    let date = new Date(dateOfBirth);
    let month = date.getMonth() + 1;
    return date.getDate().toString() + '.' + month.toString() + '.' + date.getFullYear().toString();
  }
}

export default Profile;
