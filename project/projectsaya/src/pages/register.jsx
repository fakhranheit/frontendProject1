import React from "react";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../redux/actions";
import { Reveal, Zoom } from 'react-reveal'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'

class Register extends React.Component {
  state = {
    tabelData: []
  }

  onClickRegister = () => {
    var username = this.refs.username.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    var reenter = this.refs.reenter.value;

    if (password !== reenter) {
      alert("password tidak sesuai");
    } else {
      this.props.registerUser({ username, email, password });
    }
  };
  notiferror = () => {
    if (this.props.error) {
      return <p className="alert alert-danger">{this.props.error}</p>;
    } else if (this.props.statusregister) {
      return <p className="alert alert-success">Register Success</p>;
    }
  };

  renderGambar = () => {
    var tabelData = this.state.tabelData
    console.log('panjang tabel', tabelData.length)
    // console.log(tabel)
    if (tabelData.length) {
      return tabelData.map((val) => {
        return (

          <img style={{ width: '100%', borderRadius: '10px', marginLeft: '30px', marginTop: '30px', border: '1px black solid' }} src={`${APIURLImg + val.Foto}`} alt="" />
        )
      })
    } else {
      return <h1>loading ...</h1>
    }
  }

  componentDidMount() {
    Axios.get(`${APIURL}game/getlatest`)
      .then(res1 => {
        console.log('get game', res1.data)
        this.setState({ tabelData: res1.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (this.props.statusregister) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="col-3 menu">
            <ul>
              <Reveal effect="fadeInUp">
                {this.renderGambar()}
              </Reveal>

            </ul>
          </div>
          <div className="col-6" style={{ opacity: '0,5px' }}>
            <Zoom>
              <div className="form-regis ">
                <h1>Create Account</h1>
                <form className="form-input">
                  <input placeholder="username" ref="username" type="text" id="fname" name="fname" />
                  <input placeholder="email" ref="email" type="text" id="lname" name="lname" />
                  <input placeholder="password" ref="password" type="password" id="lname" name="lname" />
                  <input placeholder="re-enter password" ref="reenter" type="password" id="lname" name="lname" />
                </form>
                <div>{this.notiferror()}</div>
                <div style={{ marginTop: '20px' }}>
                  <MDBBtn onClick={this.onClickRegister} color="dark">
                    Submit
                </MDBBtn>
                  <div></div>
                </div>
              </div>
            </Zoom>
          </div>
          <div className="col-3 right">
            <div className="aside menu">
              <h2>What?</h2>
              <p>A vast various of games within your hand</p>
              <h2>Where?</h2>
              <p>You can access it everywhere</p>
              <h2>How?</h2>
              <p>You can reach Chania airport from all over Europe.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    loading: state.auth.loading,
    error: state.auth.error,
    statusregister: state.auth.statusregister
  };
};

export default connect(mapStateToProps, { registerUser })(Register);
