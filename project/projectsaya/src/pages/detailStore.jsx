import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'
import { Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class DetailStore extends Component {
    state = {
        detailgame: []
    }

    onAddtoCart = () => {
        var gameid = this.state.detailgame.id
        var userid = this.props.iduser
        // console.log(dataCart);

        Axios.post(`${APIURL}game/addcart`, {
            gameid,
            userid,
        })
            .then(res1 => {
                alert(res1.data.message);

            })
            .catch(err1 => {
                console.log(err1);

            })
    }

    componentDidMount() {
        var id = this.props.match.params.id
        Axios.get(`${APIURL}game/getdetailgame/${id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({ detailgame: res.data[0] })
                // console.log(this.state.detailgame);
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        if (this.state.detailgame) {
            return (
                <div className='box-game' onFocus>
                    <div className='detail-foto'>
                        <img src={`${APIURLImg + this.state.detailgame.foto}`} alt="" style={{ width: '500px', height: '300px', borderRadius: '10px' }} />
                        <div style={{ marginLeft: '50px' }}>
                            <div style={{ fontSize: '40px' }}> {this.state.detailgame.namaGame} </div>
                            <div style={{ marginTop: '10px', marginBottom: '7px' }}>{this.state.detailgame.namaGenre}</div>
                            <div style={{ marginBottom: '20px' }}>{this.state.detailgame.deskripsi}</div>
                            <div>
                                <Button onClick={this.onAddtoCart} variant='dark' title='Buy'> <NumberFormat value={this.state.detailgame.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Button>
                                <Link to='/storedisplay' ><Button variant='dark' title='Back' style={{ color: 'white' }}>Back to Shop</Button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <h1>loading ...</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        iduser: state.auth.id
    };
};

export default connect(mapStateToProps, {})(DetailStore);