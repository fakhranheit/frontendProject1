import React, { Component } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/header";
import Home from "./pages/home";
import Register from "./pages/register";
import Admin from "./pages/manageAdmin";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { reLogin } from "./redux/actions";
import Axios from "axios";
import { APIURL } from "./helper/apiurl";
import Footer from './components/footer'
import StoreDisplay from "./pages/storedisplay";
import DetailStore from "./pages/detailStore"
import Cart from './pages/cart'
import PaymentUser from './pages/paymentuser'
import NotFound from './components/notfound'
import SalesReport from './components/salesReport'

class App extends Component {
  state = { loading: true };

  componentDidMount() {
    var id = localStorage.getItem("id");
    if (id) {
      Axios.get(`${APIURL}auth/login/${id}`)
        .then(res => {
          this.props.reLogin(res.data);
          console.log("masuk sini");
        })
        .catch(err => {
          console.log("error aa");
        });
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/admin"} component={Admin} />
          <Route exact path={"/storedisplay"} component={StoreDisplay} />
          <Route exact path={"/detailstore/:id"} component={DetailStore} />
          <Route exact path={"/cart"} component={Cart} />
          <Route exact path={"/payment"} component={PaymentUser} />
          <Route exact path={"/notfound"} component={NotFound} />
          <Route exact path={"/SalesReport"} component={SalesReport} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    loading: state.auth.loading,
    error: state.auth.error,
    loginstatus: state.auth.loginstatus
  };
};

export default connect(mapStateToProps, { reLogin })(App);
