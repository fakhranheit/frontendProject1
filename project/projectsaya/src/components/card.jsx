import React, { Component } from "react";
import AOS from "aos";

class Card extends Component {
  state = {};
  render() {
    AOS.init({
      delay: 5000
    });
    return (
      <div>
        <div className="card-deck card-home">
          <div className="card bg-dark" data-aos="fade-left">
            <img className="card-img-top" src="https://images5.alphacoders.com/901/901108.png" alt="" />
            <div className="card-body">
              <h5 className="card-title">Monster Hunter World</h5>
              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">
                <button className="btn" style={{ backgroundColor: '#161f2d' }}>More info</button>
              </p>
            </div>
          </div>
          <div className="card bg-dark" data-aos="fade-down">
            <img className="card-img-top" src="https://www.vortez.net/news_file/17727_age-of-empires-4-trailer.jpg" alt="" />
            <div className="card-body">
              <h5 className="card-title">Age of Empire IV</h5>
              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">
                <button className="btn" style={{ backgroundColor: '#161f2d' }}>More info</button>
              </p>
            </div>
          </div>
          <div className="card bg-dark" data-aos="fade-right">
            <img className="card-img-top" src="https://wallpaperaccess.com/full/677562.jpg" alt="" />
            <div className="card-body">
              <h5 className="card-title">Red Dead Redempetion 2</h5>
              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text">
                <button className="btn" style={{ backgroundColor: '#161f2d' }}>More info</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
