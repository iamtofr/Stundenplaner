import React, { Component } from 'react';
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
  constructor() {
    super();
    this.state = {
      photo: 'https://robohash.org/eteaquequas.jpg?size=50x50&set=set1',
      firstName: 'Max',
      lastName: 'Mustermann',
      initials: 'Mn',
      sex: 'männlich',
      dateOfBirth: '01.01.1960',
      nationality: 'deutsch',
      address: '12037, Berlin, Superlange - Musterstraße, 1',
      phone: '+49 176 000 000 00',
      email: 'mail@gmail.de',
      contact: 'Margarete Mustermann, Ehefrau',
      contactPhone: '+49 176 000 000 00',
      contactEmail: 'mail@gmail.de',
      subject1: 'Mathematik',
      subject2: 'Physik',
      subject3: 'Informatik',
      subject4: 'WMathematik',
      notes:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    };
  }

  componentDidMount() {
    fetch(`https://api.stundenplaner.online/profile/${this.props.id}`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          photo: response.photo,
          firstName: response.name,
          lastName: response.surname,
          sex: response.sex,
          nationality: response.nationality,
          email: response.email,
          contact: response.contact,
          address: response.address,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      photo,
      firstName,
      lastName,
      initials,
      sex,
      dateOfBirth,
      nationality,
      address,
      phone,
      email,
      contact,
      contactPhone,
      contactEmail,
      subject1,
      subject2,
      subject3,
      subject4,
      notes,
    } = this.state;

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
                  value={firstName}
                  onChange={event =>
                    this.setState({
                      firstName: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Nachname"
                  value={lastName}
                  onChange={event =>
                    this.setState({
                      lastName: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Kürzel"
                  value={initials}
                  onChange={event =>
                    this.setState({
                      initials: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Geschlecht"
                  value={sex}
                  onChange={event =>
                    this.setState({
                      sex: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Geburtsdatum"
                  value={dateOfBirth}
                  onChange={event =>
                    this.setState({
                      dateOfBirth: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  label="Nationalität"
                  value={nationality}
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
                    value={address}
                    onChange={event =>
                      this.setState({
                        address: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="tel"
                    label="Telefonnummer"
                    value={phone}
                    onChange={event =>
                      this.setState({
                        phone: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="email"
                    label="E-Mail"
                    value={email}
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
                    value={contact}
                    onChange={event =>
                      this.setState({
                        contact: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="tel"
                    label="Telefonnummer"
                    value={contactPhone}
                    onChange={event =>
                      this.setState({
                        contactPhone: event.target.value,
                      })
                    }
                  />
                  <TextInput
                    type="email"
                    label="E-Mail"
                    value={contactEmail}
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
                  value={subject1}
                  onChange={event =>
                    this.setState({
                      subject1: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  value={subject2}
                  onChange={event =>
                    this.setState({
                      subject2: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  value={subject3}
                  onChange={event =>
                    this.setState({
                      subject3: event.target.value,
                    })
                  }
                />
                <TextInput
                  type="text"
                  value={subject4}
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
            <img style={styles.avatar} src={photo} alt="Avatar" />
            <Button style={styles.button} text="Löschen" color={Colors.grey} />
            <div style={styles.infoBox}>
              <p style={styles.title}>Notizen</p>
              <textarea
                style={styles.notes}
                value={notes}
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
