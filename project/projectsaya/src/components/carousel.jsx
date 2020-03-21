import React, { Component } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import { MDBCardBody, MDBBadge, MDBIcon } from "mdbreact";
import { Zoom } from 'react-reveal'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem } from 'react-bootstrap'
import CarouselCaption from "react-bootstrap/CarouselCaption";

class GambarCarousel extends Component {
  state = {
    produk: []
  }

  renderCarousel = () => {
    var produk = this.state.produk
    console.log('ini state produk', produk[0])
    if (produk.length) {
      return produk.map((val) => {
        return (
          <CarouselItem>
            <img
              className="d-block w-100"
              alt="First slide"
              src={`${APIURLImg + val.Foto}`}
            />
            <CarouselCaption>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="text-carousel">
                  <Link to={"/detailstore/" + val.id} style={{ color: 'white', cursor: 'pointer', width: '350px' }}>
                    <h3>{val.namaGame}</h3>
                  </Link>
                  <p>{val.namaGenre}</p>
                </div>
              </div>
            </CarouselCaption>
          </CarouselItem>
          // <div>
          //   <img src={`${APIURLImg + val.Foto}`} alt="" />
          //   <Link to={"/detailstore/" + val.id}>
          //     <p className="legend">{val.namaGame}</p>
          //   </Link>
          // </div>

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
        <div className="border-carousel">
          <div style={{ borderRadius: '10px', padding: '30px' }}>
            <div
              style={{
                color: 'white',
                fontFamily: 'oxanium',
                fontWeight: 'bolder',
                fontSize: '30px'
              }}>
              <i class="fas fa-gamepad"></i>
                        New Release
            </div>
            <Carousel interval={3000} wrap>
              {this.renderCarousel()}
            </Carousel>
          </div>
        </div>
      </Zoom>
    );
  }
}

export default GambarCarousel;


