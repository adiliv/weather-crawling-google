import React, { Component } from 'react';
import './App.css';
import Form from './Form.js'
import WeatherListBoxes from './WeatherListBox';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {weatherBoxes:[
      {name: "Tel Aviv",
      temp: "27°C",
      humid: "41%",
      wind: "25km/h",
      icon: "//s1.twnmm.com/images/en_us/icons/wxicons_large/4.png"},

      {name: "Jerusalem",
      temp: "25°C",
      humid: "23%",
      wind: "35km/h",
      icon: "//s1.twnmm.com/images/en_us/icons/wxicons_large/4.png"}
    ]}
  }

  submitWeather = (data) => {
    var isNewCity = true;
    var arr = this.state.weatherBoxes;

    for (var post of arr) {
      if(data.name === post.name) {
        isNewCity = false;
        break;
      }
    }

    if (isNewCity) {
      this.setState(prevState => ({
        weatherBoxes: prevState.weatherBoxes.concat(data)
      }));
    } else {
      alert("city already in list");
    }
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title"> Weather crawling app </h1>
        <hr />
        <Form submitWeather={this.submitWeather} />
        <WeatherListBoxes weatherBoxes={this.state.weatherBoxes} />
      </div>
    );
  }
}

export default App;
