import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Autocomplete from 'react-google-autocomplete';

import './Form.css';
import axios from 'axios';
import cheerio from 'cheerio';

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleWeatherSubmit = this.handleWeatherSubmit.bind(this);
        this.state = { city: "", found: true }
    }

    componentDidMount() {
      this.loadInitialWeatherData();
    }

    changeCity = (e) => {
      this.setState({city: e.target.value });
    }

    loadInitialWeatherData = () => {
      for (let i = 0; i < this.props.city_names_to_search_on_load.length; i++) {
        let current_city = this.props.city_names_to_search_on_load[i];
        this.loadCityWeatherData(current_city);
      }
    }

    loadCityWeatherData = (city_name) => {
      this.setState({ found: false });
      const url = `https://google.com/search?q=${city_name}+weather&hl=EN`;
      axios.get(url).then(html => {
        var $ = cheerio.load(html.data);
        var name = $("#wob_loc").text();
        var temp = $("#wob_tm").text() + "°C";
        var icon = $('#wob_tci').attr('src');
        var humid = $('#wob_hm').text();
        var wind = $('#wob_ws').text();
        var city_weather = {
          name: name,
          icon: icon,
          temp: temp,
          humid: humid,
          wind: wind
        };
        this.setState({ found: true });
        this.props.submitWeather(city_weather);
      }).catch(error => {
          console.log('Error fetching and parsing data', error);
      });
    }

    handleWeatherSubmit = (event) => {
      event.preventDefault();
      this.loadCityWeatherData(this.state.city);
    }

    render() {
        if (this.state.found) {
          return (
              <div className="Form">
                <form id="getWeatherForm" onSubmit={this.handleWeatherSubmit}>
                  <Autocomplete placeholder="Please enter location" required
                  className="form-control input-with-button city-input" onChange={this.changeCity}
                  onPlaceSelected={(place) => {
                    this.setState({city: place.formatted_address});
                  }}
                  />
                  <Button className="input-with-button" color="danger">Search</Button>
                </form>
                <br/>
                <hr/>
              </div>
          );
        } else {
          return (
            <div>
              <div className="Loading">
                <img className="SpinnerImg" src="http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif" alt="spinner"></img>
              </div>
              <hr/>
            </div>
          );
        }
    }
}

export default Form;
