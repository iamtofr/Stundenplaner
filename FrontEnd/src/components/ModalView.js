import React, { Component } from 'react';
import * as Colors from '../constants/Colors';
import ReactModal from 'react-modal';
import Button from './Button';

const styles = {
  modal: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.54)',
    },
    content: {
      position: 'absolute',
      width: 500,
      height: 300,
      margin: 'auto',
      border: '1px solid #ccc',
      background: Colors.light,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '2px',
      outline: 'none',
      padding: '20px',
      fontSize: 16,
      color: Colors.darkBlue,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '160px auto 10px',
  },
  button: {
    margin: '0 auto',
  },
};

ReactModal.setAppElement('#root');

class ModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.update = this.update.bind(this);
  }
  update = e => {
    console.log('show');
    this.props.handleCloseModal();
  };

  render() {
    const { isOpen, handleCloseModal, onSubmit } = this.props;

    return (
      <div>
        <ReactModal style={styles.modal} isOpen={isOpen} onRequestClose={handleCloseModal}>
          <h2>Warnung!</h2>
          <p>Sind Sie sicher, dass Sie einen neuen Stundenplan generieren wollen?</p>
          <div style={styles.buttons}>
            <Button
              style={styles.button}
              text="Bestätigen"
              color={Colors.green}
              hoverColor={Colors.lightGreen}
              onClick={() => onSubmit()}
            />
            <Button
              style={styles.button}
              text="Abbruch"
              color={Colors.red}
              hoverColor={Colors.lightRed}
              onClick={this.update}
            />
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default ModalView;
