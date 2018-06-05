import React, {
    Component
} from 'react';
import * as Colors from '../constants/Colors';

const styles = {
    button: {
        minWidth: `100px`,
        alignSelf: 'center',
        padding: `8px 16px`,
        border: 0,
        borderRadius: 5,
        color: Colors.light,
        fontSize: 16,
        fontWeight: 500,
        boxShadow: [`0px 0px 2px rgba(0, 0, 0, 0.12)`, `0px 2px 2px rgba(0, 0, 0, 0.24)`],
        outline: 0,
    }
};

class Button extends Component {
    constructor() {
        super();
        this.state = {
            hover: false
        };
    }

    handleHover = () => {
        console.log('Button is hovered!!');
        this.setState({
            hover: !this.state.hover
        });
    };

    render() {
        const {style, text, color, hoverColor, onClick} = this.props; 
        const normalStyle = {
            backgroundColor: color,
            boxShadow: [`0px 0px 2px rgba(0, 0, 0, 0.12)`, `0px 2px 2px rgba(0, 0, 0, 0.24)`]
        };
        const hoverStyle = {
            backgroundColor: hoverColor,
            boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.24)`,
            transition: `0.3s slow-in`
        };
        let buttonStyle = this.state.hover ?
            hoverStyle :
            normalStyle;
        return (
          <button style = {
                { ...styles.button, ...style, ...buttonStyle }
            }
            type = "submit"
            onMouseEnter = {this.handleHover}
            onMouseLeave = {this.handleHover}
            onClick = {
                event => {
                    event.preventDefault();
                    onClick();
                }
            }> {text}
          </button>
        );
    }
}

export default Button;
