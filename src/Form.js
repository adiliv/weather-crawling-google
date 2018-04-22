import React, { Component } from 'react';
import { Button, Input, InputGroup } from 'reactstrap';

import './Form.css';
import axios from 'axios';
import cheerio from 'cheerio';

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { city: [], found: true }
    }

    changeCity = (e) => {
        this.setState({city: e.target.value });
    }

    handleSubmit = (event) => {
        this.setState({found: false, city: []});
        event.preventDefault();
        var url = `https://google.com/search?q=${this.state.city}+weather&hl=EN`;
        axios.get(url).then(html => {
          var $ = cheerio.load(html.data);
          var name = $("#wob_loc").text();
          var temp = $("#wob_tm").text() + "°C";
          var icon = $('#wob_tci').attr('src');
          var humid = $('#wob_hm').text();
          var wind = $('#wob_ws').text();
          var weather = {
            name: name,
            icon: icon,
            temp: temp,
            humid: humid,
            wind: wind
          };
          this.setState({found: true});
          this.props.submitWeather(weather);
        }).catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    }

    render() {
        if (this.state.found) {
          return (
              <div className="Form">
                  <form id="getWeatherForm" onSubmit={this.handleSubmit}>
                    <InputGroup>
                      <Input placeholder="Please enter location" required value={this.state.city} onChange={this.changeCity}/>
                      <Button color="danger">Search</Button>
                    </InputGroup>
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
