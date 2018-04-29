import React, { Component } from 'react';
import './App.css';
import Form from './Form.js'
import WeatherListBoxes from './WeatherListBox';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {cities: [], city_names_to_search_on_load: ["Tel aviv", "Jerusalem", "Madrid", "Liverpool"]}
  }

  submitWeather = (searched_city) => {
    let isNewCity = true;
    let cities = this.state.cities;
    console.log("all cities are:");
    console.log(this.state.cities);

    for (let city of cities) {
      if(searched_city.name === city.name) {
        isNewCity = false;
        break;
      }
    }

    if (isNewCity) {
      this.setState(prevState => ({
        cities: prevState.cities.concat(searched_city)
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
        <Form submitWeather={this.submitWeather} city_names_to_search_on_load={this.state.city_names_to_search_on_load} />
        <WeatherListBoxes cities={this.state.cities} />
      </div>
    );
  }
}

export default App;
