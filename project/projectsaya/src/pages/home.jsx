import React, { Component } from "react";
import Card from "./../components/card";
import Carousel from '../components/carousel'

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Carousel />
        <Card />
      </div>
    );
  }
}

export default Home;
