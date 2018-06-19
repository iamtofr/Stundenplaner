import React, { Component } from 'react';
import * as Colors from '../constants/Colors';

class WeatherWidget extends Component {
  renderWeatherWidget(d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://weatherwidget.io/js/widget.min.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }

  render() {
    this.renderWeatherWidget(document, 'script', 'weatherwidget-io-js');
    return (
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/de/52d5213d40/berlin/"
        data-label_1="BERLIN"
        data-label_2="WETTER"
        data-font="Roboto"
        data-icons="Climacons Animated"
        data-theme="original"
        data-lowcolor={Colors.blue}
        data-suncolor={Colors.yellow}
        data-raincolor={Colors.blue}
      >
        BERLIN WETTER
      </a>
    );
  }
}

export default WeatherWidget;
