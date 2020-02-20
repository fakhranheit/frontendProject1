import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { MDBCardBody, MDBBadge, MDBIcon } from "mdbreact";
import { Zoom } from 'react-reveal'

class Slider extends Component {
  render() {
    return (
      <Zoom>
        <div className="border-carousel ">
          <MDBCardBody className="on-demand text-align-center">
            <MDBBadge color="dark">
              <MDBIcon icon="gamepad" />
            </MDBBadge>
            On Demand & recommended
        </MDBCardBody>
          <Carousel className="carousel">
            <div>
              <img src="https://images5.alphacoders.com/901/901108.png" alt="" />
              <p className="legend">Open World | Action | Role-playing</p>
            </div>
            <div>
              <img src="https://www.vortez.net/news_file/17727_age-of-empires-4-trailer.jpg" alt="" />
              <p className="legend">Real-time Strategy | Medieval</p>
            </div>
            <div>
              <img src="https://wallpaperaccess.com/full/677562.jpg" alt="" />
              <p className="legend">Action | Adventure </p>
            </div>
          </Carousel>
        </div>
      </Zoom>
    );
  }
}

export default Slider;
