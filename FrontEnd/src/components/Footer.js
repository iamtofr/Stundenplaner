import React, { Component } from 'react';
import * as Colors from '../constants/Colors';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 40,
    height: 40,
    padding: 5,
  },
  buttons: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    border: 0,
    outline: 0,
    background: 0,
    fontSize: 11,
  },

  text:{
    fontSize: 8,
    alignItems: 'center',
  },
  label: {
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: Colors.darkBlue,
  },
};

Modal.setAppElement('#root');

class Footer extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <div style={styles.buttons}>
          <button style={styles.button}onClick={this.openModal}>Impressum</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <p ref={subtitle => this.subtitle = subtitle}>Impressum</p>
          {/*<button onClick={this.closeModal}>close</button>*/}
          <div><p style={styles.text}>
            {"stundenplaner.online Privacy Policy\n" +
            "This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.\n" +
            "\n" +
            "What personal information do we collect from the people that visit our blog, website or app?\n" +
            "\n" +
            "We do not collect information from visitors of our site.\n" +
            "or other details to help you with your experience.\n" +
            "\n" +
            "When do we collect information?\n" +
            "\n" +
            "We collect information from you when you register on our site or enter information on our site.\n" +
            "\n" +
            "\n" +
            "How do we use your information?\n" +
            "\n" +
            "We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:\n" +
            "\n" +
            "\n" +
            "How do we protect your information?\n" +
            "\n" +
            "We do not use vulnerability scanning and/or scanning to PCI standards.\n" +
            "We only provide articles and information. We never ask for credit card numbers.\n" +
            "We do not use Malware Scanning.\n" +
            "\n" +
            "Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.\n" +
            "\n" +
            "We implement a variety of security measures when a user enters, submits, or accesses their information to maintain the safety of your personal information.\n" +
            "\n" +
            "All transactions are processed through a gateway provider and are not stored or processed on our servers.\n" +
            "\n" +
            "Do we use 'cookies'?\n" +
            "\n" +
            "We do not use cookies for tracking purposes\n" +
            "\n" +
            "You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.\n" +
            "\n" +
            "If you turn cookies off .\n" +
            "\n" +
            "Third-party disclosure\n" +
            "\n" +
            "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information.\n" +
            "\n" +
            "Third-party links\n" +
            "\n" +
            "We do not include or offer third-party products or services on our website.\n" +
            "\n" +
            "Google\n" +
            "\n" +
            "Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en \n" +
            "\n" +
            "We have not enabled Google AdSense on our site but we may do so in the future.\n" +
            "\n" +
            "California Online Privacy Protection Act\n" +
            "\n" +
            "CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared. - See more at: http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf\n" +
            "\n" +
            "According to CalOPPA, we agree to the following:\n" +
            "Users can visit our site anonymously.\n" +
            "Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website.\n" +
            "Our Privacy Policy link includes the word 'Privacy' and can easily be found on the page specified above.\n" +
            "\n" +
            "You will be notified of any Privacy Policy changes:\n" +
            "      • On our Privacy Policy Page\n" +
            "Can change your personal information:\n" +
            "      • By logging in to your account\n" +
            "\n" +
            "How does our site handle Do Not Track signals?\n" +
            "We honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place.\n" +
            "\n" +
            "Does our site allow third-party behavioral tracking?\n" +
            "It's also important to note that we do not allow third-party behavioral tracking\n" +
            "\n" +
            "COPPA (Children Online Privacy Protection Act)\n" +
            "\n" +
            "When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.\n" +
            "\n" +
            "We do not specifically market to children under the age of 13 years old.\n" +
            "\n" +
            "Fair Information Practices\n" +
            "\n" +
            "The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.\n" +
            "\n" +
            "In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:\n" +
            "We will notify you via email\n" +
            "      • Within 7 business days\n" +
            "We will notify the users via in-site notification\n" +
            "      • Within 7 business days\n" +
            "\n" +
            "We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.\n" +
            "\n" +
            "CAN SPAM Act\n" +
            "\n" +
            "The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.\n" +
            "\n" +
            "We collect your email address in order to:\n" +
            "\n" +
            "To be in accordance with CANSPAM, we agree to the following:\n" +
            "      • Not use false or misleading subjects or email addresses.\n" +
            "      • Identify the message as an advertisement in some reasonable way.\n" +
            "      • Include the physical address of our business or site headquarters.\n" +
            "      • Monitor third-party email marketing services for compliance, if one is used.\n" +
            "      • Honor opt-out/unsubscribe requests quickly.\n" +
            "      • Allow users to unsubscribe by using the link at the bottom of each email.\n" +
            "\n" +
            "If at any time you would like to unsubscribe from receiving future emails, you can email us at\n" +
            "      • Follow the instructions at the bottom of each email.\n" +
            "and we will promptly remove you from ALL correspondence.\n" +
            "\n" +
            "Contacting Us\n" +
            "\n" +
            "If there are any questions regarding this privacy policy, you may contact us using the information below.\n" +
            "\n" +
            "stundenplaner.online\n" +
            "Landsberger Allee 171C\n" +
            "Berlin, Berlin 10369\n" +
            "Germany\n" +
            "info@stundenplaner.online\n" +
            "\n" +
            "Last Edited on 2018-06-01"}</p></div>

        </Modal>
      </div>
    );
  }
}

export default Footer;
