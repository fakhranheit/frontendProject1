import React from "react";
import { MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../redux/actions";

class Register extends React.Component {
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

  render() {
    if (this.props.statusregister) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="row">
          <div className="col-3 menu">
            <ul>
              <div>The Flight</div>
              <div>The City</div>
              <div>The Island</div>
              <div>The Food</div>
            </ul>
          </div>
          <div className="col-6">
            <div className="form-regis ">
              <h1>Create Account</h1>
              <form>
                <input placeholder="username" ref="username" type="text" id="fname" name="fname" />
                <input placeholder="email" ref="email" type="text" id="lname" name="lname" />
                <input placeholder="password" ref="password" type="password" id="lname" name="lname" />
                <input placeholder="re-enter password" ref="reenter" type="password" id="lname" name="lname" />
              </form>
              <div>{this.notiferror()}</div>
              <div>
                <MDBBtn onClick={this.onClickRegister} color="dark">
                  Submit
                </MDBBtn>
                <div></div>
              </div>
            </div>
          </div>
          <div className="col-3 right">
            <div className="aside menu">
              <h2>What?</h2>
              <p>Chania is a city on the island of Crete.</p>
              <h2>Where?</h2>
              <p>Crete is a Greek island in the Mediterranean Sea.</p>
              <h2>How?</h2>
              <p>You can reach Chania airport from all over Europe.</p>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>Resize the browser window to see how the content respond to the resizing.</p>
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
