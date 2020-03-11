import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Cart extends Component {
    state = {
        datacart: {},
        totalharga: 0
    }

    deleteItem = (id, index) => {
        console.log(id, index);
        var userid = this.state.datacart[index].userid
        // console.log(userid);
        Axios.delete(`${APIURL}game/deletecart/${id}`)
            .then(res => {
                Axios.get(`${APIURL}game/getcart/${userid}`)
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
        console.log(itemCart);

        if (itemCart.length > 0) {
            return itemCart.map((val, index) => {
                return (
                    <ExpansionPanel style={{ color: 'white', backgroundColor: '#343a40', marginTop: '20px' }} >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                        >
                            <Typography>
                                <div>
                                    <img src={`${APIURLImg + val.Foto}`} alt='' style={{ width: '80px', height: '80px' }} />
                                    <span style={{ marginLeft: '20px', fontFamily: 'Oxanium' }}>{val.namaGame}</span>
                                </div>
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
                            <IconButton onClick={() => this.deleteItem(val.idtransaksi, index)} style={{ marginLeft: '450px' }} >
                                <DeleteIcon style={{ color: 'white' }} />
                            </IconButton>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })
        }
        else {
            return (
                <h1>Loading ...</h1>
            )
        }
    }

    componentDidMount() {
        var id = localStorage.getItem("id")
        // console.log(id);
        Axios.get(`${APIURL}game/getcart/${id}`)
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
    }

    render() {
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;