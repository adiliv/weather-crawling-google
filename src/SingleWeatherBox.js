import React, { Component } from 'react';
import { Col, Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap';

class SingleWeatherBox extends Component {
    render() {
        return (
            <Col sm="6" md="4" lg="3">
              <Card className="weather-box">
                <CardBody>
                  <CardTitle>{this.props.name}</CardTitle>
                  <CardImg top width="100%" src={this.props.icon} alt="Weather icon" />
                  <CardSubtitle>Temperature: {this.props.temp}</CardSubtitle>
                  <CardText>Humidity: {this.props.humid}, Wind Speed: {this.props.wind}</CardText>
                </CardBody>
              </Card>
            </Col>
        );
    }
}

export default SingleWeatherBox;
