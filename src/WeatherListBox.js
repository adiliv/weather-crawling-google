import React, { Component } from 'react';
import SingleWeatherBox from './SingleWeatherBox';
import { CardDeck } from 'reactstrap';

import './SingleWeatherBox.css';

class WeatherListBoxes extends Component {

    renderWeather = () => {
        var arr = this.props.weatherBoxes;
        return arr.map((weather, index) => {
          return <SingleWeatherBox key={index} {...weather} />
        }
      );
    }

    render () {
        return(
          <div className="weather-list">
            <CardDeck>
              {this.renderWeather()}
            </CardDeck>
          </div>
        )
    }
}

export default WeatherListBoxes;
