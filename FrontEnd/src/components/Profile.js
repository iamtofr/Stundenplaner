import React, { Component } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import * as Colors from '../constants/Colors';
import Logo from '../assets/logo.svg';

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
    padding: 5,
    margin: 20,
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
  },
  subjects: {
    display: 'flex',
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  notes: {
    display: 'flex',
    flex: 1,
    background: 0,
    border: 0,
    outline: 0,
    fontSize: 14,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 10,
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props,
    };
  }

  render() {
    const { profile } = this.props;
    profile.initials = `${profile.surname.substring(0, 1)}${profile.name.substring(0, 1)}`;
    const date = new Date(profile.dateOfBirth);
    profile.dateOfBirth = date.toLocaleDateString('de', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

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
                  value={profile.surname}
                  onChange={event =>
                    this.setState({
                      firstName: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Nachname"
                  value={profile.name}
                  onChange={event =>
                    this.setState({
                      lastName: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Kürzel"
                  value={profile.initials}
                  onChange={event =>
                    this.setState({
                      initials: event.target.value,
                    })
                  }
                />
                <TextInput
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
                  type="text"
                  label="Geburtsdatum"
                  value={profile.dateOfBirth}
                  onChange={event =>
                    this.setState({
                      dateOfBirth: event.target.value,
                    })
                  }
                />
                <TextInput
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
                    type="text"
                    label="Anschrift"
                    value={profile.address}
                    onChange={event =>
                      this.setState({
                        address: event.target.value,
                      })
                    }
                  />
                  <TextInput
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
                <div style={styles.contactColumn}>
                  <TextInput
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
                    type="tel"
                    label="Telefonnummer"
                    value={profile.contactPhone}
                    onChange={event =>
                      this.setState({
                        contactPhone: event.target.value,
                      })
                    }
                  />
                  <TextInput
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
              </div>
            </div>
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
          </div>
          <div style={styles.side}>
            <img style={styles.avatar} src={profile.photo || Logo} alt="Avatar" />
            <Button style={styles.button} text="Löschen" color={Colors.grey} />
            <div style={styles.infoBox}>
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
          <Button style={styles.button} text="Ausdrucken" color={Colors.grey} />
          <Button style={styles.button} text="Speichern" color={Colors.green} />
          <Button style={styles.button} text="Abbruch" color={Colors.red} />
        </div>
      </div>
    );
  }
}

export default Profile;
