import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { MDBCardBody, MDBBadge, MDBIcon } from "mdbreact";
import { Zoom } from 'react-reveal'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'

class GambarCarousel extends Component {
  state = {
    produk: []
  }

  renderCarousel = () => {
    var produk = this.state.produk
    console.log('ini state produk', produk)
    if (produk.length) {
      return produk.map((val) => {
        return (
          <div>
            <img src={`${APIURLImg + val.Foto}`} alt="" />
            <p className="legend">{val.namaGame}</p>
          </div>
        )
      })
    } else {
      return <h1>loading ...</h1>
    }
  }

  componentDidMount() {
    Axios.get(`${APIURL}game/getlatest`)
      .then(res => {
        this.setState({ produk: res.data })
        // console.log('get latest', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (this.state.produk < 1) return <h1>Loading...</h1>
    return (
      <Zoom>
        <div className="border-carousel ">
          <MDBCardBody className="on-demand text-align-center">
            <MDBBadge color="dark">
              <MDBIcon icon="gamepad" />
            </MDBBadge>
            New Release
        </MDBCardBody>
          <Carousel >
            {this.renderCarousel()}
          </Carousel>
        </div>
      </Zoom>
    );
  }
}

export default GambarCarousel;
