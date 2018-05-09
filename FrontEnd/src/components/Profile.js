import React, { Component } from 'react';
import InputField from './InputField';
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
    flex: 4,
    flexDirection: 'column',
  },
  person: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    margin: 10,
    backgroundColor: Colors.lightGrey,
  },
  contact: {
    display: 'flex',
    flex: 2,
    padding: 5,
    margin: 10,
    backgroundColor: Colors.lightGrey,
  },
  contactColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  subjects: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    margin: 10,
    backgroundColor: Colors.lightGrey,
  },
  side: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  notes: {
    width: 300,
    height: 200,
    padding: 5,
    backgroundColor: Colors.lightGrey,
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
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.info}>
          <div style={styles.data}>
            <div style={styles.person}>
              <p style={styles.title}>Persönliche Daten</p>
              <InputField type="text" label="Vorname" value="Max" />
              <InputField type="text" label="Nachname" value="Mustermann" />
              <InputField type="text" label="Kürzel" value="Mn" />
              <InputField type="text" label="Geschlecht" value="männlich" />
              <InputField type="text" label="Geburtsdatum" value="01.01.1960" />
              <InputField type="text" label="Nationalität" value="deutsch" />
            </div>
            <div style={styles.contact}>
              <p style={styles.title}>Kontaktdaten</p>
              <div style={styles.contactColumn}>
                <InputField
                  type="text"
                  label="Anschrift"
                  value="12037, Berlin, Superlange - Musterstraße, 1"
                />
                <InputField type="tel" label="Telefonnummer" value="+49 176 000 000 00" />
                <InputField type="email" label="E-Mail" value="mail@gmail.de" />
              </div>
              <div style={styles.contactColumn}>
                <InputField
                  type="text"
                  label="Kontaktperson"
                  value="Margarete Mustermann, Ehefrau"
                />
                <InputField type="tel" label="Telefonnummer" value="+49 176 000 000 00" />
                <InputField type="email" label="E-Mail" value="mail@gmail.de" />
              </div>
            </div>
            <div style={styles.subjects}>
              <p style={styles.title}>Unterrichtete Fächer</p>
              <InputField type="text" value="Mathematik" />
              <InputField type="text" value="Physik" />
              <InputField type="text" value="Informatik" />
            </div>
          </div>
          <div style={styles.side}>
            <img style={styles.avatar} src={Logo} alt="Avatar" />
            <p style={styles.title}>Notizen</p>
            <div style={styles.notes} />
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
