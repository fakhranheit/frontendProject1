import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl';
import { Button } from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom';


class Cart extends Component {
    state = {
        datacart: [],
        totalharga: 0,
        redirect: false
    }

    checkOut = () => {
        // console.log(this.state.totalharga);
        // var datacart = this.state.datacart
        var totalharga = this.state.totalharga
        var iduser = this.state.datacart[0].userid

        // console.log(iduser);
        // console.log(totalharga)
        Axios.post(`${APIURL}user/checkout/${iduser}`, {
            totalharga
        })
            .then(res => {
                this.setState({ redirect: true })
                console.log('berhasil checkout')
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteItem = (id, index) => {
        console.log(id, index);
        var userid = this.state.datacart[index].userid
        // console.log(this.state.datacart);
        Axios.delete(`${APIURL}user/deletecart/${id}`)
            .then(res => {
                Axios.get(`${APIURL}user/getcart/${userid}`)
                    .then(res => {
                        // console.log(res.data);
                        // this.setState({ datacart: res.data })
                        // console.log(this.state.datacart);
                        var harga = 0
                        res.data.forEach(val => {
                            harga += val.harga
                        });
                        this.setState({ totalharga: harga, datacart: res.data })
                        console.log(this.state.totalharga, this.state.datacart);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderItem = () => {
        var itemCart = this.state.datacart
        // console.log(itemCart);
        if (itemCart.length > 0) {
            return itemCart.map((val, index) => {
                return (
                    <ExpansionPanel style={{ color: 'white', backgroundColor: '#343a40', marginTop: '20px' }} >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        >
                            <Typography>

                                <img src={`${APIURLImg + val.Foto}`} alt='' style={{ width: '80px', height: '80px' }} />
                                <span style={{ marginLeft: '20px', fontFamily: 'Oxanium' }}>{val.namaGame}</span>

                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography style={{ display: 'flex', fontFamily: 'Oxanium' }}>
                                <div style={{ display: 'flex', fontFamily: 'Oxanium', alignItems: 'center' }}>
                                    <div>
                                        Item Price  :
                                    </div>
                                    <NumberFormat value={val.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} style={{ paddingLeft: '10px' }} />
                                </div>
                            </Typography>
                            <IconButton onClick={() => this.deleteItem(val.idtransaksidetail, index)} style={{ marginLeft: '450px' }} >
                                <DeleteIcon style={{ color: 'white' }} />
                            </IconButton>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })
        }
        else {
            return (
                <h1 style={{ fontFamily: 'oxanium' }}>There is no item on your cart</h1>
            )
        }
    }

    componentDidMount() {
        var id = localStorage.getItem("id")
        // var totalharga = this.state.totalharga
        // var id = this.props.iduser
        // console.log(id);
        Axios.get(`${APIURL}user/getcart/${id}`)
            .then(res => {
                // console.log(res.data);
                // this.setState({ datacart: res.data })
                // console.log(this.state.datacart);
                var harga = 0
                res.data.forEach(val => {
                    harga += val.harga
                });
                this.setState({ totalharga: harga, datacart: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const role = this.props.role
        const loginstatus = this.props.loginstatus

        if (role === 'user' && loginstatus === true) {
            if (this.state.redirect) {
                return (
                    <Redirect to='payment' />
                )
            }
            return (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '800px', marginTop: '50px', minHeight: '100vh', padding: '30px', backgroundColor: '#161f2d' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                                <h1 style={{ fontFamily: 'Oxanium' }}>Your Shopping Cart</h1>
                            </div>
                            <div>
                                {this.renderItem()}
                            </div>
                            <div style={{ minWidth: '100px', marginTop: '20px', color: 'white', fontFamily: 'Oxanium', fontSize: '25px' }}>
                                Estimated Price :
                                <NumberFormat value={this.state.totalharga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} style={{ color: 'white', marginLeft: '10px' }} />
                                <Button variant='dark' style={{ marginLeft: '200px', marginBottom: '10px' }} onClick={this.checkOut}>Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <Redirect to='/' />
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        iduser: state.auth.id,
        role: state.auth.role,
        loginstatus: state.auth.loginstatus
    };
};
export default connect(mapStateToProps, {})(Cart);