import React, { Component } from "react";
import Card from "./../components/card";
import Carousel from '../components/carousel'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

class Home extends Component {
  state = {};

  render() {
    if (this.props.role === 'admin') {
      return (
        <Redirect to='/admin' />
      )
    }
    return (
      <div>
        <Carousel />
        <Card />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    username: state.auth.username,
    role: state.auth.role
  };
};

export default connect(mapStateToProps, {})(Home);
